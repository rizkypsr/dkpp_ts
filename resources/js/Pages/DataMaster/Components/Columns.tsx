import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Jabatan, User } from "@/types";

export type DataMaster = {
    id: number;
    feedback: number;
    users_id: number;
    feedback_by: number | null;
    created_at: string;
    updated_at: string;
    users: User;
    penilaian_jabatan: PenilaianJabatan[];
};

export type PenilaianJabatan = {
    id: number;
    penilaian_ke_jabatan: number;
    data_master_id: number;
    created_at: string;
    updated_at: string;
    jabatan: Jabatan;
};

export const columns: ColumnDef<DataMaster>[] = [
    {
        id: "number",
        header: "#",
        cell: ({ row: { index }, table }) => {
            const fromNumber = table.options.meta?.fromNumber;
            const toNumber = table.options.meta?.toNumber;

            const rowNumber = fromNumber! + index;

            return (
                <div className="w-8">
                    {rowNumber <= toNumber! ? rowNumber : null}
                </div>
            );
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
                .map((data: PenilaianJabatan) => data?.jabatan?.nama)
                .join(", "),
        header: "Penilaian ke",
        cell: (info) => {
            return <div className="w-72">{info.getValue() as any}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row: { original }, table }) => {
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
                                table.options.meta?.updateData(original);
                            }}
                        >
                            Ubah
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={(e) => {
                                table.options.meta?.deleteData(original.id);
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
