interface LoadingProps {
  label?: string;
  className?: string;
}

export const Loading = ({
  label = "Loading...",
  className = "",
}: LoadingProps) => (
  <div
    className={`flex flex-col items-center justify-center gap-3 py-12 ${className}`}
    role="status"
    aria-live="polite"
  >
    <span className="inline-block h-8 w-8 animate-spin-slow rounded-full border-2 border-gold/30 border-t-gold" />
    <span className="text-sm font-medium text-sage">{label}</span>
  </div>
);

export const PageLoading = ({ label = "Loading page..." }: { label?: string }) => (
  <div className="flex min-h-[40vh] items-center justify-center">
    <Loading label={label} />
  </div>
);

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = "" }: SkeletonProps) => (
  <div
    className={`animate-pulse-soft rounded-lg bg-forest/10 ${className}`}
    aria-hidden
  />
);

interface SkeletonGridProps {
  count?: number;
  columns?: 1 | 2 | 3 | 4;
}

export const SkeletonGrid = ({ count = 3, columns = 3 }: SkeletonGridProps) => {
  const colClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={`grid gap-4 ${colClass}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card-surface overflow-hidden p-4">
          <Skeleton className="mb-4 aspect-video w-full" />
          <Skeleton className="mb-2 h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
};
