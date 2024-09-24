import PrimaryButton from "@/Components/PrimaryButton";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { User } from "@/types";
import { Link } from "@inertiajs/react";
import { ColumnDef, RowData } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export type DataRencanaAksi = {
    id: number;
    rencana_aksi: string;
    target: string;
    realisasi: string;
    capaian: number;
    catatan: string;
    tindak_lanjut: string;
    bukti_pendukung: string;
    feedback: string;
    feedbackBy: User;
    created_at: string;
    updated_at: string;
};

export const columns: ColumnDef<DataRencanaAksi>[] = [
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
        accessorKey: "rencana_aksi",
        header: "Rencana Aksi",
        cell: (info) => {
            return <div className="w-72">{info.getValue() as any}</div>;
        },
    },
    {
        accessorKey: "target",
        header: "Target",
    },
    {
        accessorKey: "realisasi",
        header: "Realisasi",
    },
    {
        accessorKey: "capaian",
        header: "Capaian",
    },
    {
        accessorKey: "catatan",
        header: "Catatan Monev",
        cell: (info) => {
            return <div className="w-72">{info.getValue() as any}</div>;
        },
    },
    {
        accessorKey: "tindak_lanjut",
        header: "Tindak Lanjut",
        cell: (info) => {
            return <div className="w-72">{info.getValue() as any}</div>;
        },
    },
    {
        accessorKey: "bukti_pendukung",
        header: "Bukti Pendukung",
        cell: (info) => {
            return (
                <Link href={info.getValue() as any}>
                    <Button>Lihat</Button>
                </Link>
            );
        },
    },
    {
        accessorKey: "feedback",
        header: "Feedback",
    },
    {
        accessorKey: "feedback_by",
        header: "Feedback By",
    },
    {
        id: "actions",
        cell: ({
            getValue,
            row: { index, original },
            column: { id },
            table,
        }) => {
            // const rowData = row.original;
            // const id = row.original.id;

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
