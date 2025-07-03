import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useGetBorrowSummeryQuery } from "@/app/api/baseApi";

export function BorrowSummary() {
  const { data, isLoading } = useGetBorrowSummeryQuery();
  // console.log(data);
  return (
    <Card className="w-full max-w-7xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Borrow Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Title</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Total Borrowed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-muted-foreground"
                  >
                    No data found.
                  </TableCell>
                </TableRow>
              ) : (
                data?.data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.book.title}
                    </TableCell>
                    <TableCell>{item.book.isbn}</TableCell>
                    <TableCell>
                      {item.totalQuantity >= 5 ? (
                        <Badge
                          variant="default"
                          className="bg-green-600 text-white"
                        >
                          {item.totalQuantity}
                        </Badge>
                      ) : (
                        item.totalQuantity
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
