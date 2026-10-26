import { TagProps } from "./types";
import classNames from "clsx";
import { SIZE, COLOR_CLASSES as colorClasses } from "./constants";

const Tag = ({ text, color, size = "small", className }: TagProps) => {
  const isValid = isValidColor(color);

  return (
    <span
      className={classNames(
        "inline-block rounded-full border border-black/20 px-3 py-1 font-mono uppercase mr-1 mb-1",
        SIZE[size],
        isValid ? colorClasses[color] : colorClasses.gray,
        className
      )}
    >
      {text}
    </span>
  );
};

export const isValidColor = (
  color?: string
): color is keyof typeof colorClasses => {
  if (!color) return false;
  return Object.keys(colorClasses).includes(color);
};
export default Tag;
