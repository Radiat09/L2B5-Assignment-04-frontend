import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { IBook } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBorrowBookMutation } from "@/app/api/baseApi";
import { toast } from "sonner";

const formSchema = z.object({
  quantity: z
    .number({ invalid_type_error: "Quantity is required" })
    .min(1, "At least 1 copy")
    .max(10, "Max 10 copies"),
  dueDate: z.date({ required_error: "Please select a return date" }),
});

type FormValues = z.infer<typeof formSchema>;

interface BorrowBookModalProps {
  open: boolean;
  onClose: () => void;
  book: IBook;
}

const BorrowBookModal = ({ open, onClose, book }: BorrowBookModalProps) => {
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
      dueDate: undefined,
    },
  });

  const handleSubmit = (data: FormValues) => {
    borrowBook({
      book: book._id,
      quantity: data.quantity,
      dueDate: new Date(data.dueDate).toISOString(),
    })
      .unwrap()
      .then((res) => {
        // console.log("Book Borrowed:", res);
        if (res.success) {
          toast.success("Book Borrowed", {
            description: "You have borrowed the book successfully!",
          });

          form.reset();
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

    // console.log(book);
    // console.log({
    //   book: book._id,
    //   quantity: data.quantity,
    //   dueDate: new Date(data.dueDate).toISOString(),
    // });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-500">
          You are borrowing{" "}
          <span className="font-semibold text-white">"{book.title}"</span>.
        </p>

        {book.copies > 0 ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4 mt-2"
            >
              {/* Quantity */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        max={book?.copies}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Due Date */}
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Return Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Footer */}
              <DialogFooter className="mt-4">
                <Button
                  className="cursor-pointer"
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isLoading}
                  className="cursor-pointer"
                  type="submit"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <h2 className="test-xl font-bold text-red-400">
            This book is not available to Borrow.
          </h2>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookModal;
