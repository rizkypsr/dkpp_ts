import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PaginatedResponse } from "@/types";
import { columns, DataKurja } from "./Components/Columns";
import { DataTable } from "@/Components/ui/data-table";
import Form from "./Form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "./FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";

type IndexProps = {
    dataKurja: PaginatedResponse<DataKurja>;
};

export default function Index({ dataKurja }: IndexProps) {
    const { toast } = useToast();

    const [openFormModal, setOpenFormModal] = React.useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: undefined,
            indikator: "",
            kinerja: "",
            target: "",
            realisasi: "",
            capaian: 0,
            penjelasan: "",
            alternatif: "",
        },
    });

    const handleUpdate = (data: DataKurja) => {
        form.setValue("id", data.id);
        form.setValue("kinerja", data.kinerja);
        form.setValue("indikator", data.indikator);
        form.setValue("target", data.target);
        form.setValue("realisasi", data.realisasi);
        form.setValue("capaian", data.capaian);
        form.setValue("penjelasan", data.penjelasan);
        form.setValue("alternatif", data.alternatif);

        setOpenFormModal(true);
    };

    const handleDelete = (id: number) => {
        router.delete(route("data-laporan-kurja.destroy", id), {
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
        <AuthenticatedLayout header="Data Laporan Kurja">
            <div className="flex justify-end mt-16 mb-4">
                <Form
                    form={form}
                    openModal={openFormModal}
                    setOpenModal={setOpenFormModal}
                />
            </div>
            <DataTable<DataKurja>
                columns={columns}
                rows={dataKurja}
                meta={{
                    fromNumber: dataKurja.from,
                    toNumber: dataKurja.to,
                    updateData: handleUpdate,
                    deleteData: handleDelete,
                }}
            />
        </AuthenticatedLayout>
    );
}
