import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input, Label } from "@headlessui/react";
import { DataMaster, JabatanOption } from "./Types";
import Form from "./Form";
import { DataTable } from "./Components/DataTable";
import { getColumns } from "./Components/Columns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModeStore } from "@/store/useModeStore";
import { FormSchema, ValidatorSchema } from "./FormSchema";
import { router } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";

type IndexProps = {
    dataMaster: any;
    jabatanOptions: JabatanOption[];
};

export default function Index({ dataMaster, jabatanOptions }: IndexProps) {
    const [openFormModal, setOpenFormModal] = React.useState(false);

    const { toast } = useToast();
    const { mode, setMode } = useModeStore();

    const form = useForm<FormSchema>({
        resolver: zodResolver(ValidatorSchema),
        defaultValues: {
            isCreate: true,
            nip: "",
            name: "",
            password: "",
            feedback: false,
            jabatan: null,
        },
    });

    const handleEdit = (id: number, rowData: DataMaster) => {
        setMode("edit");

        form.setValue("id", id);
        form.setValue("isCreate", false);
        form.setValue("nip", rowData.users.nip);
        form.setValue("name", rowData.users.name);
        form.setValue("password", "");
        form.setValue("jabatan", {
            value: rowData.users.jabatan!.id,
            label: rowData.users.jabatan!.nama,
        });
        form.setValue("feedback", rowData.feedback === 1 ? true : false);
        form.setValue(
            "penilaianKeJabatan",
            rowData.penilaian_jabatan.map((data) => ({
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
                toast({
                    title: page.props.flash.error,
                });
            },
        });
    };

    React.useEffect(() => {
        if (!openFormModal) {
            form.reset();
            form.resetField("jabatan");
            setMode("create");
        }
    }, [openFormModal]);

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

            <DataTable
                columns={getColumns({
                    fromNumber: dataMaster.from,
                    toNumber: dataMaster.to,
                    form: form,
                    onEdit: handleEdit,
                    onDelete: handleDelete,
                })}
                rows={dataMaster}
                form={form}
            />
        </AuthenticatedLayout>
    );
}
