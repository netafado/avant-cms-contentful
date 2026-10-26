import { FC } from "react";
import Tag from "@/components/Tag";
import type { ComponentTagListProps } from "./types";

const ComponentTags: FC<ComponentTagListProps> = ({ list, title, color }) => {
  return (
    <div className="rounded-panel border border-black/15 px-4 py-4 dark:border-hairline dark:bg-panel">
      <h3 className="pb-3 font-display text-xl font-normal tracking-tight text-gray-900 dark:text-bright">
        {title}
      </h3>
      {list.map((tool, index) => (
        <Tag
          key={`tag_list_${index}_${tool}`}
          text={tool}
          color={color}
          size="small"
        />
      ))}
    </div>
  );
};

export default ComponentTags;
