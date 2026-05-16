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
}

export interface CartItem {
  wineId: string;
  quantity: number;
}
