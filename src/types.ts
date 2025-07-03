export interface ITask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  priority: "High" | "Medium" | "Low";
}

export interface IBook {
  _id: string;
  title: string;
  author: string;
  imgUrl?: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY"
    | "RELIGIOUS";
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

export type BookQueryParams = {
  filter?: string;
  sortBy?: string;
  sort?: string;
  limit?: number;
  page?: number;
};
