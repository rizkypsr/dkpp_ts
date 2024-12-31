import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Form from "./Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, ValidatorSchema } from "./FormSchema";
import { router } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import { columns, DataMaster } from "./Components/Columns";
import { DataTable } from "@/components/ui/data-table";
import { Jabatan } from "@/types";

type IndexProps = {
    dataMaster: any;
    jabatanOptions: Jabatan[];
};

export default function Index({ dataMaster, jabatanOptions }: IndexProps) {
    const { toast } = useToast();

    const [openFormModal, setOpenFormModal] = React.useState(false);

    const form = useForm<FormSchema>({
        resolver: zodResolver(ValidatorSchema),
        defaultValues: {
            id: undefined,
            isCreate: true,
            nip: "",
            name: "",
            password: "",
            confirmPassword: "",
            feedback: false,
            jabatan: undefined,
        },
    });

    React.useEffect(() => {
        if (!openFormModal) {
            form.reset();
        }
    }, [openFormModal]);


    const handleUpdate = (data: DataMaster) => {
        form.setValue("id", data.id);
        form.setValue("isCreate", false);
        form.setValue("nip", data.users.nip);
        form.setValue("name", data.users.name);
        form.setValue("password", "");
        form.setValue("jabatan", {
            value: data.users.jabatan!.id,
            label: data.users.jabatan!.nama,
        });
        form.setValue("feedback", data.feedback === 1 ? true : false);
        form.setValue(
            "penilaianKeJabatan",
            data.penilaian_jabatan.map((data) => ({
                value: data.jabatan.id,
                label: data.jabatan.nama,
            }))
        );

        setOpenFormModal(true);
    };

    const handleDelete = (id: number) => {
        router.delete(route("data-master.destroy", id), {
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
        <AuthenticatedLayout header="Data Master">
            <div className="flex justify-end mt-16 mb-4">
                <Form
                    form={form}
                    jabatanOptions={jabatanOptions}
                    openFormModal={openFormModal}
                    setOpenFormModal={setOpenFormModal}
                />
            </div>

            <DataTable<DataMaster>
                columns={columns}
                rows={dataMaster}
                meta={{
                    fromNumber: dataMaster.from,
                    toNumber: dataMaster.to,
                    updateData: handleUpdate,
                    deleteData: handleDelete,
                }}
            />
        </AuthenticatedLayout>
    );
}
