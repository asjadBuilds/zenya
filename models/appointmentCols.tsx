import { Badge } from "@/components/ui/badge"
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

export type Appointment = {
    _id: string;
    dateTime: string,
    status: string,
    meetUrl: string,
    user: { username: string };
};

export const columns: Column<Appointment>[] = [
    {
        accessorKey: "username",
        header: "Username",
        accessorFn: row => row.user?.username ?? "—",
        sortable: true,
    },
    {
        accessorKey: "dateTime",
        header: "Date & Time",
        cell: v => (v ? moment(v).format('lll') : '-'),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: (v) => {
            return (
                <Badge variant={v === 'CONFIRMED' || 'COMPLETED' ? 'default' : v === 'PENDING' ? 'outline' : 'destructive'}>{v}</Badge>
            )
        },
    },
    {
        accessorKey: "meetUrl",
        header: "Meet Link",
        cell: (_, row) => {
            return (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(row?.meetUrl, "_blank")}
                >
                    Open Meet
                </Button>
            );
        },
    },
];