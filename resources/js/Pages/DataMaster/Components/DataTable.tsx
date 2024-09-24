import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DataTableViewOptions } from "@/components/ui/data-table-column-toggle";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { formSchema } from "../FormSchema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface DataTableProps<TData, TValue> {
    form: UseFormReturn<z.infer<typeof formSchema>>;
    columns: ColumnDef<TData, TValue>[];
    rows: TData[];
}

export function DataTable<TData, TValue>({
    form,
    columns,
    rows,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data: rows.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Card>
            <CardContent>
                <div className="flex items-center py-4">
                    <DataTableViewOptions table={table} />
                </div>

                <div className="relative overflow-x-auto">
                    <Table className="w-full rtl:text-right">
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                className={`${
                                                    header.id === "actions"
                                                        ? "sticky right-0 bg-white z-10"
                                                        : ""
                                                }`}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className={`${
                                                    cell.column.id === "actions"
                                                        ? "sticky right-0 bg-white z-1" // Make actions column sticky
                                                        : ""
                                                }`}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
            <CardFooter>
                <DataTablePagination table={table} rows={rows} />
            </CardFooter>
        </Card>
    );
}
