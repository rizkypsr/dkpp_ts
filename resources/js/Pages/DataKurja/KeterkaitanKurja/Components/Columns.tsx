import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { MoreHorizontal } from "lucide-react";

export type DataKeterkaitanKurja = {
    id: number;
    program: string;
    anggaran: number;
    realisasi_rupiah: number;
    realisasi_persentase: number;
    data_laporan_kurja_id: number;
    created_at: string;
    updated_at: string;
};

export const columns: ColumnDef<DataKeterkaitanKurja>[] = [
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
        accessorKey: "program",
        header: "NAMA PROGRAM/ KEGIATAN / SUB KEGIATAN",
        cell: (info) => {
            return <div className="w-52">{info.getValue() as any}</div>;
        },
    },
    {
        accessorKey: "anggaran",
        header: "ANGGARAN (Rp)",
    },
    {
        accessorKey: "realisasi_rupiah",
        header: "REALISASI (Rp)",
    },
    {
        accessorKey: "realisasi_persentase",
        header: "% REALISASI",
    },
    {
        id: "actions",
        cell: ({
            getValue,
            row: { index, original },
            column: { id },
            table,
        }) => {
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
                            onClick={() => {
                                table.options.meta?.updateData(original);
                            }}
                        >
                            Ubah
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
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
