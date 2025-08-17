"use client";

import { useState } from "react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteReview, getReviewsByDoctor } from "@/services/reviewApi";
import { columns, ReviewsResponse } from "@/models/reviewCols";
import Datatable from "./Datatable";
import { toast } from "sonner";

export default function ReviewsTable() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState<{ id: string | null; desc: boolean }>({
        id: "date",
        desc: true,
    });
    const [search, setSearch] = useState("");
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery<ReviewsResponse>({
        queryKey: ["reviews", page, pageSize, sort, search],
        queryFn: () =>
            getReviewsByDoctor({
                page,
                limit: pageSize,
                sortBy: sort.id ?? "date",
                sortOrder: sort.desc ? "desc" : "asc",
                search,
            }),
        placeholderData: keepPreviousData,
    });

    const { mutate } = useMutation({
        mutationFn: deleteReview,
        onSuccess: (response) => {
            toast.success(response?.message);
            queryClient.invalidateQueries({
                queryKey:['reviews']
            })
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.error)
        }
    })
    const columnsInstance = columns((id) => mutate(id));
    return (
        <div className="flex flex-col bg-card-primary p-2 rounded-xl gap-2 shadow-md m-4">
            <h1 className=" font-sans font-semibold">See Your Reviews</h1>
            <Datatable
                columns={columnsInstance}
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
    );
}
