import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(d: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  }).format(new Date(d));
}

export function formatDuration(ms: number) {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

export function difficultyColor(d: string) {
  if (d === "easy")   return { text: "#4ade80", bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.25)"  };
  if (d === "medium") return { text: "#fbbf24", bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.25)"  };
  return               { text: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)" };
}

export function scoreColor(score: number) {
  if (score >= 80) return "#4ade80";
  if (score >= 60) return "#fbbf24";
  return "#f87171";
}

export function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

export function truncate(str: string, max: number) {
  return str.length <= max ? str : str.slice(0, max) + "…";
}

export function randomId() {
  return Math.random().toString(36).slice(2, 10);
}