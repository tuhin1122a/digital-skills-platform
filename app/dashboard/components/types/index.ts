import type { LucideIcon } from "lucide-react";

export interface ProgressItem {
  level: string;
  status: "completed" | "available" | "locked";
  score: number | null;
  unlocked: boolean;
}

export interface RecentActivityItem {
  type: "assessment_completed" | "certificate_issued";
  description: string;
  score?: number;
  date: string;
  level?: string;
  certificateUrl?: string;
}

export interface Stat {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}