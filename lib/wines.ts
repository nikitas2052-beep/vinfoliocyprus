import type { Wine } from "./types";

// Real Vinfolio bottle photos (from vinfolio.com.cy CDN).
// Uses the 1152x1536 size: plenty of pixels for any card on the site;
// Next.js Image further optimises per-viewport via its image API so
// the network payload stays small.
const B = (n: string) =>
  `https://vinfolio.com.cy/wp-content/uploads/2025/10/VINFOLIO_ALL_WINES_09-25-${n}-1152x1536.png`;

const RED_IMG =
  "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80";
const RED_IMG_2 =
  "https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?auto=format&fit=crop&w=900&q=80";
const WHITE_IMG =
  "https://images.unsplash.com/photo-1566995541428-f3c0e3a3c0e8?auto=format&fit=crop&w=900&q=80";
const WHITE_IMG_2 =
  "https://images.unsplash.com/photo-1547595628-c61a29f496f0?auto=format&fit=crop&w=900&q=80";
const ROSE_IMG =
  "https://images.unsplash.com/photo-1558346489-19413928158b?auto=format&fit=crop&w=900&q=80";
const SPARKLING_IMG =
  "https://images.unsplash.com/photo-1592912714073-bdc8b4dcb44a?auto=format&fit=crop&w=900&q=80";
const SPARKLING_IMG_2 =
  "https://images.unsplash.com/photo-1605493725784-56d8b14d6cda?auto=format&fit=crop&w=900&q=80";

const stock = (seed: number) => 5 + ((seed * 17) % 46);

