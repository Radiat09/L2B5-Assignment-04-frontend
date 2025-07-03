// components/modals/DeleteBookModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { IBook } from "@/types";
import { useDeleteBookMutation } from "@/app/api/baseApi";
import { toast } from "sonner";

interface DeleteBookModalProps {
  open: boolean;
  onClose: () => void;
  book: Partial<IBook>;
}

const DeleteBookModal = ({ open, onClose, book }: DeleteBookModalProps) => {
  const [deleteBook, { isLoading }] = useDeleteBookMutation();

  const handleDelete = () => {
    if (book._id) {
      return deleteBook(book._id)
        .unwrap()
        .then((res) => {
          // console.log("Book Updated:", res);
          if (res.success) {
            toast.success("Book Deleted", {
              description: "The Book has been deleted successfully!",
            });
            onClose();
          }
        })
        .catch((err) => {
          // console.error("Error adding book:", err);
          toast.error(
            err.message ||
              err.response.data.message ||
              err.data.message ||
              "Something went worng"
          );
        });
    }
    toast.error("Book ID is undefined!");
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Book</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete{" "}
          <span className="text-white font-medium">"{book.title}"</span>? This
          action is irreversible.
        </p>
        <DialogFooter>
          <Button
            className="cursor-pointer"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="cursor-pointer"
            disabled={isLoading}
            variant="destructive"
            onClick={handleDelete}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBookModal;
