import { Button } from "@/components/ui/button"
import moment from "moment"

export type Column<T = any> = {
  id?: string
  header: React.ReactNode
  accessorKey?: string
  accessorFn?: (row: T) => any
  sortable?: boolean
  cell?: (value: any, row: T) => React.ReactNode
}

export type DataTableProps<T = any> = {
  columns: Column<T>[]
  data: T[]
  total: number
  page: number
  setPage: (page: number) => void
  pageSize: number
  setPageSize: (size: number) => void
  sort: { id: string | null; desc: boolean }
  setSort: (sort: { id: string | null; desc: boolean }) => void
  search: string
  setSearch: (search: string) => void
  isLoading?: boolean
  pageSizeOptions?: number[]
}

export type Review = {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: { username: string };
};

export type ReviewsResponse = {
  data: Review[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export const columns = (onDelete: (id: string) => void): Column<any>[] => [
  {
    id: "username",
    header: "User",
    accessorFn: row => row.user?.username ?? "—",
    sortable: true,
  },
  { accessorKey: "rating", header: "Rating", sortable: true },
  { accessorKey: "comment", header: "Comment" },
  {
    id: "date",
    header: "Date",
    accessorKey: "createdAt",
    sortable: true,
    cell: v => (v ? moment(v).format('lll') : '-'),
  },
  {
    id: "actions",
    header: "Actions",
    cell: (_, row) => (
      <div className="flex gap-2">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(row._id)}
        >
          Delete
        </Button>
      </div>
    ),
  },
];