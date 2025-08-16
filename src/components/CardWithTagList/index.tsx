import { FC } from "react";
import Tag from "@/components/Tag";
import type { ComponentTagListProps } from "./types";

const ComponentTags: FC<ComponentTagListProps> = ({ list, title, color }) => {
  return (
    <div className="border py-4 px-4 border-gray-700 pr-4">
      <h3 className="pb-2 font-semibold">{title}</h3>
      {list.map((tool, index) => (
        <Tag key={index} text={tool} color={color} size="small" />
      ))}
    </div>
  );
};

export default ComponentTags;
