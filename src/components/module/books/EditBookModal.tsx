// components/modals/EditBookModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import type { IBook } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useUpdateBookDataMutation } from "@/app/api/baseApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface EditBookModalProps {
  open: boolean;
  onClose: () => void;
  book: IBook;
}

const EditBookModal = ({ open, onClose, book }: EditBookModalProps) => {
  const [updateBookData, { isLoading }] = useUpdateBookDataMutation();

  const [err, setErr] = useState("");

  const [title, setTitle] = useState(book.title || "");
  const [author, setAuthor] = useState(book.author || "");
  const [imgUrl, setImgUrl] = useState(book.imgUrl || "");
  const [genre, setGenre] = useState(book.genre || "");
  const [isbn, setIsbn] = useState(book.isbn || "");
  const [description, setDescription] = useState(book.description || "");
  const [copies, setCopies] = useState(book.copies || 1);
  const [available, setAvailable] = useState(book.available ?? true);

  const handleSave = () => {
    const changes: Partial<IBook> = {};

    if (title !== book.title) changes.title = title;
    if (author !== book.author) changes.author = author;
    if (imgUrl !== book.imgUrl) changes.imgUrl = imgUrl;
    if (genre !== book.genre) changes.genre = genre;
    if (isbn !== book.isbn) changes.isbn = isbn;
    if (description !== book.description) changes.description = description;
    if (copies !== book.copies) changes.copies = copies;
    if (available !== book.available) changes.available = available;

    if (Object.keys(changes).length === 0) {
      setErr("Please make changes or close the mdoal by clicking cancel!");
      return;
    }

    updateBookData({ bookId: book._id, data: changes })
      .unwrap()
      .then((res) => {
        // console.log("Book Updated:", res);
        if (res.success) {
          toast.success("Book Updated", {
            description: "Book data has been updated successfully!",
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
    // console.log(changes);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div>
            <Label className="mb-2">Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label className="mb-2">Author</Label>
            <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div>
            <Label className="mb-2">Image URL</Label>
            <Input value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
          </div>
          <div>
            <Label className="mb-2">Genre</Label>
            <Select
              value={genre}
              onValueChange={(value) => setGenre(value as IBook["genre"])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FICTION">FICTION</SelectItem>
                <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                <SelectItem value="HISTORY">HISTORY</SelectItem>
                <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                <SelectItem value="FANTASY">FANTASY</SelectItem>
                <SelectItem value="RELIGIOUS">RELIGIOUS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2">ISBN</Label>
            <Input value={isbn} onChange={(e) => setIsbn(e.target.value)} />
          </div>
          <div>
            <Label className="mb-2">Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2">Copies</Label>
            <Input
              type="number"
              value={copies}
              onChange={(e) => setCopies(+e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Label className="mb-2">Available</Label>
            <Switch
              checked={available}
              onCheckedChange={(value) => setAvailable(value)}
            />
          </div>
        </div>
        {err && <p className="text-red-500 text-sm">{err}</p>}
        <DialogFooter>
          <Button
            className="cursor-pointer"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            className="cursor-pointer"
            onClick={handleSave}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookModal;
