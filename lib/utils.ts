import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-CY", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);
}

export const VAT_RATE = 0.19;

export function withVat(value: number): number {
  return Math.round(value * (1 + VAT_RATE) * 100) / 100;
}

export const COUNTRY_FLAGS: Record<string, string> = {
  Cyprus: "🇨🇾",
  Greece: "🇬🇷",
  Italy: "🇮🇹",
  France: "🇫🇷",
  Chile: "🇨🇱",
  Argentina: "🇦🇷",
  Australia: "🇦🇺",
  "New Zealand": "🇳🇿",
  "South Africa": "🇿🇦",
};
