import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-row gap-4 w-auto overflow-x-auto">
      <div className="p-2 min-w-72 max-w-72">
        <Skeleton className="h-6 w-32 mb-2 rounded-md" />

        <Skeleton className="my-0.5 h-16 w-72 rounded-lg" />
        <Skeleton className="my-0.5 h-16 w-72 rounded-lg" />
        <Skeleton className="my-0.5 h-16 w-72 rounded-lg" />
      </div>
      <div className="p-2 min-w-72 max-w-72">
        <Skeleton className="h-6 w-32 mb-2 rounded-md" />

        <Skeleton className="my-0.5 h-16 w-72 rounded-lg" />
        <Skeleton className="my-0.5 h-16 w-72 rounded-lg" />
        <Skeleton className="my-0.5 h-16 w-72 rounded-lg" />
      </div>
      <div className="p-2 min-w-72 max-w-72">
        <Skeleton className="h-6 w-32 mb-2 rounded-md" />

        <Skeleton className="my-0.5 h-16 w-72 rounded-lg" />
        <Skeleton className="my-0.5 h-16 w-72 rounded-lg" />
        <Skeleton className="my-0.5 h-16 w-72 rounded-lg" />
      </div>
    </div>
  );
}
