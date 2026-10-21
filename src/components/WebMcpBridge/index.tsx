"use client";
import { useEffect } from "react";
import { webMcpTools } from "@/lib/webmcp/tools";

/**
 * Registers this site's WebMCP tools with document.modelContext so AI
 * agents can discover and call them. Renders nothing; no-ops in browsers
 * without WebMCP support.
 */
export default function WebMcpBridge() {
  useEffect(() => {
    const modelContext = document.modelContext;
    if (!modelContext) return;

    const controller = new AbortController();
    for (const tool of webMcpTools) {
      modelContext
        .registerTool(tool, { signal: controller.signal })
        .catch((error) => {
          if (controller.signal.aborted) return;
          console.warn(`[webmcp] Failed to register tool "${tool.name}":`, error);
        });
    }
    return () => controller.abort();
  }, []);

  return null;
}
