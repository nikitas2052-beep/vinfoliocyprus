import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRelatedWines, getWineById, wines } from "@/lib/wines";
import ProductDetail from "@/components/ProductDetail";

export async function generateStaticParams() {
  return wines.map((w) => ({ id: w.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const wine = getWineById(params.id);
  if (!wine) return { title: "Wine not found" };
  return {
    title: wine.name,
    description: wine.shortDescription,
    openGraph: {
      title: `${wine.name} · Vinfolio`,
      description: wine.shortDescription,
      images: [{ url: wine.image }],
      type: "website",
    },
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const wine = getWineById(params.id);
  if (!wine) notFound();
  const related = getRelatedWines(wine);
  return <ProductDetail wine={wine} related={related} />;
}
