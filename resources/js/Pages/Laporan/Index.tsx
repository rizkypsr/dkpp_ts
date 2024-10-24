import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { DataTable } from "@/components/ui/data-table";
import { columns, DataLaporan } from "./Components/Columns";
import { PaginatedResponse, User } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormSchema } from "./FormSchema";
import Form from "./Form";
import { useForm } from "react-hook-form";
import { router } from "@inertiajs/react";

type IndexProps = {
    users: {
        value: number;
        label: string;
    }[];
    canDownloadFile: boolean;
    dataLaporan: PaginatedResponse<DataLaporan>;
};

export default function Index({
    users,
    canDownloadFile,
    dataLaporan,
}: IndexProps) {
    const { toast } = useToast();

    const [openFormModal, setOpenFormModal] = React.useState(false);

        const form = useForm<z.infer<typeof FormSchema>>({
            resolver: zodResolver(FormSchema),
            defaultValues: {
                isCreate: true,
                id: undefined,
                user: undefined,
                filename: "",
            },
        });

    React.useEffect(() => {
        if (!openFormModal) {
            form.reset();
        }
    }, [openFormModal]);

    const handleUpdate = (data: DataLaporan) => {
        console.log(data);

        form.setValue("isCreate", false);
        form.setValue("id", data.id);
        form.setValue("user", {
            value: data.user.jabatan!.id,
            label: `${data.user.name} - ${data.user.jabatan!.nama}`,
        });
        form.setValue("filename", data.filename);
        form.setValue(
            "tanggal_dikirim",
            new Date(
                data.tanggal_dikirim.split("-").reverse().join("-") +
                    "T00:00:00"
            )
        );
        form.setValue(
            "tanggal_diterima",
            new Date(
                data.tanggal_diterima.split("-").reverse().join("-") +
                    "T00:00:00"
            )
        );

        setOpenFormModal(true);
    };

    const handleDelete = (id: number) => {
        router.delete(route("laporan.destroy", id), {
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
        <AuthenticatedLayout header="Data Laporan">
            <div className="flex justify-end mt-16 mb-4">
                <Form
                    form={form}
                    users={users}
                    openFormModal={openFormModal}
                    setOpenFormModal={setOpenFormModal}
                />
            </div>

            <DataTable<DataLaporan>
                columns={columns}
                rows={dataLaporan}
                meta={{
                    fromNumber: dataLaporan.from,
                    toNumber: dataLaporan.to,
                    updateData: handleUpdate,
                    deleteData: handleDelete,
                    canDownloadFile,
                }}
            />
        </AuthenticatedLayout>
    );
}
