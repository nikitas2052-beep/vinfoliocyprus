import type { Winery } from "./types";

/**
 * Real partner logos served from the live vinfolio.com.cy CDN.
 * (Discovered by parsing the Elementor per-page CSS for /our-partners/.)
 */
const LOGO_BASE = "https://vinfolio.com.cy/wp-content/uploads/2025/10";

/**
 * Fallback: Google's favicon endpoint: returns a clean square icon
 * for any domain. Used when a winery has no `logo` set yet.
 */
export const logoFor = (winery: Winery): string | undefined => {
  if (winery.logo) return winery.logo;
  if (!winery.website) return undefined;
  let host = winery.website;
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
    website: "https://gigognan.fr",
    // Local SVG fetched from gigognan.fr: clean dark-on-white version
    logo: "/logos/gigognan.svg",
  },
  {
    slug: "domaine-de-la-motte",
    name: "Domaine de la Motte",
    country: "France",
    description:
      "Family-run Chablis producer crafting mineral, age-worthy Chardonnay from limestone-rich Burgundy soils.",
    website: "https://www.chablis-domaine-de-la-motte.fr",
    logo: "/logos/domaine-de-la-motte.png",
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
    // Local PNG fetched from collisoligo.com: clean dark-on-white version
    logo: "/logos/soligo.png",
  },
  {
    slug: "villa-cerna",
    name: "Villa Cerna",
    country: "Italy",
    description:
      "Tuscan estate in Castellina-in-Chianti producing structured Chianti Classico and Riserva from Sangiovese.",
    website: "https://www.villacerna.it",
    logo: `${LOGO_BASE}/villa_cerna.png`,
    logoBg: "#FFFFFF",
  },
  {
    slug: "tenuta-alzatura",
    name: "Tenuta Alzatura",
    country: "Italy",
    description:
      "Umbrian estate in Montefalco producing characterful Sagrantino, Rosso and Grechetto whites.",
    logo: `${LOGO_BASE}/alzatura.png`,
    logoBg: "#695656",
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
    logo: "/logos/isaltari.png",
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
    logo: `${LOGO_BASE}/ventisquero_wines-lg-optimized.webp`,
    logoBg: "#E8E0CD",
  },
  {
    slug: "stoneburn",
    name: "Stoneburn",
    country: "New Zealand",
    description:
      "Marlborough estate producing vibrant Sauvignon Blanc from the cool, river-stone soils of the Wairau Valley.",
    website: "https://www.stoneburn.co.nz",
    // Local PNG fetched from stoneburn.co.nz: clean dark-on-white version
    logo: "/logos/stoneburn.webp",
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
    logo: `${LOGO_BASE}/phebus-blk.png`,
    logoBg: "#F9F8F4",
  },
  {
    slug: "alvis-drift",
    name: "Alvi's Drift",
    country: "South Africa",
    description:
      "Western Cape family estate on the Breede River producing the celebrated Pinotage and Chenin Blanc range.",
    website: "https://www.alvisdrift.co.za",
    logo: `${LOGO_BASE}/Alvis-Drift-Logo-3.png`,
    logoBg: "#F9F8F4",
  },
  {
    slug: "aix",
    name: "AIX",
    country: "France",
    description:
      "Provence rosé icon from Coteaux d'Aix en Provence: pale, dry and Mediterranean in style.",
    website: "https://www.aixrose.com",
    logo: "/logos/aix.png",
  },
  {
    slug: "boubas",
    name: "Boubas Wines",
    country: "Greece",
    description:
      "Peloponnese winery championing native Greek varieties: Agiorgitiko, Moschofilero, Malagouzia and Assyrtiko.",
    website: "https://www.boubas-wines.gr",
    // Local PNG from boubas-wines.gr: transparent bg, monochrome-safe
    logo: "/logos/boubas.png",
  },
  {
    slug: "yiaskouris",
    name: "Yiaskouris",
    country: "Cyprus",
    description:
      "Cypriot winery (PGI) producing indigenous Xynisteri, Maratheftiko and Mataro alongside international varieties.",
    website: "https://www.yiaskouriswines.net",
    logo: `${LOGO_BASE}/yiaskouris-new-logo.png`,
    logoBg: "#FFFFFF",
  },
];
