import { ColumnDef } from "@tanstack/react-table";
import { DataMaster } from "../Types";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../FormSchema";

export function getColumns({
    fromNumber,
    toNumber,
    form,
    onEdit,
    onDelete,
}: {
    fromNumber: number;
    toNumber: number;
    form: UseFormReturn<z.infer<typeof formSchema>>;
    onEdit: (id: number, rowData: DataMaster) => void;
    onDelete: (id: number) => void;
}): ColumnDef<DataMaster>[] {
    return [
        {
            id: "number",
            header: "#",
            accessorFn: (_row, index) => {
                const rowNumber = fromNumber + index;
                return rowNumber <= toNumber ? rowNumber : null;
            },
            cell: (info) => {
                const value = info.getValue();
                return value !== null ? value : "";
            },
        },
        {
            id: "nip",
            accessorKey: "users.nip",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="NIP" />
            ),
        },
        {
            id: "nama",
            accessorKey: "users.name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Nama" />
            ),
        },
        {
            accessorFn: (row) => row.users?.jabatan?.nama ?? "-",
            header: "Jabatan",
        },
        {
            accessorKey: "feedback",
            enableSorting: false,
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Feedback" />
            ),
            cell: (info) => {
                return info.getValue() == 1 ? (
                    <Badge>Ya</Badge>
                ) : (
                    <Badge variant="destructive">Tidak</Badge>
                );
            },
        },
        {
            accessorFn: (row) =>
                row.penilaian_jabatan
                    .map((data) => data?.jabatan?.nama)
                    .join(", "),
            header: "Penilaian ke",
            cell: (info) => {
                return <div className="w-72">{info.getValue()}</div>;
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const rowData = row.original;
                const id = row.original.id;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-8 h-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={(e) => {
                                    onEdit(id, rowData);
                                }}
                            >
                                Ubah
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={(e) => {
                                    onDelete(id);
                                }}
                            >
                                Hapus
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
}
