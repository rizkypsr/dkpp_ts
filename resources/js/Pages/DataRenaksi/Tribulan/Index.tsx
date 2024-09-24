import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PaginatedResponse } from "@/types";

import React from "react";
import { columns, DataTribulan } from "./Components/Columns";
import { DataTable } from "@/Components/ui/data-table";
import Form from "./Form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "./Components/FormSchema";
import { router, usePage } from "@inertiajs/react";

type IndexProps = {
    renaksiId: number;
    tribulan1: PaginatedResponse<DataTribulan>;
    tribulan2: PaginatedResponse<DataTribulan>;
    tribulan3: PaginatedResponse<DataTribulan>;
    tribulan4: PaginatedResponse<DataTribulan>;
};

export default function Index({
    renaksiId,
    tribulan1,
    tribulan2,
    tribulan3,
    tribulan4,
}: IndexProps) {
    const { toast } = useToast();
    const page = usePage();

    const [openFormModal, setOpenFormModal] = React.useState(false);
    const [openTribulan2Modal, setOpenTribulan2Modal] = React.useState(false);
    const [openTribulan3Modal, setOpenTribulan3Modal] = React.useState(false);
    const [openTribulan4Modal, setOpenTribulan4Modal] = React.useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: undefined,
            tribulan: undefined,
            rencana_aksi: "",
            target: "",
            data_laporan_renaksi_id: Number(renaksiId),
        },
    });

    React.useEffect(() => {
        if (!openFormModal) {
            form.reset();
        }
    }, [openFormModal]);

    const handleUpdate = (data: DataTribulan) => {
        form.setValue("id", data.id);
        form.setValue("tribulan", data.tribulan);
        form.setValue("rencana_aksi", data.rencana_aksi);
        form.setValue("target", data.target);

        setOpenFormModal(true);
    };

    const handleDelete = (id: number) => {
        router.delete(
            route("data-laporan-renaksi.tribulan.destroy", {
                data_laporan_renaksi: renaksiId,
                tribulan: id,
            }),
            {
                onBefore: () => {
                    if (
                        !confirm("Apakah Anda yakin ingin menghapus data ini?")
                    ) {
                        return false;
                    }
                },
                onSuccess: (page) => {
                    toast({
                        title: page.props.flash.success,
                    });
                },
                onError: (errors) => {
                    console.log(errors);
                    if (errors.error) {
                        toast({
                            variant: "destructive",
                            title: "Ups! Terjadi kesalahan",
                            description:
                                "Terjadi kesalahan saat menyimpan data",
                        });
                    }

                    Object.keys(errors).forEach((key) => {
                        form.setError(key as any, {
                            message: errors[key],
                        });
                    });
                },
            }
        );
    };

    return (
        <AuthenticatedLayout header="Data Laporan Renaksi - Tribulan 1-4">
            <div className="flex justify-between mt-16 mb-2">
                <h1 className="mb-4 text-xl font-extrabold text-center">
                    Tribulan 1
                </h1>
                <Form
                    tribulan={1}
                    renaksiId={renaksiId}
                    form={form}
                    openModal={openFormModal}
                    setOpenModal={setOpenFormModal}
                />
            </div>
            <div className="mb-12">
                <DataTable<DataTribulan>
                    columns={columns}
                    rows={tribulan1}
                    meta={{
                        fromNumber: tribulan1.from,
                        toNumber: tribulan1.to,
                        updateData: handleUpdate,
                        deleteData: handleDelete,
                    }}
                />
            </div>

            <div className="mb-12">
                <div className="flex justify-between mt-16 mb-2">
                    <h1 className="mb-4 text-xl font-extrabold text-center">
                        Tribulan 2
                    </h1>
                    <Form
                        tribulan={2}
                        renaksiId={renaksiId}
                        form={form}
                        openModal={openTribulan2Modal}
                        setOpenModal={setOpenTribulan2Modal}
                    />
                </div>
                <DataTable<DataTribulan>
                    columns={columns}
                    rows={tribulan2}
                    meta={{
                        fromNumber: tribulan2.from,
                        toNumber: tribulan2.to,
                        updateData: handleUpdate,
                        deleteData: handleDelete,
                    }}
                />
            </div>

            <div className="mb-12">
                <div className="flex justify-between mt-16 mb-2">
                    <h1 className="mb-4 text-xl font-extrabold text-center">
                        Tribulan 3
                    </h1>
                    <Form
                        tribulan={3}
                        renaksiId={renaksiId}
                        form={form}
                        openModal={openTribulan3Modal}
                        setOpenModal={setOpenTribulan3Modal}
                    />
                </div>
                <DataTable<DataTribulan>
                    columns={columns}
                    rows={tribulan3}
                    meta={{
                        fromNumber: tribulan3.from,
                        toNumber: tribulan3.to,
                        updateData: handleUpdate,
                        deleteData: handleDelete,
                    }}
                />
            </div>

            <div className="mb-12">
                <div className="flex justify-between mt-16 mb-2">
                    <h1 className="mb-4 text-xl font-extrabold text-center">
                        Tribulan 4
                    </h1>
                    <Form
                        tribulan={4}
                        renaksiId={renaksiId}
                        form={form}
                        openModal={openTribulan4Modal}
                        setOpenModal={setOpenTribulan4Modal}
                    />
                </div>
                <DataTable<DataTribulan>
                    columns={columns}
                    rows={tribulan4}
                    meta={{
                        fromNumber: tribulan4.from,
                        toNumber: tribulan4.to,
                        updateData: handleUpdate,
                        deleteData: handleDelete,
                    }}
                />
            </div>
        </AuthenticatedLayout>
    );
}
