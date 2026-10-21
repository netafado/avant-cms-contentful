import { FC } from "react";
import Tag from "@/components/Tag";
import type { ComponentTagListProps } from "./types";

const ComponentTags: FC<ComponentTagListProps> = ({ list, title, color }) => {
  return (
    <div className="border border-black/15 px-4 py-4 dark:border-white/15">
      <h3 className="pb-3 font-display text-xl font-normal text-gray-900 dark:text-gray-100">
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
