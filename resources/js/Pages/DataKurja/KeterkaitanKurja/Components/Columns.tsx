import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { User } from "@/types";
import { Link } from "@inertiajs/react";

export type DataKeterkaitanKurja = {
    id: number;
    program: string;
    anggaran: number;
    realisasi_rupiah: number;
    realisasi_persentase: number;
    data_laporan_kurja_id: number;
    feedback: string;
    feedback_by: User;
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
        accessorKey: "feedback",
        header: "Feedback",
        cell: (info) => {
            return (
                <div className="w-24">{(info.getValue() as any) ?? "-"}</div>
            );
        },
    },
    {
        accessorKey: "feedback_by",
        header: "Feedback By",
        cell: (info) => {
            return (
                <div className="w-24">
                    {(info.getValue() as User)?.name ?? "-"}
                </div>
            );
        },
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
                        <DropdownMenuItem>
                            <Link
                                href={route(
                                    "data-laporan-kurja.keterkaitan-kurja.edit",
                                    {
                                        data_laporan_kurja:
                                            original.data_laporan_kurja_id,
                                        keterkaitan_kurja: original.id,
                                    }
                                )}
                            >
                                Feedback
                            </Link>
                        </DropdownMenuItem>
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
