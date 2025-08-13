import { HTMLAttributes, CSSProperties, ReactNode } from "react";
export type RevealProps = {
  className: string;
  animation?: string;
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
  duration?: number;
  timeout?: number;
  style?: CSSProperties;
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
