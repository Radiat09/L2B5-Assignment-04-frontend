import App from "@/App";
import { AddBook } from "@/components/module/books/AddBook";
import { BorrowSummary } from "@/components/module/books/BorrowSummery";
import BookDetails from "@/pages/BookDetails";
import Books from "@/pages/Books";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Books,
      },
      {
        path: "/add-book",
        Component: AddBook,
      },
      {
        path: "/borrow-summery",
        Component: BorrowSummary,
      },
      {
        path: "/books/:id",
        Component: BookDetails,
      },
    ],
  },
]);
