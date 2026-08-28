export const vertexShaderSource = `
attribute vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

/**
 * Single-pass procedural sun with the analog-decay treatment from the
 * reference pen (filipz/GgpMOEq): framerate-locked tracking jitter, film
 * grain, scanlines, vsync roll, vignette and limb chromatic bleed.
 * Scene coordinates are centered and normalized by viewport height,
 * so the sun keeps a constant apparent radius on any aspect ratio.
 */
export const fragmentShaderSource = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uPointer;
uniform float uPointerGlow;

const float SUN_RADIUS = 0.14;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(in vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(in vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = rot * p * 2.03;
    amplitude *= 0.5;
  }
  return value;
}

vec3 heatColor(float v) {
  v = clamp(v, 0.0, 1.0);
  vec3 c0 = vec3(0.24, 0.02, 0.0);
  vec3 c1 = vec3(0.72, 0.11, 0.0);
  vec3 c2 = vec3(1.0, 0.45, 0.05);
  vec3 c3 = vec3(1.0, 0.8, 0.3);
  vec3 c4 = vec3(1.0, 0.97, 0.82);
  vec3 col = mix(c0, c1, smoothstep(0.0, 0.35, v));
  col = mix(col, c2, smoothstep(0.35, 0.6, v));
  col = mix(col, c3, smoothstep(0.6, 0.82, v));
  col = mix(col, c4, smoothstep(0.82, 1.0, v));
  return col;
}

float sunSurface(vec2 uv, float t) {
  vec2 p = uv / SUN_RADIUS;
  vec2 warp = vec2(
    fbm(p * 2.6 + t * 0.6),
    fbm(p * 2.6 - t * 0.5 + 7.3)
  );
  float f = fbm(p * 3.4 + warp * 1.6 - vec2(t * 0.35, 0.0));
  float granules = fbm(p * 9.0 + warp * 2.0 + vec2(0.0, t * 0.8));
  return clamp(f * 0.75 + granules * 0.45, 0.0, 1.2);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  float t = uTime;

  float jitter = (hash(vec2(floor(t * 60.0), 2.0)) - 0.5) * 0.006;
  uv.x += jitter;

  vec2 parallax = uPointer * 0.10;
  float r = length(uv);

  float limb = smoothstep(SUN_RADIUS + 0.01, SUN_RADIUS * 0.55, r);
  float disc = smoothstep(SUN_RADIUS + 0.004, SUN_RADIUS - 0.004, r);

  vec3 col = vec3(0.0);

  if (disc > 0.0) {
    vec2 p = uv + parallax;
    float surface = sunSurface(p, t * 0.12);
    float heat = uPointerGlow * exp(-length(uv - uPointer) * 3.0) * 0.55;
    float v = pow(surface * limb + heat * limb, 1.25);
    col = heatColor(v) * disc;
  }

  float flicker = fbm(uv * 3.5 + vec2(t * 0.25, -t * 0.2)) * 0.5 + 0.5;
  float corona = exp(-max(r - SUN_RADIUS, 0.0) * 9.0);
  float coronaOuter = exp(-max(r - SUN_RADIUS, 0.0) * 3.5);
  float pointerFlare = uPointerGlow * exp(-length(uv - uPointer) * 2.0);
  col += vec3(1.0, 0.42, 0.1) * corona * (0.50 + 0.30 * flicker);
  col += vec3(0.85, 0.2, 0.03) * coronaOuter * (0.14 + 0.08 * flicker + pointerFlare * 0.35);

  float limbBand = exp(-pow((r - SUN_RADIUS) * 90.0, 2.0));
  col.r *= 1.0 + limbBand * 0.35;
  col.b *= 1.0 - limbBand * 0.25;

  float roll = exp(-pow(fract(uv.y * 0.3 - t * 0.02) - 0.5, 2.0) * 30.0);
  col *= 0.97 + 0.05 * roll;

  col *= 0.94 + 0.06 * sin(gl_FragCoord.y * 1.6);

  float grain = hash(gl_FragCoord.xy + vec2(fract(t * 13.7) * 100.0));
  col += (grain - 0.5) * 0.055;

  col *= 0.97 + 0.03 * hash(vec2(floor(t * 24.0), 5.0));

  col *= 1.0 - 0.55 * dot(uv, uv);

  gl_FragColor = vec4(col, 1.0);
}
`;
