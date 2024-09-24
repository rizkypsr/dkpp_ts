import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "./button";
import { Link } from "@inertiajs/react";
import { PaginatedResponse } from "@/types";

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    rows: PaginatedResponse<TData>;
}

export function DataTablePagination<TData>({
    table,
    rows,
}: DataTablePaginationProps<TData>) {
    return (
        <div className="flex items-center justify-between flex-1">
            <div className="flex-1 text-sm text-muted-foreground">
                Menampilkan {rows.from} - {rows.to} dari {rows.total}
            </div>

            <div className="flex items-center space-x-6 lg:space-x-8">
                {/* <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue
                                placeholder={
                                    table.getState().pagination.pageSize
                                }
                            />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={`${pageSize}`}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div> */}
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Halaman {rows.current_page} - {rows.last_page}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        asChild
                        variant="outline"
                        className="hidden w-8 h-8 p-0 lg:flex"
                    >
                        <Link href={rows.first_page_url}>
                            <span className="sr-only">
                                Menuju halaman pertama
                            </span>
                            <DoubleArrowLeftIcon className="w-4 h-4" />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-8 h-8 p-0">
                        <Link href={rows.prev_page_url ?? "#"}>
                            <span className="sr-only">
                                Menuju halaman sebelumnya
                            </span>
                            <ChevronLeftIcon className="w-4 h-4" />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-8 h-8 p-0">
                        <Link href={rows.next_page_url ?? "#"}>
                            <span className="sr-only">
                                Menuju halaman berikutnya
                            </span>
                            <ChevronRightIcon className="w-4 h-4" />
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="hidden w-8 h-8 p-0 lg:flex"
                    >
                        <Link href={rows.last_page_url}>
                            <span className="sr-only">
                                Menuju halaman terakhir
                            </span>
                            <DoubleArrowRightIcon className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
