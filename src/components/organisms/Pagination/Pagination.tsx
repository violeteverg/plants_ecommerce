"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

interface PaginationArrowProps {
  direction: "left" | "right";
  pageNumber: number;
  isDisabled: boolean;
  onPageChange: (page: number) => void;
}

const PaginationArrow: FC<PaginationArrowProps> = ({
  direction,
  pageNumber,
  isDisabled,
  onPageChange,
}) => {
  const isLeft = direction === "left";

  return (
    <Button
      onClick={() => !isDisabled && onPageChange(pageNumber)}
      className={`bg-gray-200 text-black hover:bg-gray-200 ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isDisabled}
    >
      {isLeft ? "«" : "»"}
    </Button>
  );
};

export function PaginationProduct({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= pageCount;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationArrow
            direction='left'
            pageNumber={currentPage - 1}
            isDisabled={isFirstPage}
            onPageChange={onPageChange}
          />
        </PaginationItem>
        <PaginationItem>
          <span className='p-2 font-semibold text-black'>
            Page {currentPage} of {pageCount}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationArrow
            direction='right'
            pageNumber={currentPage + 1}
            isDisabled={isLastPage}
            onPageChange={onPageChange}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
