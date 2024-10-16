import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PaginatedResponse } from "@/types";
import { columns, DataRencanaAksi } from "./Components/Columns";
import { DataTable } from "@/components/ui/data-table";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "./FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "./Form";
import { router } from "@inertiajs/react";

type IndexProps = {
    monevRenaksiId: number;
    dataRencanaAksi: PaginatedResponse<DataRencanaAksi>;
};

export default function Index({ monevRenaksiId, dataRencanaAksi }: IndexProps) {
    const { toast } = useToast();

    const [openFormModal, setOpenFormModal] = React.useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: undefined,
            rencana_aksi: "",
            target: "",
            realisasi: "",
            capaian: 0,
            catatan: "",
            tindak_lanjut: "",
            // bukti_pendukung: "",
        },
    });

    const handleUpdate = (data: DataRencanaAksi) => {
        console.log("edit", data);

        form.setValue("id", data.id);
        form.setValue("rencana_aksi", data.rencana_aksi);
        form.setValue("target", data.target);
        form.setValue("realisasi", data.realisasi);
        form.setValue("capaian", data.capaian);
        form.setValue("catatan", data.catatan);
        form.setValue("tindak_lanjut", data.tindak_lanjut);

        setOpenFormModal(true);
    };

    const handleDelete = (id: number) => {
        router.delete(route("data-laporan-monev-renaksi.rencana-aksi.destroy", {
            data_laporan_monev_renaksi: monevRenaksiId,
            rencana_aksi: id,
        }), {
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
        <AuthenticatedLayout header="Data Laporan Monev Renaksi - Rencana Aksi">
            <div className="flex justify-end mt-16 mb-4">
                <Form
                    monevRenaksiId={monevRenaksiId}
                    form={form}
                    openModal={openFormModal}
                    setOpenModal={setOpenFormModal}
                />
            </div>
            <DataTable<DataRencanaAksi>
                columns={columns}
                rows={dataRencanaAksi}
                meta={{
                    fromNumber: dataRencanaAksi.from,
                    toNumber: dataRencanaAksi.to,
                    updateData: handleUpdate,
                    deleteData: handleDelete,
                }}
            />
        </AuthenticatedLayout>
    );
}
