import { Skeleton } from '@/shared/ui';

export function PageSkeleton() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 space-y-4">
      <Skeleton className="h-10 w-1/4" />
      <Skeleton className="h-6 w-1/2" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    </div>
  );
}

