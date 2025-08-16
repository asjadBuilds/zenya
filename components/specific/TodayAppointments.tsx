'use client'
import { getDoctorAppointments } from "@/services/appointmentApi"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import Datatable from "./Datatable"
import { columns } from "@/models/appointmentCols"

const TodayAppointments = () => {
    const [page, setPage] = useState(1);
        const [pageSize, setPageSize] = useState(10);
        const [sort, setSort] = useState<{ id: string | null; desc: boolean }>({
            id: "date",
            desc: true,
        });
        const [search, setSearch] = useState("");
        const { data, isLoading } = useQuery({
            queryKey: ["appointments", page, pageSize, sort, search],
            queryFn: () =>
                getDoctorAppointments({
                    page,
                    limit: pageSize,
                    sortBy: sort.id ?? "date",
                    sortOrder: sort.desc ? "desc" : "asc",
                    search,
                }),
            placeholderData: keepPreviousData,
        });
    
    return (
        <div className="flex flex-col bg-emerald-50 p-2 rounded-xl gap-2 shadow-md m-4">
            <h1 className="font-sans font-semibold">See Your Today Appointments</h1>
            <Datatable
                columns={columns}
                data={data?.data || []}
                total={data?.meta.total || 0}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                sort={sort}
                setSort={setSort}
                search={search}
                setSearch={setSearch}
                isLoading={isLoading}
            />
        </div>
    )
}

export default TodayAppointments