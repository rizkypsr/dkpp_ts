import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Form from "./Form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "./FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { columns, DataKeterkaitanKurja } from "./Components/Columns";
import { PaginatedResponse } from "@/types";
import { DataTable } from "@/Components/ui/data-table";
import { router } from "@inertiajs/react";

type IndexProps = {
    kurjaId: number;
    dataKeterkaitanKurja: PaginatedResponse<DataKeterkaitanKurja>;
};

export default function Index({ kurjaId, dataKeterkaitanKurja }: IndexProps) {
    const { toast } = useToast();

    const [openFormModal, setOpenFormModal] = React.useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: undefined,
            program: "",
            anggaran: 0,
            realisasi_rupiah: 0,
            realisasi_persentase: 0,
        },
    });

    React.useEffect(() => {
        if (!openFormModal) {
            form.reset();
        }
    }, [openFormModal]);

    const handleUpdate = (data: DataKeterkaitanKurja) => {
        form.setValue("id", data.id);
        form.setValue("program", data.program);
        form.setValue("anggaran", data.anggaran);
        form.setValue("realisasi_rupiah", data.realisasi_rupiah);
        form.setValue("realisasi_persentase", data.realisasi_persentase);

        setOpenFormModal(true);
    };

    const handleDelete = (id: number) => {
        router.delete(
            route("data-laporan-kurja.keterkaitan-kurja.destroy", {
                data_laporan_kurja: kurjaId,
                keterkaitan_kurja: id,
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
        <AuthenticatedLayout header="Data Laporan Kurja - Keterkaitan Dengan Komponen Perencanaan">
            <div className="flex justify-end mt-16 mb-4">
                <Form
                    kurjaId={kurjaId}
                    form={form}
                    openModal={openFormModal}
                    setOpenModal={setOpenFormModal}
                />
            </div>
            <DataTable<DataKeterkaitanKurja>
                columns={columns}
                rows={dataKeterkaitanKurja}
                meta={{
                    fromNumber: dataKeterkaitanKurja.from,
                    toNumber: dataKeterkaitanKurja.to,
                    updateData: handleUpdate,
                    deleteData: handleDelete,
                }}
            />
        </AuthenticatedLayout>
    );
}
