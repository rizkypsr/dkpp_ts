import PrimaryButton from "@/Components/PrimaryButton";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { ColumnDef, RowData } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export type DataRenaksi = {
    id: number;
    kinerja: string;
    indikator: string;
    created_at: string;
    updated_at: string;
};

export const columns: ColumnDef<DataRenaksi>[] = [
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
        accessorKey: "kinerja",
        header: "Kinerja",
        cell: (info) => {
            return <div className="w-72">{info.getValue() as any}</div>;
        },
    },
    {
        accessorKey: "indikator",
        header: "Indikator Kinerja Individu",
        cell: (info) => {
            return <div className="w-72">{info.getValue() as any}</div>;
        },
    },
    {
        header: "Tribulan",
        cell: ({ row: { original } }) => {
            return (
                <Link
                    href={route(
                        "data-laporan-renaksi.tribulan.index",
                        original.id
                    )}
                >
                    <Button>Lihat</Button>
                </Link>
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
