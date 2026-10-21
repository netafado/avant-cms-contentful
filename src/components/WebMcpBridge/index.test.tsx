import { render, act } from "@testing-library/react";
import WebMcpBridge from "./index";

function setModelContext(value: unknown) {
  Object.defineProperty(document, "modelContext", {
    value,
    configurable: true,
  });
}

function createModelContext() {
  return { registerTool: jest.fn().mockResolvedValue(undefined) };
}

describe("WebMcpBridge", () => {
  afterEach(() => {
    setModelContext(undefined);
    jest.restoreAllMocks();
  });

  it("registers every tool with the model context on mount", () => {
    const modelContext = createModelContext();
    setModelContext(modelContext);

    render(<WebMcpBridge />);

    expect(modelContext.registerTool).toHaveBeenCalledTimes(7);
    const registeredNames = modelContext.registerTool.mock.calls.map(
      ([tool]) => tool.name
    );
    expect(registeredNames).toContain("get_profile");
    expect(registeredNames).toContain("toggle_theme");
    expect(registeredNames).toContain("list_posts");
    expect(registeredNames).toContain("get_post");
    for (const [, options] of modelContext.registerTool.mock.calls) {
      expect(options.signal.aborted).toBe(false);
    }
  });

  it("aborts the registrations on unmount", () => {
    const modelContext = createModelContext();
    setModelContext(modelContext);

    const { unmount } = render(<WebMcpBridge />);
    unmount();

    for (const [, options] of modelContext.registerTool.mock.calls) {
      expect(options.signal.aborted).toBe(true);
    }
  });

  it("warns but does not throw when a registration fails", async () => {
    const modelContext = createModelContext();
    modelContext.registerTool
      .mockRejectedValueOnce(new Error("duplicate tool"))
      .mockResolvedValue(undefined);
    setModelContext(modelContext);
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    render(<WebMcpBridge />);
    await act(async () => {
      await Promise.resolve();
    });

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("get_profile"),
      expect.any(Error)
    );
  });

  it("renders nothing without crashing", () => {
    const { container } = render(<WebMcpBridge />);
    expect(container).toBeEmptyDOMElement();
  });

  it("no-ops in browsers without WebMCP support", () => {
    // afterEach resets document.modelContext to undefined (unsupported).
    expect(() => render(<WebMcpBridge />)).not.toThrow();
  });
});