export const wines: Wine[] = [
  {
    id: "chateauneuf-du-pape-clos-du-roi",
    name: "Chateauneuf du Pape AOC Clos du Roi",
    winery: "Chateau Gigognan",
    type: "Red",
    country: "France",
    region: "Rhone Valley",
    year: 2020,
    sizeMl: 750,
    price: 35.0,
    alcohol: 14.5,
    shortDescription:
      "A regal Grenache-led blend from the Pope's vineyards: rich, spicy and built for the long haul.",
    description:
      "Crafted at the historic Chateau Gigognan in the heart of the southern Rhone, this Chateauneuf-du-Pape blends Grenache, Syrah and Mourvedre grown on iconic galets roulés. The wine opens with notes of kirsch, dark plum, garrigue and sweet liquorice, supported by velvety tannins and an enveloping warmth from the southern sun.\n\nFermentation is conducted plot-by-plot, with maturation in large oak foudres preserving fruit purity while adding gentle structure. The result is a wine of generosity and depth, drinking beautifully now but rewarding another decade in the cellar.",
    pairing:
      "Slow-braised lamb shoulder, wild boar ragu, aged Pecorino, or a classic daube provençale.",
    producerInfo:
      "Chateau Gigognan is one of the oldest estates of the appellation, with vineyards on the prized Clos du Roi terroir, farmed sustainably.",
    image: B("34"),
    stock: stock(1),
    featured: true,
  },
  {
    id: "cote-du-rhone-gigognan",
    name: "Cote du Rhone AOC",
    winery: "Chateau Gigognan",
    type: "Red",
    country: "France",
    region: "Rhone Valley",
    year: 2022,
    sizeMl: 750,
    price: 13.5,
    alcohol: 13.5,
    shortDescription:
      "Generous southern Rhone red: ripe red fruit, gentle spice, very food-friendly.",
    description:
      "A bright, sun-soaked blend from selected southern Rhone parcels. Predominantly Grenache with Syrah, it shows red cherry, raspberry, pepper and a touch of Mediterranean herb.\n\nFresh acidity and supple tannins make it endlessly drinkable, ideal as a midweek table wine yet refined enough for a Sunday roast.",
    pairing:
      "Grilled sausages, mushroom risotto, ratatouille, or a simple roast chicken.",
    producerInfo:
      "Chateau Gigognan blends classic Rhone varieties with respect for terroir, expressing the warmth of the region in an accessible style.",
    image: B("35"),
    stock: stock(2),
    featured: false,
  },
  {
    id: "chablis-domaine-de-la-motte",
    name: "Chablis AOC Domaine de la Motte",
    winery: "Domaine de la Motte",
    type: "White",
    country: "France",
    region: "Burgundy",
    year: 2022,
    sizeMl: 750,
    price: 18.5,
    alcohol: 12.5,
    shortDescription:
      "Chiselled, mineral Chardonnay from the Kimmeridgian soils of Chablis.",
    description:
      "Domaine de la Motte expresses the cool northern reach of Burgundy with precision. Stainless-steel vinification preserves the citrus core of lemon zest, green apple and oyster shell, while a fine saline thread runs through the mid-palate.\n\nUnoaked and laser-focused, this is Chablis as it should be: bright, taut, and built for the table.",
    pairing:
      "Fresh oysters, goat's cheese, pan-fried sea bream, or Cypriot meze with grilled halloumi.",
    producerInfo:
      "A historic Chablis house farming Chardonnay on limestone-rich Kimmeridgian soils, producing benchmark unoaked styles.",
    image: B("36"),
    stock: stock(3),
    featured: true,
  },
  {
    id: "chablis-premier-cru-de-la-motte",
    name: "Chablis AOC Premier Cru Domaine de la Motte",
    winery: "Domaine de la Motte",
    type: "White",
    country: "France",
    region: "Chablissien Bourgogne",
    year: 2021,
    sizeMl: 750,
    price: 28.9,
    alcohol: 13.0,
    shortDescription:
      "Premier Cru Chablis with extra depth, length and stony intensity.",
    description:
      "A serious Premier Cru sourced from prized slopes, fermented with a touch of older oak to add subtle creaminess without masking the mineral spine.\n\nThe nose offers white peach, almond and crushed flint; the palate is broad, salty, and beautifully persistent. A wine of finesse that will continue to evolve for 5–8 years.",
    pairing: "Lobster, roasted poultry in cream sauce, scallops, mature Comté.",
    producerInfo:
      "Domaine de la Motte's Premier Cru parcels are among the most sought-after in Chablis, hand-harvested at optimum maturity.",
    image: "/wines/chablis-premier-cru-de-la-motte.jpg",
    stock: stock(4),
    featured: false,
  },
  {
    id: "riesling-dopff-au-moulin",
    name: "Riesling AOP Cuvée Dopff au Moulin",
    winery: "Dopff au Moulin",
    type: "White",
    country: "France",
    region: "Alsace",
    year: 2022,
    sizeMl: 750,
    price: 12.0,
    alcohol: 12.5,
    shortDescription:
      "Dry Alsace Riesling: citrus blossom, white peach, vivid minerality.",
    description:
      "From one of Alsace's oldest wine families (founded 1574), this Riesling is the classic dry style of the region. Lime peel, green apple and white flower lead onto a tight, mineral palate with a clean, dry finish.\n\nA versatile aperitif and food wine that ages remarkably well, gaining petrol notes and depth after a few years.",
    pairing: "Choucroute, sushi, grilled white fish, or aromatic Thai curries.",
    producerInfo:
      "Dopff au Moulin in Riquewihr is a benchmark Alsace producer celebrated for refined varietal expressions.",
    image: "/wines/riesling-dopff-au-moulin.webp",
    stock: stock(5),
    featured: false,
  },
  {
    id: "sancerre-blanc-pre-semele",
    name: "Sancerre Blanc Domaine Du Pré Semelé",
    winery: "Domaine Du Pré Semelé",
    type: "White",
    country: "France",
    region: "Loire Valley",
    year: 2022,
    sizeMl: 750,
    price: 19.9,
    alcohol: 13.0,
    shortDescription:
      "Pure, taut Sauvignon Blanc from the chalky hills of Sancerre.",
    description:
      "The Pré Semelé family farms ancient flint and limestone parcels above the Loire. Their Sancerre Blanc is intensely aromatic: gooseberry, cut grass, blackcurrant leaf, yet structured and refined on the palate.\n\nLong, gunflint-driven finish makes it a benchmark Loire white.",
    pairing: "Crottin de Chavignol, oysters, ceviche, grilled halloumi salad.",
    producerInfo:
      "Family estate practicing sustainable viticulture in the eastern Loire.",
    image: "/wines/sancerre-blanc-pre-semele.webp",
    stock: stock(6),
    featured: true,
  },
  {
    id: "aix-rose-provence",
    name: "AIX Coteaux d'Aix en Provence Rosé",
    winery: "AIX",
    type: "Rosé",
    country: "France",
    region: "Provence",
    year: 2023,
    sizeMl: 750,
    price: 10.9,
    alcohol: 13.0,
    shortDescription:
      "Pale, dry Provence rosé: strawberry, white peach, Mediterranean herb.",
    description:
      "AIX is one of Provence's most recognisable rosés, blended from Grenache, Cinsault and Syrah on stony, sun-baked slopes north of Aix-en-Provence.\n\nDelicate salmon hue, with red berry, citrus and a fresh herbal lift. Crisp acidity carries a dry, gastronomic finish.",
    pairing: "Salade niçoise, grilled prawns, tomato bruschetta, summer meze.",
    producerInfo:
      "AIX is produced at Maison Saint AIX, a 100-hectare estate at 420 m elevation in the Coteaux d'Aix en Provence.",
    image: "/wines/aix-rose-provence.jpg",
    stock: stock(7),
    featured: true,
  },
  {
    id: "soligo-prosecco-doc-brut",
    name: "Soligo Prosecco DOC Brut",
    winery: "Soligo",
    type: "Sparkling",
    country: "Italy",
    region: "Treviso Veneto",
    year: 2023,
    sizeMl: 750,
    price: 7.5,
    alcohol: 11.0,
    shortDescription:
      "Crisp, lively Glera with pear, green apple and a fine persistent mousse.",
    description:
      "Made by the Charmat method in the heart of Treviso, this Prosecco delivers fresh white fruit, citrus and acacia blossom. The bead is fine and elegant, the finish dry and clean.\n\nAn excellent aperitif and an effortless match for antipasti and light dishes.",
    pairing: "Prosciutto crudo, fritto misto, parmigiano shavings, sushi.",
    producerInfo:
      "Cantina Colli del Soligo is a respected Treviso cooperative producing Prosecco since 1953.",
    image: B("28"),
    stock: stock(8),
    featured: false,
  },
  {
    id: "soligo-prosecco-rose",
    name: "Soligo Prosecco DOC Rosé Millesimato",
    winery: "Soligo",
    type: "Sparkling Rosé",
    country: "Italy",
    region: "Treviso Veneto",
    year: 2023,
    sizeMl: 750,
    price: 7.5,
    alcohol: 11.5,
    shortDescription:
      "Pink Prosecco with strawberry, rose petal and a refreshing fine bead.",
    description:
      "A vintage-dated rosé Prosecco blending Glera and Pinot Nero. Delicate copper-pink colour, with notes of wild strawberry, raspberry and citrus zest.\n\nDry, lively and beautifully balanced: a charming celebration glass.",
    pairing: "Smoked salmon, tuna tartare, charcuterie, light desserts.",
    producerInfo:
      "Soligo's millesimato rosé is produced from a single vintage with extended autoclave ageing.",
    image: B("29"),
    stock: stock(9),
    featured: true,
  },
  {
    id: "soligo-prosecco-small",
    name: "Soligo Prosecco DOC Small",
    winery: "Soligo",
    type: "Sparkling",
    country: "Italy",
    region: "Treviso Veneto",
    year: 2023,
    sizeMl: 200,
    price: 2.3,
    alcohol: 11.0,
    shortDescription:
      "Single-serve 200 ml Prosecco: perfect for events, picnics and gifting.",
    description:
      "The classic Soligo Brut in a charming 200 ml bottle. Fresh, fruity and dry, with a lively mousse: ideal for receptions, hotel mini-bars and on-the-go celebrations.",
    pairing: "Canapés, fruit platters, breakfast brunch service.",
    producerInfo:
      "Soligo packages their Brut in 200 ml format for hospitality and on-trade venues.",
    image: B("30"),
    stock: stock(10),
    featured: false,
  },
  {
    id: "allungo-spumante-bianco-brut",
    name: "Allungo Spumante Millesimato Bianco Brut",
    winery: "Soligo",
    type: "Sparkling",
    country: "Italy",
    region: "Treviso Veneto",
    year: 2022,
    sizeMl: 750,
    price: 4.95,
    alcohol: 11.0,
    shortDescription:
      "Approachable Italian sparkling with white peach, apple and citrus.",
    description:
      "An entry-level Italian spumante from Treviso: fresh, gently fruity and crisp. Easy-drinking, with a dry, balanced finish.",
    pairing: "Aperitivo, light pasta, calamari fritti.",
    producerInfo:
      "Produced by Cantina Colli del Soligo using the Charmat method.",
    image: B("31"),
    stock: stock(11),
    featured: false,
  },
  {
    id: "soligo-merlot-piave",
    name: "Soligo Merlot DOC Piave",
    winery: "Soligo",
    type: "Red",
    country: "Italy",
    region: "Treviso Veneto",
    year: 2022,
    sizeMl: 1500,
    price: 6.9,
    alcohol: 12.5,
    shortDescription:
      "Friendly, plump Merlot in a magnum: perfect for parties and gatherings.",
    description:
      "A soft, fruit-driven Merlot from the Piave plain, with red plum, cherry and a gentle herbaceous touch. Smooth tannins make it easy and inviting.\n\nPresented in 1500 ml format, it's the perfect bottle for sharing.",
    pairing: "Pasta al ragù, grilled vegetables, family pizza nights.",
    producerInfo:
      "From Soligo's Piave DOC range, grown on alluvial soils in the Veneto.",
    image: B("32"),
    stock: stock(12),
    featured: false,
  },
  {
    id: "soligo-pinot-grigio-magnum",
    name: "Soligo Pinot Grigio delle Venezie",
    winery: "Soligo",
    type: "White",
    country: "Italy",
    region: "Veneto",
    year: 2023,
    sizeMl: 1500,
    price: 6.9,
    alcohol: 12.0,
    shortDescription:
      "Classic Veneto Pinot Grigio: pear, citrus, easy and refreshing, in magnum.",
    description:
      "A clean, varietal Pinot Grigio with pear, lemon zest and a subtle almond finish. Stainless-steel fermentation preserves freshness and aromatic purity.\n\nThe 1500 ml format is ideal for sharing at the table.",
    pairing: "Antipasto misto, seafood pasta, salads, light cheeses.",
    producerInfo:
      "Soligo's Pinot Grigio comes from Veneto vineyards on gravelly soils.",
    image: B("33"),
    stock: stock(13),
    featured: false,
  },
  {
    id: "chianti-docg-le-corti-dei-podesta",
    name: "Chianti DOCG Le Corti dei Podestà",
    winery: "Villa Cerna",
    type: "Red",
    country: "Italy",
    region: "Tuscany",
    year: 2021,
    sizeMl: 750,
    price: 7.5,
    alcohol: 13.0,
    shortDescription:
      "Classic Sangiovese: red cherry, violet, savoury olive, pure Tuscan charm.",
    description:
      "A bright, food-friendly Chianti from Castellina-in-Chianti. Predominantly Sangiovese with a small share of complementary varieties, showing red cherry, dried herbs and a savoury edge.\n\nFresh acidity and chalky tannins make it a perfect everyday Italian.",
    pairing: "Pizza margherita, tagliatelle al ragù, grilled lamb chops.",
    producerInfo:
      "Le Corti dei Podestà is part of Villa Cerna's portfolio, sourced from classic Chianti zones.",
    image: B("37"),
    stock: stock(14),
    featured: false,
  },
  {
    id: "vernaccia-san-gimignano",
    name: "Vernaccia di San Gimignano",
    winery: "Villa Cerna",
    type: "White",
    country: "Italy",
    region: "Tuscany",
    year: 2022,
    sizeMl: 750,
    price: 7.5,
    alcohol: 12.5,
    shortDescription:
      "Tuscany's signature white: citrus, green almond, distinct mineral bite.",
    description:
      "Vernaccia is the historic white grape of San Gimignano. This bottling shows lemon, white flower and a hint of bitter almond on the finish: a savoury, mineral white with character.",
    pairing: "Pecorino, vegetable risotto, fritto misto, grilled fish.",
    producerInfo:
      "Le Corti dei Podestà's Vernaccia is hand-harvested in San Gimignano.",
    image: B("38"),
    stock: stock(15),
    featured: false,
  },
  {
    id: "chianti-classico-primocolle",
    name: "Chianti Classico DOCG Primocolle",
    winery: "Villa Cerna",
    type: "Red",
    country: "Italy",
    region: "Tuscany",
    year: 2020,
    sizeMl: 750,
    price: 12.9,
    alcohol: 13.5,
    shortDescription:
      "Structured Sangiovese from the Classico zone: depth, finesse, length.",
    description:
      "From Villa Cerna's vineyards in Castellina-in-Chianti, Primocolle Chianti Classico is aged in oak to integrate the firm Sangiovese tannins.\n\nDark cherry, balsamic herbs and tobacco lead a textured palate with persistent length. A serious Tuscan red at a fair price.",
    pairing: "Bistecca alla Fiorentina, aged Pecorino, wild mushroom pappardelle.",
    producerInfo:
      "Villa Cerna is owned by the Cecchi family and farms premium Chianti Classico estates.",
    image: B("39"),
    stock: stock(16),
    featured: true,
  },
  {
    id: "chianti-classico-riserva-villa-cerna",
    name: "Chianti Classico Riserva DOCG Villa Cerna",
    winery: "Villa Cerna",
    type: "Red",
    country: "Italy",
    region: "Tuscany",
    year: 2019,
    sizeMl: 750,
    price: 25.0,
    alcohol: 14.0,
    shortDescription:
      "Riserva-level Chianti Classico: concentrated, polished, age-worthy.",
    description:
      "An estate-grown Riserva aged 24 months in oak. The wine offers black cherry, leather, sweet tobacco and crushed violet over a long, mineral finish.\n\nFirm but ripe tannins promise another decade of pleasure in the cellar.",
    pairing: "Roast beef, osso buco, aged hard cheeses, truffle dishes.",
    producerInfo:
      "Villa Cerna's flagship Riserva is sourced from the estate's oldest vineyard parcels.",
    image: B("40"),
    stock: stock(17),
    featured: false,
  },
  {
    id: "barolo-angelo-negro",
    name: "Barolo DOCG Angelo Negro",
    winery: "Angelo Negro",
    type: "Red",
    country: "Italy",
    region: "Piedmont",
    year: 2019,
    sizeMl: 750,
    price: 35.5,
    alcohol: 14.0,
    shortDescription:
      "Classical Barolo: rose, tar, dark cherry, built to age.",
    description:
      "Angelo Negro's Barolo from Piedmont showcases the Nebbiolo grape at its most ageworthy. Garnet-edged colour gives way to a perfumed nose of rose petal, dried cherry, leather and tar.\n\nThe palate is structured, grippy, and remarkably long. Decant before serving or cellar for 5–15 years.",
    pairing: "Braised veal, brasato al Barolo, truffle risotto, aged Castelmagno.",
    producerInfo:
      "The Negro family has produced wine in Roero since the 17th century, now in its fourth generation.",
    image: "/wines/barolo-angelo-negro.png",
    stock: stock(18),
    featured: true,
  },
  {
    id: "barbaresco-angelo-negro",
    name: "Barbaresco DOCG Angelo Negro",
    winery: "Angelo Negro",
    type: "Red",
    country: "Italy",
    region: "Piedmont",
    year: 2020,
    sizeMl: 750,
    price: 27.95,
    alcohol: 14.0,
    shortDescription:
      "Elegant, perfumed Nebbiolo: Barolo's silkier sister.",
    description:
      "Barbaresco is often described as the more elegant counterpart to Barolo. Angelo Negro's bottling delivers fragrant red rose, raspberry, sweet spice and silky tannins.\n\nLighter on its feet than the Barolo, but no less compelling: drinks beautifully now or with 8–10 years' age.",
    pairing: "Roast duck, hare ragù, aged tomes, dark chocolate.",
    producerInfo:
      "Negro's Barbaresco draws on hillside Nebbiolo parcels in the Langhe.",
    image: "/wines/barbaresco-angelo-negro.jpg",
    stock: stock(19),
    featured: false,
  },
  {
    id: "brunello-gli-amici",
    name: "Brunello di Montalcino DOCG Gli Amici",
    winery: "Gli Amici",
    type: "Red",
    country: "Italy",
    region: "Tuscany",
    year: 2018,
    sizeMl: 750,
    price: 31.5,
    alcohol: 14.5,
    shortDescription:
      "Pure Sangiovese Grosso: the king of Montalcino.",
    description:
      "Aged in oak for the regulation 24 months and a further period in bottle, Gli Amici Brunello offers dark cherry, fig, leather and Mediterranean scrub.\n\nThe palate is layered and powerful, with fine, integrated tannins and a long savoury finish. A reference for collectors.",
    pairing: "Tuscan steak, wild boar, aged Pecorino, slow-braised oxtail.",
    producerInfo:
      "A boutique Montalcino estate producing traditionally styled Brunello.",
    image: B("56"),
    stock: stock(20),
    featured: false,
  },
  {
    id: "isaltari-amarone-riserva",
    name: "I Saltari Amarone della Valpolicella Riserva DOCG",
    winery: "I Saltari",
    type: "Red",
    country: "Italy",
    region: "Valpolicella",
    year: 2017,
    sizeMl: 750,
    price: 50.0,
    alcohol: 15.5,
    shortDescription:
      "Riserva Amarone: opulent, deep, contemplative. A collector's pour.",
    description:
      "Made from appassimento-dried Corvina, Rondinella and Molinara grapes, this Riserva-level Amarone reveals dried fig, sour cherry liqueur, dark chocolate, espresso and balsamic notes.\n\nFull-bodied yet elegantly balanced, with velvety tannins and a long, warming finish. Built to age 15+ years.",
    pairing: "Slow-cooked braises, game, aged Parmigiano, dark chocolate desserts.",
    producerInfo:
      "I Saltari is a boutique Valpolicella estate dedicated to traditional appassimento.",
    image: B("21"),
    stock: stock(21),
    featured: true,
  },
  {
    id: "isaltari-valpolicella-superiore",
    name: "I Saltari Valpolicella Superiore DOC",
    winery: "I Saltari",
    type: "Red",
    country: "Italy",
    region: "Valpolicella",
    year: 2020,
    sizeMl: 750,
    price: 18.0,
    alcohol: 13.5,
    shortDescription:
      "Concentrated Valpolicella Superiore: cherry, plum, gentle spice.",
    description:
      "A Superiore-classification Valpolicella with extra depth from longer ageing. Notes of black cherry, sweet plum and a touch of cocoa, with savoury, herbal lift on the finish.",
    pairing: "Pasta with lamb ragù, grilled lamb chops, polenta with mushrooms.",
    producerInfo:
      "I Saltari's Superiore uses traditional Valpolicella varieties on hillside parcels.",
    image: B("22"),
    stock: stock(22),
    featured: false,
  },
  {
    id: "murari-amarone-docg",
    name: "Murari Amarone della Valpolicella DOCG",
    winery: "Murari",
    type: "Red",
    country: "Italy",
    region: "Valpolicella",
    year: 2018,
    sizeMl: 750,
    price: 30.0,
    alcohol: 15.0,
    shortDescription:
      "Powerful, raisined Amarone: Corvina at its most expressive.",
    description:
      "Grapes are dried for 100+ days to concentrate the sugars before fermentation. The result is a powerhouse of dried cherry, fig, dark chocolate and tobacco.\n\nFull, plush palate with warming alcohol and a long, lingering finish.",
    pairing: "Beef brisket, braised short ribs, aged Asiago, dark chocolate tart.",
    producerInfo:
      "Family-run Murari produces Amarone using traditional appassimento methods.",
    image: B("23"),
    stock: stock(23),
    featured: true,
  },
  {
    id: "murari-ripasso",
    name: "Murari Valpolicella Ripasso DOC",
    winery: "Murari",
    type: "Red",
    country: "Italy",
    region: "Valpolicella",
    year: 2021,
    sizeMl: 750,
    price: 13.5,
    alcohol: 14.0,
    shortDescription:
      "'Baby Amarone': Valpolicella refermented on Amarone skins for richness.",
    description:
      "Ripasso takes regular Valpolicella and re-passes it over Amarone lees, picking up structure, body and flavour. Murari's version delivers sour cherry, raisin, cocoa and a savoury, balsamic finish.\n\nGreat value for the depth on offer.",
    pairing: "Osso buco, pasta with sausage ragù, lamb stew, hard cheeses.",
    producerInfo:
      "Murari's Ripasso is a mainstay of their range, blending tradition and approachability.",
    image: B("24"),
    stock: stock(24),
    featured: false,
  },
  {
    id: "murari-valpolicella",
    name: "Murari Valpolicella DOC",
    winery: "Murari",
    type: "Red",
    country: "Italy",
    region: "Veneto",
    year: 2022,
    sizeMl: 750,
    price: 7.9,
    alcohol: 12.5,
    shortDescription:
      "Light, juicy Valpolicella: fresh cherry, supple, easy.",
    description:
      "An entry-level Valpolicella blending Corvina, Rondinella and Molinara. Bright cherry and red plum, with soft tannins and a refreshing finish.\n\nServe slightly cool for maximum enjoyment.",
    pairing: "Pizza, charcuterie, mushroom pasta, light grilled meats.",
    producerInfo:
      "Murari's everyday Valpolicella delivers the region's charm at a friendly price.",
    image: B("25"),
    stock: stock(25),
    featured: false,
  },
  {
    id: "pinot-grigio-rose-almorano",
    name: "Pinot Grigio Rosé IGT Almorano",
    winery: "Murari",
    type: "Rosé",
    country: "Italy",
    region: "Veneto",
    year: 2023,
    sizeMl: 750,
    price: 5.9,
    alcohol: 12.0,
    shortDescription:
      "Ramato-style Pinot Grigio: pale copper, refreshing, gastronomic.",
    description:
      "A Veneto Pinot Grigio with brief skin contact, giving a delicate copper-pink colour. Aromatic notes of strawberry, white peach and citrus zest, with a crisp dry palate.",
    pairing: "Carpaccio, prosciutto with melon, seafood risotto.",
    producerInfo:
      "Almorano is a Veneto label crafted in the traditional ramato style.",
    image: B("26"),
    stock: stock(26),
    featured: false,
  },
  {
    id: "murari-pinot-grigio",
    name: "Murari Pinot Grigio delle Venezie DOC",
    winery: "Murari",
    type: "White",
    country: "Italy",
    region: "Veneto",
    year: 2023,
    sizeMl: 750,
    price: 5.9,
    alcohol: 12.0,
    shortDescription:
      "Crisp Veneto Pinot Grigio: pear, citrus, refreshing finish.",
    description:
      "Cool fermentation preserves the bright fruit and aromatic purity. Pear, green apple, citrus zest and a clean dry finish.\n\nA reliable, food-friendly Italian white.",
    pairing: "Antipasti, vegetable risotto, light fish, summer salads.",
    producerInfo:
      "Murari's entry-level Pinot Grigio is a Veneto classic.",
    image: B("27"),
    stock: stock(27),
    featured: false,
  },
  {
    id: "les-jamelles-champenoise-brut",
    name: "Les Jamelles Méthode Champenoise Traditionnelle Brut",
    winery: "Les Jamelles",
    type: "Sparkling",
    country: "France",
    region: "Sud de la France",
    year: 2021,
    sizeMl: 750,
    price: 10.9,
    alcohol: 12.0,
    shortDescription:
      "Traditional-method bubbly from southern France: Champenoise without the Champagne price.",
    description:
      "Produced by the classical Champenoise method, this Brut sparkler from Les Jamelles offers green apple, brioche and white flower notes, with a fine, persistent mousse and a dry, mineral finish.",
    pairing: "Aperitif, oysters, fried calamari, fresh goat's cheese.",
    producerInfo:
      "Les Jamelles is the varietal label of Catherine and Laurent Delaunay in Languedoc.",
    image: "/wines/les-jamelles-champenoise-brut.webp",
    stock: stock(28),
    featured: false,
  },
  {
    id: "les-jamelles-mourvedre",
    name: "Les Jamelles Mourvèdre Rouge",
    winery: "Les Jamelles",
    type: "Red",
    country: "France",
    region: "Sud de la France",
    year: 2021,
    sizeMl: 750,
    price: 7.0,
    alcohol: 13.5,
    shortDescription:
      "Dark, spicy Mourvèdre: blackberry, leather, garrigue.",
    description:
      "Mourvèdre thrives in Languedoc's heat, yielding a dense, savoury wine with black fruit, pepper and a wild, herbal lift. Sleek tannins and a long finish.",
    pairing: "Grilled lamb skewers, beef daube, hard sheep's cheese.",
    producerInfo:
      "Les Jamelles works with selected growers across Languedoc-Roussillon.",
    image: "/wines/les-jamelles-mourvedre.jpg",
    stock: stock(29),
    featured: false,
  },
  {
    id: "les-jamelles-syrah",
    name: "Les Jamelles Syrah Rouge",
    winery: "Les Jamelles",
    type: "Red",
    country: "France",
    region: "Sud de la France",
    year: 2022,
    sizeMl: 750,
    price: 6.75,
    alcohol: 13.5,
    shortDescription:
      "Languedoc Syrah: blueberry, black pepper, smooth and ripe.",
    description:
      "A varietal southern French Syrah with juicy black fruit, white pepper and a touch of violet. Approachable tannins and good freshness make it an easy match for grilled meats.",
    pairing: "Grilled steak, lamb burgers, ratatouille.",
    producerInfo:
      "From Les Jamelles' single-varietal Sud de la France collection.",
    image: "/wines/les-jamelles-syrah.jpg",
    stock: stock(30),
    featured: false,
  },
  {
    id: "les-jamelles-malbec",
    name: "Les Jamelles Malbec IGP",
    winery: "Les Jamelles",
    type: "Red",
    country: "France",
    region: "Sud de la France",
    year: 2022,
    sizeMl: 750,
    price: 6.95,
    alcohol: 13.5,
    shortDescription:
      "Sun-ripened French Malbec: dark plum, cocoa, supple finish.",
    description:
      "A southern French take on Malbec, offering ripe black plum, cocoa, sweet spice and silky tannins. Plenty of charm at a friendly price.",
    pairing: "Grilled red meats, lamb tagine, hard cheeses.",
    producerInfo:
      "Created by Catherine Delaunay, Les Jamelles is a single-variety expression of southern France.",
    image: "/wines/les-jamelles-malbec.jpg",
    stock: stock(31),
    featured: false,
  },
  {
    id: "les-jamelles-merlot",
    name: "Les Jamelles Merlot IGP",
    winery: "Les Jamelles",
    type: "Red",
    country: "France",
    region: "Sud de la France",
    year: 2022,
    sizeMl: 750,
    price: 6.75,
    alcohol: 13.5,
    shortDescription:
      "Plush, fruit-forward Merlot: ripe plum, soft tannins, smooth finish.",
    description:
      "A sun-ripened Languedoc Merlot with notes of black plum, cherry compote and a hint of vanilla. Smooth and gentle, perfect for everyday drinking.",
    pairing: "Roast chicken, mushroom risotto, mild cheeses.",
    producerInfo:
      "Part of Les Jamelles' pure-varietal collection from Pays d'Oc.",
    image: "/wines/les-jamelles-merlot.jpg",
    stock: stock(32),
    featured: false,
  },
  {
    id: "les-jamelles-reflets-rose",
    name: "Les Jamelles Reflets Secrets Rosé IGP",
    winery: "Les Jamelles",
    type: "Rosé",
    country: "France",
    region: "Sud de la France",
    year: 2023,
    sizeMl: 750,
    price: 8.5,
    alcohol: 12.5,
    shortDescription:
      "Pale, perfumed southern French rosé: citrus, peach, dry and elegant.",
    description:
      "A delicate, pale-pink rosé blending Grenache and Cinsault. Aromatic notes of white peach, citrus zest and red berry, with a fresh, refined dry palate.",
    pairing: "Mediterranean salads, grilled prawns, sushi, summer brunch.",
    producerInfo:
      "Les Jamelles' Reflets Secrets is a premium expression of southern French rosé.",
    image: "/wines/les-jamelles-reflets-rose.png",
    stock: stock(33),
    featured: false,
  },
  {
    id: "petites-jamelles-blanc",
    name: "Les Petites Jamelles Blanc",
    winery: "Les Jamelles",
    type: "White",
    country: "France",
    region: "Sud de la France",
    year: 2023,
    sizeMl: 750,
    price: 4.25,
    alcohol: 12.0,
    shortDescription:
      "Fresh & fruity entry-level Languedoc white: easy daily drinking.",
    description:
      "A bright, fruit-forward blend of southern French white varieties. Lemon, peach and white flower notes lead a clean, dry palate.",
    pairing: "Salads, light pasta, fish goujons, aperitivo snacks.",
    producerInfo:
      "Les Petites Jamelles is the everyday tier of the Delaunay portfolio.",
    image: "/wines/petites-jamelles-blanc.png",
    stock: stock(34),
    featured: false,
  },
  {
    id: "petites-jamelles-rouge",
    name: "Les Petites Jamelles Rouge",
    winery: "Les Jamelles",
    type: "Red",
    country: "France",
    region: "Sud de la France",
    year: 2022,
    sizeMl: 750,
    price: 4.25,
    alcohol: 13.0,
    shortDescription:
      "Soft, juicy southern French red: strawberry, plum, gentle spice.",
    description:
      "A friendly Languedoc red blending Merlot, Syrah and Grenache. Easy red fruit, soft tannins and a clean finish: uncomplicated and very drinkable.",
    pairing: "Pasta, pizza, charcuterie, simple stews.",
    producerInfo:
      "Les Petites Jamelles offers Languedoc charm at an entry price point.",
    image: "/wines/petites-jamelles-rouge.webp",
    stock: stock(35),
    featured: false,
  },
  {
    id: "les-jamelles-gewurztraminer",
    name: "Les Jamelles Gewurztraminer Blanc IGP",
    winery: "Les Jamelles",
    type: "White",
    country: "France",
    region: "Sud de la France",
    year: 2022,
    sizeMl: 750,
    price: 8.5,
    alcohol: 13.0,
    shortDescription:
      "Aromatic Gewurztraminer: lychee, rose, exotic spice.",
    description:
      "A southern French expression of the famously perfumed Gewurztraminer grape. Lychee, rose petal, ginger and exotic fruit on the nose, with a richer, off-dry palate balanced by good acidity.",
    pairing: "Thai curries, foie gras, blue cheese, spiced tagines.",
    producerInfo:
      "Les Jamelles brings Alsace-style aromatics to Languedoc soils.",
    image: "/wines/les-jamelles-gewurztraminer.jpg",
    stock: stock(36),
    featured: false,
  },
  {
    id: "les-jamelles-viognier",
    name: "Les Jamelles Viognier Blanc IGP",
    winery: "Les Jamelles",
    type: "White",
    country: "France",
    region: "Sud de la France",
    year: 2022,
    sizeMl: 750,
    price: 6.9,
    alcohol: 13.5,
    shortDescription:
      "Lush Viognier: apricot, honeysuckle, full-bodied charm.",
    description:
      "A fragrant, full-bodied southern French Viognier. Ripe apricot, peach, honeysuckle and a touch of ginger lead a lush, mouth-filling palate balanced by gentle acidity.",
    pairing: "Roast chicken, prawn linguine, soft cheeses, Asian-inspired dishes.",
    producerInfo:
      "Part of Les Jamelles' single-varietal Languedoc range.",
    image: "/wines/les-jamelles-viognier.jpg",
    stock: stock(37),
    featured: false,
  },
  {
    id: "les-jamelles-sauvignon-blanc",
    name: "Les Jamelles Sauvignon Blanc IGP",
    winery: "Les Jamelles",
    type: "White",
    country: "France",
    region: "Sud de la France",
    year: 2023,
    sizeMl: 750,
    price: 6.75,
    alcohol: 12.5,
    shortDescription:
      "Crisp Languedoc Sauvignon: citrus, gooseberry, refreshing.",
    description:
      "Bright tropical and citrus notes: gooseberry, lime peel, white peach, supported by zippy acidity and a clean mineral finish. A great-value daily white.",
    pairing: "Goat's cheese salad, fresh seafood, ceviche, grilled chicken.",
    producerInfo:
      "From Les Jamelles' pure-varietal Pays d'Oc collection.",
    image: "/wines/les-jamelles-sauvignon-blanc.webp",
    stock: stock(38),
    featured: false,
  },
  {
    id: "ventisquero-classico-merlot",
    name: "Ventisquero Classico Merlot",
    winery: "Viña Ventisquero",
    type: "Red",
    country: "Chile",
    region: "Central Valley",
    year: 2022,
    sizeMl: 750,
    price: 5.95,
    alcohol: 13.0,
    shortDescription:
      "Soft, plummy Chilean Merlot: easy fruit, smooth tannins.",
    description:
      "A friendly Central Valley Merlot from New World Winery of the Year 2024. Ripe plum, blackberry and a touch of vanilla, with smooth tannins and an inviting finish.",
    pairing: "Burgers, pasta with red sauce, mild cheeses, charcuterie.",
    producerInfo:
      "Viña Ventisquero, founded 1998, was named New World Winery of the Year 2024.",
    image: B("01"),
    stock: stock(39),
    featured: false,
  },
  {
    id: "ventisquero-classico-syrah",
    name: "Ventisquero Classico Syrah",
    winery: "Viña Ventisquero",
    type: "Red",
    country: "Chile",
    region: "Central Valley",
    year: 2022,
    sizeMl: 750,
    price: 5.95,
    alcohol: 13.5,
    shortDescription:
      "Juicy Chilean Syrah: blackberry, pepper, soft and approachable.",
    description:
      "A New World Syrah with ripe black fruit, white pepper and a touch of mocha. Smooth tannins make it a versatile crowd-pleaser.",
    pairing: "Grilled meats, BBQ, lamb chops, mushroom dishes.",
    producerInfo:
      "Ventisquero's Classico range showcases Chile's fruit-forward style at great value.",
    image: B("02"),
    stock: stock(40),
    featured: false,
  },
  {
    id: "ventisquero-classico-sauvignon-blanc",
    name: "Ventisquero Classico Sauvignon Blanc",
    winery: "Viña Ventisquero",
    type: "White",
    country: "Chile",
    region: "Central Valley",
    year: 2023,
    sizeMl: 750,
    price: 5.95,
    alcohol: 12.5,
    shortDescription:
      "Bright Chilean Sauvignon: citrus, tropical fruit, zippy finish.",
    description:
      "A clean, varietal Sauvignon Blanc with lime, passionfruit and grapefruit notes. Crisp acidity and a refreshing dry finish.",
    pairing: "Seafood, salads, fresh cheeses, light Asian dishes.",
    producerInfo:
      "Ventisquero's Classico Sauvignon Blanc is sourced from the cool Central Valley.",
    image: B("03"),
    stock: stock(41),
    featured: false,
  },
  {
    id: "ventisquero-reserve-sauvignon-blanc",
    name: "Ventisquero Reserve Sauvignon Blanc",
    winery: "Viña Ventisquero",
    type: "White",
    country: "Chile",
    region: "Casablanca Valley",
    year: 2023,
    sizeMl: 750,
    price: 7.5,
    alcohol: 13.0,
    shortDescription:
      "Cool-climate Casablanca Sauvignon: fresh, mineral, expressive.",
    description:
      "From the cool, ocean-influenced Casablanca Valley. Intense aromas of grapefruit, gooseberry and fresh herbs, with crisp acidity and a saline finish.",
    pairing: "Sushi, oysters, ceviche, goat's cheese salad.",
    producerInfo:
      "Casablanca is one of Chile's premier cool-climate regions for aromatic whites.",
    image: B("04"),
    stock: stock(42),
    featured: true,
  },
  {
    id: "ventisquero-reserve-chardonnay",
    name: "Ventisquero Reserve Chardonnay",
    winery: "Viña Ventisquero",
    type: "White",
    country: "Chile",
    region: "Casablanca Valley",
    year: 2022,
    sizeMl: 750,
    price: 7.5,
    alcohol: 13.0,
    shortDescription:
      "Lightly oaked Casablanca Chardonnay: peach, vanilla, balanced.",
    description:
      "A poised Chardonnay from cool Casablanca, partially oak-aged. Notes of yellow peach, lemon curd, almond and gentle vanilla. Balanced, with good freshness and texture.",
    pairing: "Roast chicken, seafood pasta, soft cheeses, creamy chowders.",
    producerInfo:
      "Ventisquero's Reserve range delivers serious quality at accessible prices.",
    image: B("05"),
    stock: stock(43),
    featured: false,
  },
  {
    id: "ventisquero-reserve-cabernet",
    name: "Ventisquero Reserve Cabernet Sauvignon",
    winery: "Viña Ventisquero",
    type: "Red",
    country: "Chile",
    region: "Maipo Valley",
    year: 2021,
    sizeMl: 750,
    price: 7.5,
    alcohol: 13.5,
    shortDescription:
      "Structured Maipo Cabernet: blackcurrant, eucalyptus, gentle oak.",
    description:
      "Maipo Valley is the classic home of Chilean Cabernet. Ventisquero's Reserve shows ripe blackcurrant, cassis, mint and a touch of cedar from oak ageing.\n\nFirm but ripe tannins promise food-friendly versatility.",
    pairing: "Grilled steak, lamb roast, hard cheeses, beef stews.",
    producerInfo:
      "Maipo's gravelly soils and sunny climate produce textbook Cabernet.",
    image: B("06"),
    stock: stock(44),
    featured: false,
  },
  {
    id: "ventisquero-reserve-merlot",
    name: "Ventisquero Reserve Merlot",
    winery: "Viña Ventisquero",
    type: "Red",
    country: "Chile",
    region: "Maipo Valley",
    year: 2021,
    sizeMl: 750,
    price: 7.5,
    alcohol: 13.5,
    shortDescription:
      "Plump Maipo Merlot: ripe plum, chocolate, supple finish.",
    description:
      "A polished, fruit-forward Merlot with notes of ripe plum, dark cherry and chocolate. Round tannins and good length.",
    pairing: "Roast pork, mushroom risotto, mild blues.",
    producerInfo:
      "Ventisquero's Reserve Merlot comes from carefully managed Maipo vineyards.",
    image: B("07"),
    stock: stock(45),
    featured: false,
  },
  {
    id: "ventisquero-reserve-pinot-noir",
    name: "Ventisquero Reserve Pinot Noir",
    winery: "Viña Ventisquero",
    type: "Red",
    country: "Chile",
    region: "Casablanca Valley",
    year: 2022,
    sizeMl: 750,
    price: 7.5,
    alcohol: 13.0,
    shortDescription:
      "Cool-climate Pinot Noir: red cherry, earth, silky texture.",
    description:
      "From cool Casablanca, this Pinot Noir delivers red cherry, raspberry and earthy notes with gentle oak influence. Silky tannins and a refreshing finish.",
    pairing: "Duck breast, mushroom risotto, soft cheeses, grilled salmon.",
    producerInfo:
      "Casablanca's morning fogs are perfect for delicate Pinot Noir.",
    image: B("10"),
    stock: stock(46),
    featured: false,
  },
  {
    id: "ventisquero-grey-carmenere",
    name: "Ventisquero Grey Carménère Oak Aged 12 Months",
    winery: "Viña Ventisquero",
    type: "Red",
    country: "Chile",
    region: "Maipo Valley",
    year: 2020,
    sizeMl: 750,
    price: 12.95,
    alcohol: 14.0,
    shortDescription:
      "Single-block Carménère: Chile's signature grape, oak-aged and concentrated.",
    description:
      "The Grey range showcases single-block expressions. This Carménère, aged 12 months in oak, delivers blackberry, dark plum, green pepper, chocolate and a smoky edge.\n\nA serious, complex example of Chile's flagship variety.",
    pairing: "Grilled lamb, beef short ribs, mole-spiced dishes.",
    producerInfo:
      "Ventisquero's Grey series highlights single-vineyard, terroir-driven wines.",
    image: "/wines/ventisquero-grey-carmenere.webp",
    stock: stock(47),
    featured: true,
  },
  {
    id: "ventisquero-grey-syrah",
    name: "Ventisquero Grey Syrah Oak Aged 12 Months",
    winery: "Viña Ventisquero",
    type: "Red",
    country: "Chile",
    region: "Colchagua Valley Apalta",
    year: 2020,
    sizeMl: 750,
    price: 12.95,
    alcohol: 14.0,
    shortDescription:
      "Single-block Apalta Syrah: dense, peppery, beautifully oaked.",
    description:
      "From the famous Apalta amphitheater, this Grey Syrah offers blackberry, white pepper, violet and dark chocolate, with firm but polished tannins.\n\nOak ageing adds toast and structure without dominating the fruit.",
    pairing: "Grilled steak, slow-braised short ribs, aged Manchego.",
    producerInfo:
      "Apalta is one of Chile's most prestigious terroirs for Syrah and Carménère.",
    image: "/wines/ventisquero-grey-syrah.jpg",
    stock: stock(48),
    featured: false,
  },
  {
    id: "ventisquero-heru-pinot-noir",
    name: "Ventisquero Heru Pinot Noir Oak Aged",
    winery: "Viña Ventisquero",
    type: "Red",
    country: "Chile",
    region: "Casablanca Valley",
    year: 2020,
    sizeMl: 750,
    price: 20.0,
    alcohol: 13.5,
    shortDescription:
      "Premium Casablanca Pinot: Burgundian elegance from cool Chile.",
    description:
      "Heru is Ventisquero's top-tier Pinot Noir, made from selected parcels in cool Casablanca. Silky, perfumed and elegant, with red cherry, forest floor, gentle spice and integrated oak.",
    pairing: "Roast duck, mushroom dishes, grilled tuna, soft washed-rind cheeses.",
    producerInfo:
      "Heru means 'creator' in the Mapuche language: Ventisquero's pinnacle Pinot.",
    image: B("15"),
    stock: stock(49),
    featured: false,
  },
  {
    id: "ventisquero-enclave",
    name: "Ventisquero Enclave",
    winery: "Viña Ventisquero",
    type: "Red",
    country: "Chile",
    region: "Pirque Maipo Andes",
    year: 2018,
    sizeMl: 750,
    price: 50.0,
    alcohol: 14.5,
    shortDescription:
      "High-altitude Andes Cabernet blend: Ventisquero's pinnacle of Maipo terroir.",
    description:
      "Sourced from old-vine vineyards in Pirque at the foot of the Andes. A powerful Cabernet-led blend with dark cassis, graphite, cedar and fine, chiselled tannins.\n\nAge-worthy and refined: one of Chile's icon wines.",
    pairing: "Aged ribeye, slow-roasted lamb, dark chocolate desserts.",
    producerInfo:
      "Enclave represents Ventisquero's ultimate expression of Maipo Andes terroir.",
    image: B("13"),
    stock: stock(50),
    featured: false,
  },
  {
    id: "ventisquero-obliqua",
    name: "Ventisquero Obliqua",
    winery: "Viña Ventisquero",
    type: "Red",
    country: "Chile",
    region: "Apalta Valley",
    year: 2018,
    sizeMl: 750,
    price: 40.0,
    alcohol: 14.5,
    shortDescription:
      "Carménère-led icon from Apalta: deep, spicy, age-worthy.",
    description:
      "From the iconic Apalta amphitheater, Obliqua is a Carménère-driven blend showing intense black fruit, sweet spice, dark chocolate and tobacco.\n\nFine, dense tannins and a long, layered finish: a serious cellar wine.",
    pairing: "Slow-cooked lamb, beef short ribs, mole, mushroom dishes.",
    producerInfo:
      "Obliqua refers to the steep, oblique slopes of Apalta where the grapes are grown.",
    image: B("14"),
    stock: stock(51),
    featured: false,
  },
  {
    id: "ventisquero-pangea",
    name: "Ventisquero Pangea Syrah",
    winery: "Viña Ventisquero",
    type: "Red",
    country: "Chile",
    region: "Colchagua Valley Apalta",
    year: 2018,
    sizeMl: 750,
    price: 45.0,
    alcohol: 14.5,
    shortDescription:
      "Australian winemaker John Duval's icon Syrah from Apalta.",
    description:
      "Pangea is a collaboration with John Duval (ex-Penfolds Grange). A dense, dark, brooding Syrah with black plum, espresso, smoked meat and violet.\n\nFine-grained tannins and remarkable length make this an icon of Chilean Syrah.",
    pairing: "Grilled ribeye, lamb shoulder, aged hard cheeses.",
    producerInfo:
      "Pangea is named after the prehistoric supercontinent: a tribute to Apalta's ancient terroir.",
    image: B("12"),
    stock: stock(52),
    featured: true,
  },
  {
    id: "stoneburn-sauvignon-blanc",
    name: "Stoneburn Sauvignon Blanc",
    winery: "Stoneburn",
    type: "White",
    country: "New Zealand",
    region: "Marlborough Valley",
    year: 2023,
    sizeMl: 750,
    price: 9.9,
    alcohol: 12.5,
    shortDescription:
      "Classic Marlborough: passionfruit, lime, gooseberry, vibrant.",
    description:
      "Stoneburn's Sauvignon Blanc captures the unmistakable Marlborough signature: passionfruit, gooseberry, lime zest and fresh-cut grass. The palate is crisp, intensely flavoured and refreshingly long.",
    pairing: "Goat's cheese, Thai green curry, seafood, asparagus.",
    producerInfo:
      "Stoneburn's vineyards lie on the river-stone soils of Marlborough's Wairau Valley.",
    image: B("16"),
    stock: stock(53),
    featured: true,
  },
  {
    id: "tahbilk-shiraz",
    name: "Tahbilk Shiraz",
    winery: "Tahbilk",
    type: "Red",
    country: "Australia",
    region: "Victoria Valley",
    year: 2020,
    sizeMl: 750,
    price: 14.95,
    alcohol: 14.0,
    shortDescription:
      "Old-vine Australian Shiraz: plush black fruit, peppery spice.",
    description:
      "Tahbilk has produced wine in Nagambie Lakes, Victoria, since 1860. This Shiraz combines ripe blackberry, cracked pepper, eucalyptus and sweet spice from oak ageing.\n\nA classic Australian style with cellaring potential.",
    pairing: "Grilled lamb, BBQ ribs, pepper steak, hard cheeses.",
    producerInfo:
      "Tahbilk is Victoria's oldest family-owned winery, founded in 1860.",
    image: B("17"),
    stock: stock(54),
    featured: false,
  },
  {
    id: "phebus-malbec",
    name: "Phebus Malbec Reservado",
    winery: "Phebus",
    type: "Red",
    country: "Argentina",
    region: "Mendoza Valley",
    year: 2021,
    sizeMl: 750,
    price: 10.5,
    alcohol: 14.0,
    shortDescription:
      "High-altitude Mendoza Malbec: plum, violet, supple oak.",
    description:
      "Mendoza Malbec from the foothills of the Andes. Notes of ripe black plum, violet, blueberry and a touch of cocoa, with velvety tannins and good length.",
    pairing: "Argentine asado, grilled steak, empanadas, hard cheeses.",
    producerInfo:
      "Phebus crafts Mendoza Malbec in the elevated parcels around the Uco Valley.",
    image: B("18"),
    stock: stock(55),
    featured: false,
  },
  {
    id: "alvis-drift-chenin",
    name: "Alvi's Drift Chenin Blanc",
    winery: "Alvi's Drift",
    type: "White",
    country: "South Africa",
    region: "Western Cape",
    year: 2023,
    sizeMl: 750,
    price: 8.75,
    alcohol: 12.5,
    shortDescription:
      "South African Chenin: pear, quince, honeyed mid-palate, crisp finish.",
    description:
      "Old-vine Chenin from the Breede River Valley. Notes of ripe pear, quince, white peach and a honeyed depth balanced by bright acidity.",
    pairing: "Roast pork, chicken curry, soft cheeses, prawn dishes.",
    producerInfo:
      "Alvi's Drift is a family-owned Western Cape estate on the banks of the Breede River.",
    image: B("19"),
    stock: stock(56),
    featured: false,
  },
  {
    id: "alvis-drift-pinotage",
    name: "Alvi's Drift Pinotage",
    winery: "Alvi's Drift",
    type: "Red",
    country: "South Africa",
    region: "Western Cape",
    year: 2021,
    sizeMl: 750,
    price: 8.75,
    alcohol: 14.0,
    shortDescription:
      "South Africa's signature red: dark fruit, smoke, espresso.",
    description:
      "Pinotage is South Africa's unique cross of Pinot Noir and Cinsault. This Western Cape version delivers blackberry, plum, smoky bacon and a touch of espresso: a confident, characterful red.",
    pairing: "BBQ, lamb sosaties, dark chocolate, hard cheeses.",
    producerInfo:
      "Alvi's Drift produces a celebrated range of South African classics.",
    image: B("20"),
    stock: stock(57),
    featured: false,
  },
  {
    id: "boubas-agiorgitiko-nemea",
    name: "Boubas Agiorgitiko Nemeas",
    winery: "Boubas Wines",
    type: "Red",
    country: "Greece",
    region: "Peloponnese",
    year: 2021,
    sizeMl: 750,
    price: 7.9,
    alcohol: 13.5,
    shortDescription:
      "Nemea Agiorgitiko: ripe red cherry, sweet spice, silky tannins.",
    description:
      "Agiorgitiko is the noble red grape of Nemea. Boubas crafts a polished, fruit-forward example with red cherry, raspberry, sweet spice and gentle oak. Approachable and very food-friendly.",
    pairing: "Lamb kleftiko, moussaka, grilled chops, hard sheep's cheese.",
    producerInfo:
      "Boubas Winery is rooted in the Peloponnese, championing indigenous Greek varieties.",
    image: B("43"),
    stock: stock(58),
    featured: false,
  },
  {
    id: "boubas-agiorgitiko-rose",
    name: "Boubas Agiorgitiko Nemeas Rosé",
    winery: "Boubas Wines",
    type: "Rosé",
    country: "Greece",
    region: "Peloponnese",
    year: 2023,
    sizeMl: 750,
    price: 6.9,
    alcohol: 12.5,
    shortDescription:
      "Greek rosé from Nemea: strawberry, watermelon, fresh and dry.",
    description:
      "A pale-pink Agiorgitiko rosé with bright red berry, watermelon and a crisp dry finish. Vivid acidity and elegant fruit make it a versatile food wine.",
    pairing: "Greek salad, grilled prawns, halloumi, summer meze.",
    producerInfo:
      "Boubas produces a fresh, modern style of Greek rosé from native varieties.",
    image: B("44"),
    stock: stock(59),
    featured: false,
  },
  {
    id: "boubas-moschofilero",
    name: "Boubas Moschofilero",
    winery: "Boubas Wines",
    type: "White",
    country: "Greece",
    region: "Peloponnese",
    year: 2023,
    sizeMl: 750,
    price: 6.9,
    alcohol: 12.0,
    shortDescription:
      "Aromatic Moschofilero: rose, white peach, citrus, vibrant.",
    description:
      "Moschofilero is the aromatic pink-skinned grape of Mantinia. Notes of rose petal, white peach, citrus zest and lychee, with vivid acidity and a crisp dry finish.",
    pairing: "Sushi, grilled seafood, chicken souvlaki, fresh herb salads.",
    producerInfo:
      "Boubas's Moschofilero comes from elevated Peloponnese vineyards.",
    image: B("45"),
    stock: stock(60),
    featured: false,
  },
  {
    id: "boubas-malagouzia",
    name: "Boubas Malagouzia Klarakia",
    winery: "Boubas Wines",
    type: "White",
    country: "Greece",
    region: "Peloponnese",
    year: 2023,
    sizeMl: 750,
    price: 7.9,
    alcohol: 12.5,
    shortDescription:
      "Greek Malagouzia: jasmine, peach, basil, expressive and aromatic.",
    description:
      "A characterful Greek white showing jasmine, white peach, lemon balm and a hint of fresh basil. Generous mid-palate balanced by crisp acidity.",
    pairing: "Sea bass, white tarama, lemon-marinated chicken, Cypriot meze.",
    producerInfo:
      "Boubas Klarakia line champions single-vineyard expressions of indigenous Greek grapes.",
    image: B("46"),
    stock: stock(61),
    featured: true,
  },
  {
    id: "boubas-assyrtiko-klarakia",
    name: "Boubas Assyrtiko Klarakia",
    winery: "Boubas Wines",
    type: "White",
    country: "Greece",
    region: "Corinth",
    year: 2023,
    sizeMl: 750,
    price: 7.5,
    alcohol: 13.0,
    shortDescription:
      "Corinth Assyrtiko: citrus, sea spray, mineral intensity.",
    description:
      "Assyrtiko from Corinth shows the variety's signature citrus, green apple, sea-salt minerality and steely acidity.\n\nLong, savoury finish: perfect with Mediterranean cuisine.",
    pairing: "Grilled octopus, fish meze, calamari, feta dishes.",
    producerInfo:
      "Boubas crafts a Corinth expression of Greece's most famous white grape.",
    image: B("47"),
    stock: stock(62),
    featured: false,
  },
  {
    id: "yiaskouris-mataro-agiorgitiko",
    name: "Yiaskouris Mataro Agiorgitiko",
    winery: "Yiaskouris",
    type: "Red",
    country: "Cyprus",
    region: "Cyprus",
    year: 2022,
    sizeMl: 750,
    price: 5.5,
    alcohol: 13.0,
    shortDescription:
      "Cypriot red blend of Mataro and Agiorgitiko, juicy and savoury.",
    description:
      "A friendly Cypriot blend of Mataro (Mourvèdre) and Agiorgitiko, showing red plum, dried herbs, sun-warmed earth and a savoury, food-friendly finish.",
    pairing: "Sheftalia, souvla, halloumi grills, slow-cooked lamb stifado.",
    producerInfo:
      "Yiaskouris Winery is a family-run estate producing PGI Cyprus wines.",
    image: B("48"),
    stock: stock(63),
    featured: true,
  },
  {
    id: "yiaskouris-oak-maratheftiko",
    name: "Yiaskouris Oak Aged Maratheftiko",
    winery: "Yiaskouris",
    type: "Red",
    country: "Cyprus",
    region: "Cyprus",
    year: 2020,
    sizeMl: 750,
    price: 10.5,
    alcohol: 14.0,
    shortDescription:
      "Native Maratheftiko: Cyprus's flagship red, dark, spicy, oak-aged.",
    description:
      "Maratheftiko is Cyprus's most prestigious indigenous red grape. Oak-aged for added structure, this bottling delivers black cherry, plum, sweet spice and cedar.\n\nFirm tannins and good length make it a serious Cypriot expression.",
    pairing: "Slow-cooked lamb, kleftiko, hard cheeses, mushroom dishes.",
    producerInfo:
      "Yiaskouris champions native Cypriot grapes alongside international varieties.",
    image: B("49"),
    stock: stock(64),
    featured: true,
  },
  {
    id: "yiaskouris-oak-shiraz",
    name: "Yiaskouris Oak Aged Shiraz",
    winery: "Yiaskouris",
    type: "Red",
    country: "Cyprus",
    region: "Cyprus",
    year: 2021,
    sizeMl: 750,
    price: 9.5,
    alcohol: 13.5,
    shortDescription:
      "Cypriot Shiraz: sun-soaked black fruit and Mediterranean herb.",
    description:
      "Shiraz thrives in Cyprus's warm Mediterranean climate. Oak-aged for structure, this wine offers blackberry, fig, white pepper and a touch of liquorice.",
    pairing: "Sheftalia, grilled lamb chops, eastern-spiced dishes.",
    producerInfo:
      "Yiaskouris' Shiraz line reflects Cyprus's adoption of premium international varieties.",
    image: B("51"),
    stock: stock(65),
    featured: false,
  },
  {
    id: "yiaskouris-shiraz",
    name: "Yiaskouris Shiraz",
    winery: "Yiaskouris",
    type: "Red",
    country: "Cyprus",
    region: "Cyprus",
    year: 2022,
    sizeMl: 750,
    price: 7.5,
    alcohol: 13.5,
    shortDescription:
      "Cypriot Shiraz: black fruit, pepper, supple and approachable.",
    description:
      "An everyday Cypriot Shiraz with ripe blackberry, plum, gentle pepper and soft tannins. A great-value daily red from the island.",
    pairing: "Pasta with meat sauce, grilled vegetables, kebabs.",
    producerInfo:
      "Yiaskouris' core Shiraz offers Mediterranean charm at a friendly price.",
    image: B("50"),
    stock: stock(66),
    featured: false,
  },
  {
    id: "yiaskouris-xynisteri-dry",
    name: "Yiaskouris Xynisteri (Dry)",
    winery: "Yiaskouris",
    type: "White",
    country: "Cyprus",
    region: "Cyprus",
    year: 2023,
    sizeMl: 750,
    price: 5.5,
    alcohol: 11.5,
    shortDescription:
      "Indigenous Cypriot Xynisteri: citrus, white blossom, gentle and dry.",
    description:
      "Xynisteri is Cyprus's most planted white grape. This bottling shows lemon zest, white peach, almond and a fresh, dry finish: a perfect Mediterranean aperitif.",
    pairing: "Cypriot meze, grilled halloumi, light fish, salads.",
    producerInfo:
      "Yiaskouris' Xynisteri is sourced from indigenous Cypriot vineyards.",
    image: B("52"),
    stock: stock(67),
    featured: false,
  },
  {
    id: "yiaskouris-xynisteri-medium-dry",
    name: "Yiaskouris Xynisteri Medium Dry",
    winery: "Yiaskouris",
    type: "White",
    country: "Cyprus",
    region: "Cyprus",
    year: 2023,
    sizeMl: 750,
    price: 5.5,
    alcohol: 11.5,
    shortDescription:
      "Off-dry Xynisteri: citrus and white flower with a touch of sweetness.",
    description:
      "A medium-dry version of the indigenous Xynisteri, offering ripe lemon, honeysuckle and a gentle sweetness that pairs beautifully with spicier dishes.",
    pairing: "Mild curries, spiced poultry, fresh fruit, Cypriot pastries.",
    producerInfo:
      "Yiaskouris' off-dry Xynisteri is a versatile food companion.",
    image: B("54"),
    stock: stock(68),
    featured: false,
  },
  {
    id: "yiaskouris-assyrtiko",
    name: "Yiaskouris Assyrtiko",
    winery: "Yiaskouris",
    type: "White",
    country: "Cyprus",
    region: "Cyprus",
    year: 2023,
    sizeMl: 750,
    price: 7.0,
    alcohol: 13.0,
    shortDescription:
      "Cypriot Assyrtiko: citrus, mineral, dry, and gastronomic.",
    description:
      "A taut, mineral Assyrtiko grown on Cypriot soils. Notes of lemon zest, green apple, sea salt and a long, savoury finish.",
    pairing: "Grilled octopus, sea bream, calamari, halloumi meze.",
    producerInfo:
      "Yiaskouris produces a Cypriot expression of Greece's noble white grape.",
    image: B("55"),
    stock: stock(69),
    featured: false,
  },
  {
    id: "yiaskouris-mataro-rose",
    name: "Yiaskouris Mataro Maratheftiko Rosé",
    winery: "Yiaskouris",
    type: "Rosé",
    country: "Cyprus",
    region: "Cyprus",
    year: 2023,
    sizeMl: 750,
    price: 5.5,
    alcohol: 12.5,
    shortDescription:
      "Cypriot rosé of Mataro and Maratheftiko, fruity, dry, summer-ready.",
    description:
      "A bright Cypriot rosé blending Mataro and Maratheftiko. Strawberry, watermelon and a touch of red cherry, with a crisp dry finish.",
    pairing: "Halloumi salad, grilled seafood, meze, light pasta.",
    producerInfo:
      "Yiaskouris' rosé showcases the lighter side of native Cypriot reds.",
    image: B("53"),
    stock: stock(70),
    featured: false,
  },
];

