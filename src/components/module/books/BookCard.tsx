import { Button } from "@/components/ui/button";
import BorrowBookModal from "./BorrowBookModal";
import { useState } from "react";
import EditBookModal from "./EditBookModal";
import type { IBook } from "@/types";
import DeleteBookModal from "./DeleteBookModal";
import { useNavigate } from "react-router";

interface IProps {
  book: IBook;
}

const BookCard = ({ book }: IProps) => {
  const navigate = useNavigate();
  const [borrowOpen, setBorrowOpen] = useState(false);
  const [editBookOpen, setEditBookOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const desc = book.description ?? "";

  return (
    <>
      <div className="w-full max-w-[300px] shadow-[#004d57] shadow-md rounded-md overflow-hidden text-center p-3 bg-[#0a0a0a] flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mt-1 text-white min-h-14">
            {book.title}
          </h3>
          <p className="text-sm text-gray-400 my-1">BY : "{book.author}"</p>
          <p className="text-sm text-gray-400 my-1">
            Available : {book.available || book.copies > 0 ? "YES" : "NO"}
          </p>
          <p className="text-sm text-gray-400 my-1">Genre : {book.genre}</p>
          <p className="text-sm text-gray-400 my-1">ISBN : {book.isbn}</p>
          <p className="text-red-500 font-semibold">Copies : {book.copies}</p>
          <p className="text-sm text-gray-400 my-1">
            {desc
              ? desc.length > 70
                ? `${desc.slice(0, 70)}...`
                : desc
              : "No description"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2 mt-2">
          <Button
            onClickCapture={() => setBorrowOpen(true)}
            variant="secondary"
            className="flex-1 cursor-pointer"
          >
            Borrow
          </Button>
          <Button
            onClickCapture={() => setEditBookOpen(true)}
            variant="outline"
            className="flex-1 cursor-pointer"
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            className="flex-1 cursor-pointer"
            onClickCapture={() => setDeleteOpen(true)}
          >
            Delete
          </Button>{" "}
        </div>
        <Button
          className="cursor-pointer mt-2"
          onClick={() => navigate(`/books/${book._id}`)}
        >
          See Details
        </Button>
      </div>
      <BorrowBookModal
        book={book}
        open={borrowOpen}
        onClose={() => setBorrowOpen(false)}
      />
      <EditBookModal
        open={editBookOpen}
        book={book}
        onClose={() => setEditBookOpen(false)}
      />
      <DeleteBookModal
        book={book}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />
    </>
  );
};

export default BookCard;
