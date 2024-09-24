import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />

            <div className="">children</div>
        </AuthenticatedLayout>
    );
}
