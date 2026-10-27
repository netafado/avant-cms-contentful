export type CardProps = {
  company: string;
  role: string;
  roles: string;
  description: string;
  duration: string;
  tools: string[];
  color: string;
  limitSize?: boolean;
  /** DOM id used as the Work Experience rail anchor (slugified company). */
  id?: string;
};
