"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import {
  wineCountries,
  wineSizes,
  wineTypes,
  wineriesList,
  wines,
} from "@/lib/wines";
import { cn } from "@/lib/utils";

const PRICE_MIN = 0;
const PRICE_MAX = 60;

export default function ProductFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const selectedType = params.get("type") ?? "";
  const selectedCountry = params.get("country") ?? "";
  const selectedRegion = params.get("region") ?? "";
  const selectedWinery = params.get("winery") ?? "";
  const selectedSize = params.get("size") ?? "";
  const maxPrice = Number(params.get("maxPrice") ?? PRICE_MAX);

  const regions = useMemo(() => {
    const filtered = selectedCountry
      ? wines.filter((w) => w.country === selectedCountry)
      : wines;
    return Array.from(new Set(filtered.map((w) => w.region))).sort();
  }, [selectedCountry]);

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    if (key === "country") next.delete("region");
    router.replace(`/products?${next.toString()}`, { scroll: false });
  };

  const clearAll = () => router.replace("/products", { scroll: false });

  const activeCount = [
    selectedType,
    selectedCountry,
    selectedRegion,
    selectedWinery,
    selectedSize,
    maxPrice < PRICE_MAX ? "p" : "",
  ].filter(Boolean).length;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const filterBody = (
    <div className="space-y-6">
      <FilterGroup label="Type">
        {/* 2-col grid on mobile so chips stack cleanly two-by-two
            instead of an awkward flex wrap. */}
        <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-2">
          {wineTypes.map((t) => (
            <button
              key={t}
              onClick={() => update("type", selectedType === t ? "" : t)}
              className={cn(
                "px-3 py-2 lg:py-1.5 text-xs uppercase tracking-wider rounded-sm border transition-colors text-center",
                selectedType === t
                  ? "bg-ink text-paper border-ink"
                  : "border-line text-ink/80 bg-paper hover:border-ink hover:bg-chalk",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Country">
        <select
          value={selectedCountry}
          onChange={(e) => update("country", e.target.value)}
          className="input-field"
        >
          <option value="">All countries</option>
          {wineCountries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Region">
        <select
          value={selectedRegion}
          onChange={(e) => update("region", e.target.value)}
          className="input-field"
        >
          <option value="">All regions</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Winery">
        <select
          value={selectedWinery}
          onChange={(e) => update("winery", e.target.value)}
          className="input-field"
        >
          <option value="">All wineries</option>
          {wineriesList.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Bottle size">
        <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-2">
          {wineSizes.map((s) => {
            const sStr = String(s);
            const label = s >= 1000 ? `${s / 1000} L` : `${s} ml`;
            const active = selectedSize === sStr;
            return (
              <button
                key={s}
                onClick={() => update("size", active ? "" : sStr)}
                className={cn(
                  "px-3 py-2 lg:py-1.5 text-xs rounded-sm border transition-colors text-center",
                  active
                    ? "bg-ink text-paper border-ink"
                    : "border-line text-ink/80 bg-paper hover:border-ink hover:bg-chalk",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup label={`Max price · €${maxPrice}`}>
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={1}
          value={maxPrice}
          onChange={(e) => update("maxPrice", e.target.value)}
          className="w-full accent-gold"
        />
        <div className="flex justify-between text-xs text-muted mt-1">
          <span>€{PRICE_MIN}</span>
          <span>€{PRICE_MAX}</span>
        </div>
      </FilterGroup>

      {activeCount > 0 && (
        <button onClick={clearAll} className="text-sm text-burgundy hover:underline">
          Clear filters ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 border border-line bg-surface rounded-sm text-burgundy"
      >
        <Filter className="w-4 h-4" /> Filters
        {activeCount > 0 && (
          <span className="ml-1 text-xs bg-burgundy text-[#F8F2E7] px-1.5 py-0.5 rounded">
            {activeCount}
          </span>
        )}
      </button>

      <aside className="hidden lg:block sticky top-24 self-start w-64 flex-shrink-0">
        <h3 className="font-serif text-xl text-ink mb-4">Filters</h3>
        {filterBody}
      </aside>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-burgundy-900/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute inset-x-0 bottom-0 max-h-[85vh] bg-surface border-t border-line rounded-t-lg p-5 overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl text-ink">Filters</h3>
              <button onClick={() => setMobileOpen(false)} aria-label="Close" className="text-burgundy">
                <X className="w-5 h-5" />
              </button>
            </div>
            {filterBody}
            <button
              onClick={() => setMobileOpen(false)}
              className="btn-gold w-full mt-6"
            >
              Show results
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow mb-2">{label}</p>
      {children}
    </div>
  );
}
