"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { wines } from "@/lib/wines";
import WineCard from "@/components/WineCard";
import ProductFilters from "@/components/ProductFilters";

type Sort = "price-asc" | "price-desc" | "name-asc" | "country";

export default function ProductsView() {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("name-asc");

  const type = params.get("type") ?? "";
  const country = params.get("country") ?? "";
  const region = params.get("region") ?? "";
  const winery = params.get("winery") ?? "";
  const size = params.get("size") ?? "";
  const maxPrice = Number(params.get("maxPrice") ?? 60);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = wines.filter((w) => {
      if (type && w.type !== type) return false;
      if (country && w.country !== country) return false;
      if (region && w.region !== region) return false;
      if (winery && w.winery !== winery) return false;
      if (size && String(w.sizeMl) !== size) return false;
      if (w.price > maxPrice) return false;
      if (q) {
        const hay = `${w.name} ${w.winery} ${w.region} ${w.country} ${w.type}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "country":
        list = [...list].sort((a, b) => a.country.localeCompare(b.country));
        break;
    }
    return list;
  }, [query, sort, type, country, region, winery, size, maxPrice]);

  return (
    <div className="container-wide py-10">
      <div className="mb-8">
        <p className="eyebrow">Cellar</p>
        <h1 className="heading-serif text-4xl md:text-5xl mt-2">
          The Collection
        </h1>
        <div className="gold-divider" />
        <p className="text-muted mt-2 max-w-2xl">
          Browse {wines.length} carefully selected bottles from Cyprus and the
          great wine regions of the world.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <ProductFilters />

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, winery, region…"
                className="input-field pl-9"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="input-field sm:w-56"
            >
              <option value="name-asc">Name · A–Z</option>
              <option value="price-asc">Price · low to high</option>
              <option value="price-desc">Price · high to low</option>
              <option value="country">Country</option>
            </select>
          </div>

          <p className="text-sm text-muted mb-4">
            Showing <span className="text-burgundy font-medium">{filtered.length}</span>{" "}
            of {wines.length} wines
          </p>

          {filtered.length === 0 ? (
            <div className="card-surface p-10 text-center">
              <p className="font-serif text-2xl text-burgundy-700">No wines match.</p>
              <p className="text-muted mt-2">
                Try clearing some filters or broadening your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {filtered.map((w, i) => (
                <WineCard key={w.id} wine={w} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
