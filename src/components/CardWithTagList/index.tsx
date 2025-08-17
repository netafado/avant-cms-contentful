import { FC } from "react";
import Tag from "@/components/Tag";
import type { ComponentTagListProps } from "./types";

const ComponentTags: FC<ComponentTagListProps> = ({ list, title, color }) => {
  return (
    <div className="border py-4 px-4 border-gray-700 pr-4 rounded-sm">
      <h3 className="pb-2 font-semibold text-gray-900 dark:text-gray-100">
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
