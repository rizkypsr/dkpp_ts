import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Form from "./Form";
import { DataTable } from "@/components/ui/data-table";
import { PaginatedResponse } from "@/types";
import { columns, DataRenaksi } from "./Components/Columns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "./FormSchema";
import { router } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";

type IndexProps = {
    dataRenaksi: PaginatedResponse<DataRenaksi>;
};

export default function Index({ dataRenaksi }: IndexProps) {
    const { toast } = useToast();

    const [openFormModal, setOpenFormModal] = React.useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: undefined,
            indikator: "",
            kinerja: "",
        },
    });

    const handleUpdate = (data: DataRenaksi) => {
        form.setValue("id", data.id);
        form.setValue("kinerja", data.kinerja);
        form.setValue("indikator", data.indikator);

        setOpenFormModal(true);
    };

    const handleDelete = (id: number) => {
        router.delete(route("data-laporan-renaksi.destroy", id), {
            onBefore: () => {
                if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) {
                    return false;
                }
            },
            onSuccess: (page) => {
                toast({
                    title: page.props.flash.success,
                });
            },
            onError: (errors) => {
                if (errors.error) {
                    toast({
                        variant: "destructive",
                        title: "Ups! Terjadi kesalahan",
                        description: "Terjadi kesalahan saat menyimpan data",
                    });
                }

                Object.keys(errors).forEach((key) => {
                    form.setError(key as any, {
                        message: errors[key],
                    });
                });
            },
        });
    };

    React.useEffect(() => {
        if (!openFormModal) {
            form.reset();
        }
    }, [openFormModal]);

    return (
        <AuthenticatedLayout header="Data Laporan Renaksi">
            <div className="flex justify-end mt-16 mb-4">
                <Form
                    form={form}
                    openModal={openFormModal}
                    setOpenModal={setOpenFormModal}
                />
            </div>
            <DataTable<DataRenaksi>
                columns={columns}
                rows={dataRenaksi}
                meta={{
                    fromNumber: dataRenaksi.from,
                    toNumber: dataRenaksi.to,
                    updateData: handleUpdate,
                    deleteData: handleDelete,
                }}
            />
        </AuthenticatedLayout>
    );
}
