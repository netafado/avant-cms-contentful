import EditorView from "@/components/EditorView";

import type { CardProps } from "./types";
import clsx from "clsx";

const Card = (props: CardProps) => {
  const { company, role, duration, tools, description, limitSize, id } = props;
  return (
    <div
      id={id}
      className={clsx(
        "card-lift relative rounded-panel border border-black/15 px-6 py-6 scroll-mt-28 dark:border-hairline dark:bg-panel",
        {
          "max-h-80 overflow-hidden": !!limitSize,
        }
      )}
    >
      <h3 className="font-display text-xl font-normal tracking-tight text-gray-900 dark:text-bright">
        {company}
      </h3>
      <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-gray-500 uppercase dark:text-meta">
        {role}
      </p>
      <p className="mt-1 font-mono text-[10px] tracking-[0.15em] text-gray-400 uppercase dark:text-dim">
        {duration}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {tools?.map((tool, idx) => (
          <li
            className="rounded-full border border-black/20 px-2 py-0.5 font-mono text-[10px] tracking-[0.15em] text-gray-600 uppercase dark:border-hairline-2 dark:text-dim"
            key={`tool_${idx}_${tool}`}
          >
            {tool}
          </li>
        ))}
      </ul>
      <EditorView markdown={description} />
      {!!limitSize && (
        <div className="absolute bottom-0 right-0 h-20 w-full bg-gradient-to-t from-ground to-transparent dark:from-ground" />
      )}
    </div>
  );
};

export default Card;
