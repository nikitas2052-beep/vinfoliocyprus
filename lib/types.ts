export type WineType = "Red" | "White" | "Rosé" | "Sparkling" | "Sparkling Rosé";

export type Country =
  | "Cyprus"
  | "Greece"
  | "Italy"
  | "France"
  | "Chile"
  | "Argentina"
  | "Australia"
  | "New Zealand"
  | "South Africa";

export interface Wine {
  id: string;
  name: string;
  winery: string;
  type: WineType;
  country: Country;
  region: string;
  year?: number;
  sizeMl: number;
  /** Additional bottle sizes offered besides the default `sizeMl`. */
  sizesMl?: number[];
  price: number;
  alcohol: number;
  shortDescription: string;
  description: string;
  pairing: string;
  producerInfo: string;
  image: string;
  stock: number;
  featured: boolean;
  tags?: string[];
}

export interface Winery {
  slug: string;
  name: string;
  country: Country;
  description: string;
  website?: string;
  /**
   * Real partner logo URL (preferred). When absent, the UI falls back
   * to Google's favicon endpoint via `logoFor(winery.website)`.
   */
  logo?: string;
  /** Background tile colour used behind the logo on the partners page. */
  logoBg?: string;
}

export interface CartItem {
  wineId: string;
  quantity: number;
  /** Chosen bottle size; defaults to the wine's `sizeMl` when absent. */
  sizeMl?: number;
}
