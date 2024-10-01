import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    RowData,
    useReactTable,
} from "@tanstack/react-table";
import { PaginatedResponse } from "@/types";
import { Card, CardContent, CardFooter } from "./card";
import { DataTableViewOptions } from "./data-table-column-toggle";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./table";
import { DataTablePagination } from "./data-table-pagination";

declare module "@tanstack/react-table" {
    interface TableMeta<TData extends RowData> {
        fromNumber: number;
        toNumber: number;
        updateData: (data: TData) => void;
        deleteData: (id: number) => void;
    }
}

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    rows: PaginatedResponse<TData>;
    meta?: any;
}

export function DataTable<TData>({
    columns,
    rows,
    meta,
}: DataTableProps<TData>) {
    const table = useReactTable({
        data: rows.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        meta: meta,
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
                <DataTablePagination<TData> table={table} rows={rows} />
            </CardFooter>
        </Card>
    );
}
