import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export type DataKurja = {
    id: number;
    kinerja: string;
    indikator: string;
    target: string;
    realisasi: string;
    capaian: number;
    penjelasan: string;
    alternatif: string;
    created_at: string;
    updated_at: string;
};

export const columns: ColumnDef<DataKurja>[] = [
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
        accessorKey: "target",
        header: "Target",
        cell: (info) => {
            return <div className="w-32">{info.getValue() as any}</div>;
        },
    },
    {
        accessorKey: "realisasi",
        header: "Realisasi s.d Tribulan 1",
        cell: (info) => {
            return <div className="w-32">{info.getValue() as any}</div>;
        },
    },
    {
        accessorKey: "capaian",
        header: "Capaian",
    },
    {
        accessorKey: "penjelasan",
        header: "Penjelasan",
        cell: (info) => {
            return <div className="w-72">{info.getValue() as any}</div>;
        },
    },
    {
        accessorKey: "alternatif",
        header: "Alternatif/Upaya yang telah dilakukan",
        cell: (info) => {
            return <div className="w-72">{info.getValue() as any}</div>;
        },
    },
    {
        header: "Keterkaitan dengan komponen perencanaan",
        cell: ({ row: { original } }) => {
            return (
                <Link
                    href={route(
                        "data-laporan-kurja.keterkaitan-kurja.index",
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