export function getWineById(id: string): Wine | undefined {
  return wines.find((w) => w.id === id);
}

export function getFeaturedWines(): Wine[] {
  return wines.filter((w) => w.featured);
}

// Premium / cellar-worthy bottles surfaced in the Gifts sections.
// (Tag-based selection: these wines also receive `tags: ["gift"]`
// applied at module load via tagWine() below so the Wine.tags field
// stays in sync if anything else queries it.)
const GIFT_IDS = new Set<string>([
  "chateauneuf-du-pape-clos-du-roi",
  "brunello-gli-amici",
  "isaltari-amarone-riserva",
  "murari-amarone-docg",
  "barolo-angelo-negro",
  "barbaresco-angelo-negro",
  "ventisquero-enclave",
  "ventisquero-pangea",
  "yiaskouris-oak-maratheftiko",
]);

// Apply the "gift" tag in place so downstream code (filters, search,
// analytics) sees a consistent tags[] field.
wines.forEach((w) => {
  if (GIFT_IDS.has(w.id)) w.tags = Array.from(new Set([...(w.tags ?? []), "gift"]));
});

export function getGiftWines(limit = 6): Wine[] {
  return wines.filter((w) => w.tags?.includes("gift")).slice(0, limit);
}

export function getRelatedWines(wine: Wine, limit = 4): Wine[] {
  return wines
    .filter(
      (w) =>
        w.id !== wine.id && (w.type === wine.type || w.country === wine.country),
    )
    .slice(0, limit);
}

export const wineTypes: Wine["type"][] = [
  "Red",
  "White",
  "Rosé",
  "Sparkling",
  "Sparkling Rosé",
];

export const wineCountries = Array.from(new Set(wines.map((w) => w.country)));

export const wineSizes = Array.from(new Set(wines.map((w) => w.sizeMl))).sort(
  (a, b) => a - b,
);

export const wineriesList = Array.from(new Set(wines.map((w) => w.winery))).sort();
