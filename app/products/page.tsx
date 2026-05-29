import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsView from "@/components/ProductsView";
import WineCardSkeleton from "@/components/WineCardSkeleton";

export const metadata: Metadata = {
  title: "All Wines",
  description:
    "Browse Vinfolio's full wine collection: reds, whites, rosés and sparklings from Cyprus, Greece, Italy, France, Chile and beyond.",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container-wide py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
              <WineCardSkeleton key={i} />
            ))}
          </div>
        </div>
      }
    >
      <ProductsView />
    </Suspense>
  );
}
