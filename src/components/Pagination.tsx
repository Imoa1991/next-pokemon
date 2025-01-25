import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationType } from "@/types";

import { cn } from "@/lib/utils";
import Select from "./Select";

export function Pagination({
  totalPages,
  currentPage,
  onCurrentPage,
  onPageSize,
  pageSize,
}: PaginationType) {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onCurrentPage(page);
  };
  const getPages = () => {
    const pages = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  const pages = getPages();
  return (
    <div className="flex items-center justify-between">
      <Select
        groupItems={[
          { value: "10", label: "10" },
          { value: "20", label: "20" },
          { value: "30", label: "30" },
          { value: "40", label: "40" },
          { value: "50", label: "50" },
        ]}
        defaultValue={pageSize}
        onPageSize={onPageSize}
        className="w-max"
      />
      <UIPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              className={cn({
                "pointer-events-none opacity-50": currentPage === 1,
              })}
            />
          </PaginationItem>
          <PaginationItem>
            {pages.map((page, index) => {
              return (
                <PaginationLink
                  href="#"
                  key={index}
                  onClick={() =>
                    typeof page === "number" && handlePageChange(page as number)
                  }
                  isActive={page === currentPage}
                  className={cn({
                    "pointer-events-none": typeof page === "string",
                  })}
                >
                  {page}
                </PaginationLink>
              );
            })}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              className={cn({
                "pointer-events-none opacity-50": currentPage === totalPages,
              })}
            />
          </PaginationItem>
        </PaginationContent>
      </UIPagination>
    </div>
  );
}
