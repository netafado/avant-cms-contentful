import type { Thing } from "schema-dts";

/**
 * Server component that serialises a single JSON-LD entity into a
 * `<script type="application/ld+json">` tag. Renders nothing else.
 *
 * Use one `<JsonLd>` per entity — the schema graph is built by the
 * `src/lib/seo/jsonld.ts` builders, which cross-reference entities by
 * `@id`.
 */
export default function JsonLd<T extends Thing>({ data }: { data: T }) {
  return (
    <script
      type="application/ld+json"
      // `dangerouslySetInnerHTML` is the Next.js-recommended way to ship
      // JSON-LD. The data is built from a typed builder, not user input,
      // so this is not an XSS surface.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
