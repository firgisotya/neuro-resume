import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMonthYear(date: any) {
  if (!date) return ""
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}
