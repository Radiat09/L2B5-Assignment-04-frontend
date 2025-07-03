import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import { useGetBookByIdQuery } from "@/app/api/baseApi";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: book,
    isLoading,
    error,
  } = useGetBookByIdQuery(id!, {
    skip: !id,
  });
  console.log(book);
  if (isLoading)
    return <p className="text-center mt-10 text-white">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load book.</p>
    );
  if (!book)
    return <p className="text-center mt-10 text-white">Book not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-[#0a0a0a] text-white p-6 rounded-lg shadow-lg">
      {/* Image section */}
      {book?.imgUrl && (
        <div className="w-full mb-6">
          <img
            src={book.imgUrl}
            alt={book.title}
            className="w-full h-auto max-h-[400px] object-fit rounded"
          />
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p className="text-gray-400 mb-2">
        Author: <span className="text-white">{book.author}</span>
      </p>
      <p className="text-gray-400 mb-2">
        Genre: <span className="text-white">{book.genre}</span>
      </p>
      <p className="text-gray-400 mb-2">
        ISBN: <span className="text-white">{book.isbn}</span>
      </p>
      <p className="text-gray-400 mb-2">
        Available:{" "}
        <span className="text-white">
          {book.available || book.copies > 0 ? "YES" : "NO"}
        </span>
      </p>
      <p className="text-gray-400 mb-2">
        Copies: <span className="text-red-500">{book.copies}</span>
      </p>
      <p className="text-gray-300 mt-4">
        <strong>Description:</strong> <br />
        {book.description || "No description available."}
      </p>

      <div className="mt-6">
        <Button
          className="cursor-pointer"
          onClick={() => window.history.back()}
          variant="secondary"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default BookDetails;
