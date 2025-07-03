import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import BookCard from "@/components/module/books/BookCard";
import { useGetAllBooksQuery } from "@/app/api/baseApi";
import type { IBook } from "@/types";
// ...

export default function Books() {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  const { data, isLoading } = useGetAllBooksQuery({
    page: currentPage,
    limit: booksPerPage,
    sort: "desc",
    sortBy: "createdAt",
  });

  console.log(data);
  return (
    <div className="min-h-screen flex flex-col mx-auto max-w-7xl px-5 my-10">
      {/* Content (everything except pagination) */}
      <div className="flex-grow">
        {/* Your existing code up to just before Pagination */}
        <h4 className="text-3xl">Discover Your Next Book</h4>
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Title & Filter Tabs */}
          {/* ... your existing code ... */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 place-items-center min-h-[200px]">
          {isLoading ? (
            <div className="col-span-full flex justify-center items-center h-full">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : data?.data && data.data.length > 0 ? (
            data.data.map((book: IBook, i: number) => (
              <BookCard book={book} key={book._id || i} />
            ))
          ) : (
            <div className="col-span-full text-gray-400 text-lg mt-10">
              No books found.
            </div>
          )}
        </div>
      </div>

      {/* Pagination - sticky at bottom */}
      {data?.total && data.total > booksPerPage && (
        <div className="mt-10 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
              </PaginationItem>

              {[...Array(Math.ceil(data.total / booksPerPage))].map(
                (_, index) => {
                  const page = index + 1;
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev < Math.ceil((data.total ?? 0) / booksPerPage)
                        ? prev + 1
                        : prev
                    )
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
