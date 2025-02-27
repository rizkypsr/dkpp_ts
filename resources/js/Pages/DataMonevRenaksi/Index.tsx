import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Form from "./Form";
import { FormSchema } from "./FormSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Jabatan, Option, PaginatedResponse } from "@/types";
import { columns, DataMonevRenaksi } from "./Components/Columns";
import { DataTable } from "@/components/ui/data-table";
import { router } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";

type IndexProps = {
    dataMonevRenaksi: PaginatedResponse<DataMonevRenaksi>;
    jabatanOptions: Option[];
};

export default function Index({ dataMonevRenaksi, jabatanOptions }: IndexProps) {
    const { toast } = useToast();

    const [openFormModal, setOpenFormModal] = React.useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: undefined,
            indikator: "",
            kinerja: "",
            jabatan: undefined,
        },
    });

    React.useEffect(() => {
        if (!openFormModal) {
            form.reset();
        }
    }, [openFormModal]);

    const handleUpdate = (data: DataMonevRenaksi) => {
        form.setValue("id", data.id);
        form.setValue("kinerja", data.kinerja);
        form.setValue("indikator", data.indikator);
        form.setValue("jabatan", data?.jabatan?.map((data) => ({
            value: data.id,
            label: data.nama,
        })));

        setOpenFormModal(true);
    };

    const handleDelete = (id: number) => {
        router.delete(route("data-laporan-monev-renaksi.destroy", id), {
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

    return (
        <AuthenticatedLayout header="Data Laporan Monev Renaksi">
            <div className="flex justify-end mt-16 mb-4">
                <Form
                    form={form}
                    openModal={openFormModal}
                    setOpenModal={setOpenFormModal}
                    jabatanOptions={jabatanOptions}
                />
            </div>
            <DataTable<DataMonevRenaksi>
                columns={columns}
                rows={dataMonevRenaksi}
                meta={{
                    fromNumber: dataMonevRenaksi.from,
                    toNumber: dataMonevRenaksi.to,
                    updateData: handleUpdate,
                    deleteData: handleDelete,
                }}
            />
        </AuthenticatedLayout>
    );
}
