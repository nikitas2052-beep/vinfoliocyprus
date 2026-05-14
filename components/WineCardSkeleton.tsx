export default function WineCardSkeleton() {
  return (
    <div className="card-surface overflow-hidden">
      <div className="aspect-[3/4] shimmer" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-1/3 shimmer rounded-sm" />
        <div className="h-5 w-4/5 shimmer rounded-sm" />
        <div className="h-3 w-1/2 shimmer rounded-sm" />
        <div className="h-6 w-1/3 shimmer rounded-sm mt-2" />
      </div>
    </div>
  );
}
