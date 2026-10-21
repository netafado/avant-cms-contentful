import EditorView from "@/components/EditorView";

import type { CardProps } from "./types";
import clsx from "clsx";

const Card = (props: CardProps) => {
  const { company, role, duration, tools, description, limitSize } = props;
  return (
    <div
      className={clsx(
        "relative border border-black/15 px-6 py-6 dark:border-white/15",
        {
          "max-h-80 overflow-hidden": !!limitSize,
        }
      )}
    >
      <h3 className="font-display text-xl font-normal text-gray-900 dark:text-gray-100">
        {company}
      </h3>
      <p className="mt-1 text-[11px] tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400">
        {role}
      </p>
      <p className="mt-1 font-mono text-[10px] tracking-[0.15em] text-gray-400 uppercase dark:text-gray-500">
        {duration}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {tools?.map((tool, idx) => (
          <li
            className="border border-black/20 px-2 py-0.5 text-[10px] tracking-[0.15em] text-gray-600 uppercase dark:border-white/20 dark:text-gray-300"
            key={`tool_${idx}_${tool}`}
          >
            {tool}
          </li>
        ))}
      </ul>
      <EditorView markdown={description} />
      {!!limitSize && (
        <div className="absolute bottom-0 right-0 h-20 w-full bg-gradient-to-t from-black to-transparent" />
      )}
    </div>
  );
};

export default Card;
