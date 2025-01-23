import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const TourDetailsSkeleton = () => (
  <div className="container mx-auto py-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Skeleton className="w-full h-[400px] rounded-lg" />
      <div>
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-8" />
        <Skeleton className="h-6 w-1/4 mb-4" />
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    </div>
  </div>
);
