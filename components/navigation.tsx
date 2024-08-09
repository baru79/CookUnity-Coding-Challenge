import React, { MouseEventHandler } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface Navigation {
  isDisabledPrevious: boolean;
  isDisabledNext: boolean;
  onClickPrevious: MouseEventHandler<HTMLAnchorElement>;
  onClickNext: MouseEventHandler<HTMLAnchorElement>;
}

const Navigation = ({
  isDisabledPrevious,
  isDisabledNext,
  onClickPrevious,
  onClickNext,
}: Navigation) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn({
              "cursor-not-allowed": !isDisabledPrevious,
              "text-[#ddd]": !isDisabledPrevious,
            })}
            isActive={isDisabledPrevious}
            onClick={onClickPrevious}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={cn({
              "cursor-not-allowed": !isDisabledNext,
              "text-[#ddd]": !isDisabledNext,
            })}
            isActive={isDisabledNext}
            onClick={onClickNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Navigation;
