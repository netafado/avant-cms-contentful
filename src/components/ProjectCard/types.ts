import type { ProjectSummary } from "@/lib/projects";

export type ProjectCardLabels = {
  viewProject: string;
  categories: string;
  technologies: string;
};

export type ProjectCardProps = {
  project: ProjectSummary;
  labels: ProjectCardLabels;
};
