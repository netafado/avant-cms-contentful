import EditorView from "@/components/EditorView";

import type { CardProps } from "./types";
import clsx from "clsx";

const Card = (props: CardProps) => {
  const { company, role, duration, tools, description, limitSize } = props;
  return (
    <div
      className={clsx(
        "relative p-6 border border-gray-300 dark:border-gray-800 rounded-sm ",
        {
          "max-h-80 overflow-hidden": !!limitSize,
        }
      )}
    >
      <h3 className="text-white  font-semibold">{company}</h3>
      <p className="text-sm">{role}</p>
      <p className="text-sm text-gray-500 text-xs">{duration}</p>
      <ul className="mt-2 list-none flex flex-wrap gap-2 text-sm text-gray-700">
        {tools?.map((tool, idx) => (
          <li
            className="bg-success-500/30 text-xs text-success-500 px-2 rounded-sm"
            key={idx}
          >
            {tool}
          </li>
        ))}
      </ul>
      <EditorView markdown={description} />
      {!!limitSize && (
        <div className="absolute bottom-0 right-0 bg-gradient-to-t from-black to-transparent h-20 w-2 w-full" />
      )}
    </div>
  );
};

export default Card;
