import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { DataTable } from "@/components/ui/data-table";
import { columns, DataLaporan } from "./Components/Columns";
import { PaginatedResponse, User } from "@/types";
import Form from "./Form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormSchema } from "./FormSchema";
import { useForm } from "react-hook-form";

type IndexProps = {
    users: User[];
    dataLaporan: PaginatedResponse<DataLaporan>;
};

export default function Index({ users, dataLaporan }: IndexProps) {
    const { toast } = useToast();

    const [openFormModal, setOpenFormModal] = React.useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: undefined,
            user: undefined,
        },
    });

    const handleUpdate = () => {
        console.log("Update");
    };

    const handleDelete = () => {
        console.log("Delete");
    };

    return (
        <AuthenticatedLayout header="Data Laporan">
            <div className="flex justify-end mt-16 mb-4">
                <Form
                    users={users}
                    form={form}
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
                }}
            />
        </AuthenticatedLayout>
    );
}
