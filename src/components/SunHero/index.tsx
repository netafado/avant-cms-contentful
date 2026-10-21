"use client";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import classNames from "clsx";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { fragmentShaderSource, vertexShaderSource } from "./shaders";
import { SunHeroProps } from "./types";

const DPR_CAP = 1.5;

type GlState = {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  uniforms: {
    resolution: WebGLUniformLocation | null;
    time: WebGLUniformLocation | null;
    pointer: WebGLUniformLocation | null;
    pointerGlow: WebGLUniformLocation | null;
  };
  startTime: number;
};

const compileShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("SunHero shader error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const initGl = (canvas: HTMLCanvasElement): GlState | null => {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  });
  if (!gl) return null;

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource,
  );
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("SunHero program link error:", gl.getProgramInfoLog(program));
    return null;
  }
  gl.useProgram(program);

  // Fullscreen quad as a single triangle strip.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const aPosition = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

  return {
    gl,
    program,
    uniforms: {
      resolution: gl.getUniformLocation(program, "uResolution"),
      time: gl.getUniformLocation(program, "uTime"),
      pointer: gl.getUniformLocation(program, "uPointer"),
      pointerGlow: gl.getUniformLocation(program, "uPointerGlow"),
    },
    startTime: performance.now(),
  };
};

const SunHero: FC<SunHeroProps> = ({ masthead, poster, children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<GlState | null>(null);
  const rafRef = useRef(0);
  // Pointer state lives in refs so pointermove never triggers a re-render.
  const pointerRef = useRef({
    // Target values from the latest events...
    targetX: 0,
    targetY: 0,
    targetGlow: 0,
    // ...and the damped values actually sent to the shader.
    x: 0,
    y: 0,
    glow: 0,
    lastMoveTime: 0,
  });
  const [glReady, setGlReady] = useState(false);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.05 });

  const setSectionRef = useCallback(
    (node: HTMLElement | null) => {
      inViewRef(node);
    },
    [inViewRef],
  );

  const drawFrame = useCallback(() => {
    const state = glRef.current;
    const canvas = canvasRef.current;
    if (!state || !canvas) return;

    const { gl, uniforms } = state;
    const pointer = pointerRef.current;

    // Inertial drag: the scene eases toward the pointer instead of snapping.
    pointer.x += (pointer.targetX - pointer.x) * 0.06;
    pointer.y += (pointer.targetY - pointer.y) * 0.06;
    pointer.glow += (pointer.targetGlow - pointer.glow) * 0.04;

    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl.uniform1f(uniforms.time, (performance.now() - state.startTime) / 1000);
    gl.uniform2f(uniforms.pointer, pointer.x, pointer.y);
    gl.uniform1f(uniforms.pointerGlow, pointer.glow);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }, []);

  // One-time WebGL setup/teardown.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const state = initGl(canvas);
    if (!state) return; // No WebGL: the poster image stays visible.
    glRef.current = state;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        state.gl.viewport(0, 0, width, height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const onContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(rafRef.current);
      setGlReady(false);
      glRef.current = null;
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    // Reveal the canvas one frame after setup so the poster doesn't flash.
    // With prefers-reduced-motion the loop never starts: the visitor sees a
    // single still frame instead.
    if (reducedMotion) {
      resize();
      drawFrame();
    }
    const fadeRaf = requestAnimationFrame(() => setGlReady(true));

    return () => {
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(fadeRaf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      // The context itself is kept: React StrictMode remounts effects in dev,
      // and getContext() must return the same live context on the second run.
      glRef.current = null;
    };
  }, [drawFrame]);

  // Render loop gated on viewport visibility and tab visibility.
  useEffect(() => {
    if (!inView || !glRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let running = true;
    const loop = () => {
      if (!running) return;
      if (document.visibilityState === "visible") {
        drawFrame();
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [inView, drawFrame]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    // Match the shader's scene space: centered, normalized by height, y-up.
    const x = (event.clientX - rect.left - rect.width / 2) / rect.height;
    const y = (rect.height / 2 - (event.clientY - rect.top)) / rect.height;

    const pointer = pointerRef.current;
    const dx = x - pointer.targetX;
    const dy = y - pointer.targetY;
    const speed = Math.hypot(dx, dy);
    pointer.targetX = x;
    pointer.targetY = y;
    pointer.targetGlow = Math.min(1, pointer.targetGlow + speed * 6);
    pointer.lastMoveTime = performance.now();
  };

  const handlePointerLeave = () => {
    pointerRef.current.targetGlow = 0;
  };

  return (
    <section
      ref={setSectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="Animated sun hero"
      className="relative flex h-svh min-h-[640px] w-full items-center justify-center bg-black isolation-auto"
    >
      {poster && (
        <Image
          src={poster.src}
          alt={poster.alt}
          fill
          priority
          sizes="100vw"
          className={classNames(
            "object-cover transition-opacity duration-1000",
            glReady ? "opacity-0" : "opacity-100",
          )}
        />
      )}
      <div className="mix-blend-overlay  flex h-full w-full flex-col items-center px-6 text-center relative z-10 flex h-full w-full flex-col items-center px-6 text-center ">
        {masthead && <div className="w-full pt-0">{masthead}</div>}
        <div className="flex w-full flex-1 flex-col items-center justify-end pb-[11vh] md:pb-[12vh]">
          {children}
        </div>
      </div>
      <canvas
        ref={canvasRef}
        aria-hidden
        className={classNames(
          "absolute inset-0 h-full w-full transition-opacity duration-1000",
          glReady ? "opacity-100" : "opacity-0",
        )}
      />
      {/* Editorial scrim: darkens the top/bottom fields so the masthead and
          stats stay legible while the sun itself burns unobstructed. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.35)_22%,transparent_42%,transparent_58%,rgba(0,0,0,0.5)_76%,rgba(0,0,0,0.88)_100%)]"
      />
    </section>
  );
};

export default SunHero;
