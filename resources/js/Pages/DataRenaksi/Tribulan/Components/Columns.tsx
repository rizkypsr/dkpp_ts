import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types";
import { Link } from "@inertiajs/react";
import { ColumnDef, RowData } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

declare module "@tanstack/react-table" {
    interface TableMeta<TData extends RowData> {
        fromNumber: number;
        toNumber: number;
        // updateData: (data: DataRenaksi) => void;
        // deleteData: (id: number) => void;
    }
}

export type DataTribulan = {
    id: number;
    tribulan: number;
    rencana_aksi: string;
    target: string;
    feedback: string;
    feedback_by: User;
    data_laporan_renaksi_id: number;
    created_at: string;
    updated_at: string;
};

export const columns: ColumnDef<DataTribulan>[] = [
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
        accessorKey: "tribulan",
        header: "Tribulan (Nanti akan dihapus)",
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
            return <div className="w-24">{info.getValue()?.name ?? "-"}</div>;
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
                            asChild
                            onClick={() => console.log(original)}
                        >
                            <Link
                                href={route(
                                    "data-laporan-renaksi.tribulan.show",
                                    {
                                        data_laporan_renaksi:
                                            original.data_laporan_renaksi_id,
                                        tribulan: original.id,
                                    }
                                )}
                                preserveState
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
