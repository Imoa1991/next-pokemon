import { useState } from "react";

type Sort = {
  column: string;
  direction: string;
};
/*
The logical thing would be for the API to return a _meta with: page_number (current page), page_items (elements of the current page), total_items (total elements) and total_pages (total pages).
*/
export function useTable() {
  const [sort, setSort] = useState<Sort>({
    column: "",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<string>("10");

  function onSort(column: string) {
    let direction;

    if (sort.column !== column) {
      direction = "asc";
    } else {
      direction = sort.direction === "desc" ? "asc" : "desc";
    }

    setSort({
      column,
      direction,
    });
  }

  function onCurrentPage(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  function onPageSize(pageSize: string) {
    setPageSize(pageSize);
  }

  return { onSort, sort, onCurrentPage, currentPage, onPageSize, pageSize };
}
