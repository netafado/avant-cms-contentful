import { TagProps } from "./types";
import classNames from "clsx";
const SIZE = {
  small: "text-xs",
  medium: "text-sm",
  large: "text-base",
};

const colorClasses = {
  red: "bg-red-500/30 text-red-500",
  green: "bg-green-500/30 text-green-500",
  blue: "bg-blue-500/30 text-blue-500",
  yellow: "bg-yellow-500/30 text-yellow-500",
  purple: "bg-purple-500/30 text-purple-500",
  gray: "bg-gray-500/30 text-gray-300",
};
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
