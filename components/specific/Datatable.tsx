'use client'
import { DataTableProps } from "@/models/reviewCols"
import { useEffect } from "react"
import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { ChevronsUpDown, Loader2 } from "lucide-react"
import { getNested, toggleSortFor } from "@/utils/helpers"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Input } from "../ui/input"

const Datatable = <T = any>({
  columns,
  data,
  total,
  page,
  setPage,
  pageSize,
  setPageSize,
  sort,
  setSort,
  search,
  setSearch,
  isLoading = false,
  pageSizeOptions = [10, 25, 50, 100]
}: DataTableProps<T>) => {



  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  useEffect(() => {
    setPage(1)
  }, [pageSize])



  return (
    <div className="w-full">
      <div className="flex gap-2 items-center mb-4">
        <Input
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows</span>
          <Select
            value={String(pageSize)}
            onValueChange={(v: string) => setPageSize(Number(v))}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map(n => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, ci) => (
                <TableHead
                  key={col.id ?? col.accessorKey ?? ci}
                  className={`cursor-${col.sortable ? 'pointer' : 'default'} select-none`}
                >
                  <div
                    className="flex items-center gap-2"
                    onClick={() => col.sortable && toggleSortFor(col, setPage, setSort)}
                  >
                    <span>{col.header}</span>
                    {col.sortable && (
                      <ChevronsUpDown className="h-4 w-4 opacity-60" />
                    )}
                    {col.sortable && sort.id === (col.id ?? col.accessorKey) && (
                      <span className="ml-1 text-xs">{sort.desc ? '↓' : '↑'}</span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-8 text-center">
                  <Loader2 className="animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-8 text-center text-sm text-muted-foreground">
                  No data
                </TableCell>
              </TableRow>
            ) : (
              data.map((row: any, ri) => (
                <TableRow key={row._id ?? ri}>
                  {columns.map((col, ci) => {
                    const value = col.accessorFn ? col.accessorFn(row) : getNested(row, col.accessorKey)
                    return (
                      <TableCell key={col.id ?? col.accessorKey ?? ci}>
                        {col.cell ? col.cell(value, row) : String(value ?? '')}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{Math.min(total, (page - 1) * pageSize + 1)}</strong> -{' '}
          <strong>{Math.min(total, page * pageSize)}</strong> of <strong>{total}</strong>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page <= 1}
          >
            Prev
          </Button>
          <div className="text-sm">
            Page <strong>{page}</strong> / <strong>{totalPages}</strong>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Datatable