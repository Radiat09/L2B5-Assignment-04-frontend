import type { BookQueryParams, IBook } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type response = {
  data?: IBook[];
  total?: number;
  success?: string;
  message?: string;
};

export type BorrowSummaryBook = {
  title: string;
  isbn: string;
};

export type BorrowSummaryItem = {
  totalQuantity: number;
  book: BorrowSummaryBook;
};

export type BorrowSummaryResponse = {
  success: boolean;
  message: string;
  data: BorrowSummaryItem[];
};

export type BorrowBookPayload = {
  book: string;
  quantity: number;
  dueDate: string;
};

export type UpdateBookPayload = {
  data: Partial<IBook>;
  bookId: string;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["BOOK"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://librarymanagement-sable.vercel.app/api",
  }),
  endpoints: (build) => ({
    getAllBooks: build.query<response, BookQueryParams>({
      query: ({ filter, sortBy, sort, limit, page } = {}) => {
        const params = new URLSearchParams();

        if (filter) params.append("filter", filter);
        if (sortBy) params.append("sortBy", sortBy);
        if (sort) params.append("sort", sort);
        if (limit) params.append("limit", limit.toString());
        if (page) params.append("page", page.toString());

        const queryString = params.toString();
        return `/books${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["BOOK"],
    }),
    getBorrowSummery: build.query<BorrowSummaryResponse, void>({
      query: () => "/borrow",
      providesTags: ["BOOK"],
    }),
    addBook: build.mutation<response, Partial<IBook>>({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["BOOK"],
    }),
    borrowBook: build.mutation<response, BorrowBookPayload>({
      query: (data) => ({
        url: "/borrow",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["BOOK"],
    }),
    updateBookData: build.mutation<response, UpdateBookPayload>({
      query: ({ bookId, data }) => ({
        url: `/books/${bookId}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["BOOK"],
    }),
    deleteBook: build.mutation<response, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["BOOK"],
    }),
    getBookById: build.query<IBook, string>({
      query: (id) => `/books/${id}`,
      transformResponse: (response: { success: boolean; data: IBook }) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useAddBookMutation,
  useGetBorrowSummeryQuery,
  useBorrowBookMutation,
  useUpdateBookDataMutation,
  useDeleteBookMutation,
  useGetBookByIdQuery,
} = baseApi;
