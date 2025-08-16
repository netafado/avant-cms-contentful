import { TagProps } from "./types";
import classNames from "clsx";
import { SIZE, COLOR_CLASSES as colorClasses } from "./constants";

const Tag = ({ text, color, size = "small", className }: TagProps) => {
  const isValid = isValidColor(color);

  return (
    <span
      className={classNames(
        "inline-block px-3 py-1 rounded-full font-semibold mr-1 mb-1",
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
