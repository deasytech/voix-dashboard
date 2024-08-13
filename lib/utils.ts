import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});