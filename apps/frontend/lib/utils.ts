import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toSnakeCase(str: string) {
  if (!str) return "";
  return str
    .replace(/[\s-]+/g, "_")
    .replace(/([A-Z])/g, (match, p1, offset) => (offset > 0 ? `_${p1}` : p1))
    .toLowerCase();
}
