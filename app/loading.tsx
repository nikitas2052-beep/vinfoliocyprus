import WineCardSkeleton from "@/components/WineCardSkeleton";

export default function Loading() {
  return (
    <div className="container-wide py-16">
      <div className="h-10 w-64 shimmer rounded-sm mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <WineCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
