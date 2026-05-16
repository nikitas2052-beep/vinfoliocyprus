import type { Winery } from "./types";

// Google favicon CDN — returns a clean square icon for any domain.
export const logoFor = (websiteOrDomain?: string) => {
  if (!websiteOrDomain) return undefined;
  let host = websiteOrDomain;
  try {
    if (/^https?:\/\//.test(host)) host = new URL(host).hostname;
  } catch {}
  host = host.replace(/^www\./, "");
  return `https://www.google.com/s2/favicons?domain=${host}&sz=128`;
};

export const wineries: Winery[] = [
  {
    slug: "chateau-gigognan",
    name: "Chateau Gigognan",
    country: "France",
    description:
      "Historic Rhone Valley estate producing classic Chateauneuf-du-Pape and Cotes du Rhone with deep terroir expression.",
    website: "https://www.chateau-gigognan.fr",
  },
  {
    slug: "domaine-de-la-motte",
    name: "Domaine de la Motte",
    country: "France",
    description:
      "Family-run Chablis producer crafting mineral, age-worthy Chardonnay from limestone-rich Burgundy soils.",
    website: "https://www.chablis-domaine-de-la-motte.fr",
  },
  {
    slug: "dopff-au-moulin",
    name: "Dopff au Moulin",
    country: "France",
    description:
      "One of Alsace's oldest wine houses, founded in 1574, renowned for elegant Riesling and aromatic whites.",
    website: "https://www.dopff-au-moulin.fr",
  },
  {
    slug: "soligo",
    name: "Soligo",
    country: "Italy",
    description:
      "Cooperative cellar from Treviso, Veneto, producing celebrated Prosecco DOC and northern Italian classics since 1953.",
    website: "https://www.collisoligo.com",
  },
  {
    slug: "villa-cerna",
    name: "Villa Cerna",
    country: "Italy",
    description:
      "Tuscan estate in Castellina-in-Chianti producing structured Chianti Classico and Riserva from Sangiovese.",
    website: "https://www.villacerna.it",
  },
  {
    slug: "angelo-negro",
    name: "Angelo Negro",
    country: "Italy",
    description:
      "Piedmont winery from Roero, fourth-generation producers of refined Barolo, Barbaresco and Roero whites.",
    website: "https://www.angelonegro.it",
  },
  {
    slug: "i-saltari",
    name: "I Saltari",
    country: "Italy",
    description:
      "Boutique Valpolicella producer of artisanal Amarone Riserva and Valpolicella Superiore from appassimento grapes.",
  },
  {
    slug: "murari",
    name: "Murari",
    country: "Italy",
    description:
      "Family-run Veneto winery specialising in Amarone, Ripasso and approachable Valpolicella from indigenous varieties.",
  },
  {
    slug: "les-jamelles",
    name: "Les Jamelles",
    country: "France",
    description:
      "Catherine & Laurent Delaunay's varietal label from Sud de la France, expressing pure single-grape Languedoc wines.",
    website: "https://www.lesjamelles.com",
  },
  {
    slug: "ventisquero",
    name: "Viña Ventisquero",
    country: "Chile",
    description:
      "New World Winery of the Year 2024. Chilean producer with vineyards from Casablanca to Apalta and Maipo Andes.",
    website: "https://www.ventisquero.com",
  },
  {
    slug: "stoneburn",
    name: "Stoneburn",
    country: "New Zealand",
    description:
      "Marlborough estate producing vibrant Sauvignon Blanc from the cool, river-stone soils of the Wairau Valley.",
    website: "https://www.stoneburn.com",
  },
  {
    slug: "tahbilk",
    name: "Tahbilk",
    country: "Australia",
    description:
      "Family-owned Victorian winery established 1860, famous for old-vine Shiraz and Marsanne from Nagambie Lakes.",
    website: "https://www.tahbilk.com.au",
  },
  {
    slug: "phebus",
    name: "Phebus",
    country: "Argentina",
    description:
      "Mendoza producer crafting elegant high-altitude Malbec from the foothills of the Andes.",
    website: "https://www.bodegasdomingomolina.com.ar",
  },
  {
    slug: "alvis-drift",
    name: "Alvi's Drift",
    country: "South Africa",
    description:
      "Western Cape family estate on the Breede River producing the celebrated Pinotage and Chenin Blanc range.",
    website: "https://www.alvisdrift.co.za",
  },
  {
    slug: "aix",
    name: "AIX",
    country: "France",
    description:
      "Provence rosé icon from Coteaux d'Aix en Provence — pale, dry and Mediterranean in style.",
    website: "https://www.aixrose.com",
  },
  {
    slug: "boubas",
    name: "Boubas Wines",
    country: "Greece",
    description:
      "Peloponnese winery championing native Greek varieties: Agiorgitiko, Moschofilero, Malagouzia and Assyrtiko.",
  },
  {
    slug: "yiaskouris",
    name: "Yiaskouris",
    country: "Cyprus",
    description:
      "Cypriot winery (PGI) producing indigenous Xynisteri, Maratheftiko and Mataro alongside international varieties.",
    website: "https://www.yiaskouriswines.net",
  },
];
