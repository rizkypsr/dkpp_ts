import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export type DataLaporan = {
    id: number;
    user: User;
    tanggal_dikirim: string;
    tanggal_diterima: string;
    file: string;
    created_at: string;
    updated_at: string;
};

export const columns: ColumnDef<DataLaporan>[] = [
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
        accessorKey: "user.nip",
        header: "NIP",
    },
    {
        accessorKey: "user.jabatan.nama",
        header: "Jabatan",
    },
    {
        accessorKey: "filename",
        header: "Nama Dokumen",
    },
    {
        accessorKey: "tanggal_dikirim",
        header: "Tanggal Dikirim",
    },
    {
        accessorKey: "tanggal_diterima",
        header: "Tanggal Diterima",
    },
    {
        header: "Download",
        cell: ({ row: { original } }) => {
            return (
                <a
                    href={`/api/laporan/download/${original.id}`}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                >
                    Download
                </a>
            );
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
