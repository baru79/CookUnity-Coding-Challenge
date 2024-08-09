import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonCard {
  className?: string;
}

const SkeletonCard = ({ className }: SkeletonCard) => {
  return (
    <div className={cn("flex flex-col space-y-3", className)}>
      <div className="flex justify-between">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[30px]" />
      </div>
      <Skeleton className="h-[125px] w-[250px] rounded-xl m-auto" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[50px]" />
        <Skeleton className="h-4 w-[70px]" />
        <Skeleton className="h-4 w-[50px]" />
      </div>
    </div>
  );
};

export default SkeletonCard;
