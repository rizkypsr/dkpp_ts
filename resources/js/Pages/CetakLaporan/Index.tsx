import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    name: z.string({
        required_error: "Nama harus diisi",
    }).max(255, "Nama maksimal 255 karakter"),
    nip: z.string({
        required_error: "NIP harus diisi",
    }).regex(/^\d+$/, "NIP hanya boleh berisi angka").max(18, "NIP maksimal 18 karakter"),
    nama_kepala_dinas: z.string({
        required_error: "Nama Kepala Dinas harus diisi",
    }).max(255, "Nama maksimal 255 karakter"),
    nip_kepala_dinas: z.string({
        required_error: "NIP Kepala Dinas harus diisi",
    }).regex(/^\d+$/, "NIP hanya boleh berisi angka").max(18, "NIP maksimal 18 karakter"),
    pangkat_kepala_dinas: z.string({
        required_error: "Pangkat Kepala Dinas harus diisi",
    }).max(255, "Pangkat maksimal 255 karakter"),
    jabatan_kepala_dinas: z.string({
        required_error: "Jabatan Kepala Dinas harus diisi",
    }).max(255, "Jabatan maksimal 255 karakter"),
    unit_kerja_kepala_dinas: z.string({
        required_error: "Unit Kerja Kepala Dinas harus diisi",
    }).max(255, "Unit Kerja maksimal 255 karakter"),
})

type IndexProps = {
    data: {
        name: string;
        nip: string;
        nip_kepala_dinas: string;
        nama_kepala_dinas: string;
        pangkat_kepala_dinas: string;
        jabatan_kepala_dinas: string;
        unit_kerja_kepala_dinas: string;
        updated_at: string;
    } | null;
}

export default function Index({ data }: IndexProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nip: data?.nip ?? "",
            name: data?.name ?? "",
            nip_kepala_dinas: data?.nip_kepala_dinas ?? "",
            nama_kepala_dinas: data?.nama_kepala_dinas ?? "",
            pangkat_kepala_dinas: data?.pangkat_kepala_dinas ?? "",
            jabatan_kepala_dinas: data?.jabatan_kepala_dinas ?? "",
            unit_kerja_kepala_dinas: data?.unit_kerja_kepala_dinas ?? "",
        },
    });

    const handleExport = async (data: z.infer<typeof formSchema>) => {
        const res = await fetch((route('cetak-laporan.export') + "?" + new URLSearchParams({
            name: data.name,
            nip: data.nip,
            nip_kepala_dinas: data.nip_kepala_dinas,
            nama_kepala_dinas: data.nama_kepala_dinas,
            pangkat_kepala_dinas: data.pangkat_kepala_dinas,
            jabatan_kepala_dinas: data.jabatan_kepala_dinas,
            unit_kerja_kepala_dinas: data.unit_kerja_kepala_dinas,
        })));

        if (res.status === 200) {
            const blb = await res.blob();
            const file = window.URL.createObjectURL(blb);
            window.location.assign(file);

            toast({
                title: "Berhasil",
                description: "Laporan berhasil diunduh",
            });
        } else {
            toast({
                title: "Gagal",
                description: "Gagal mengunduh laporan",
                variant: "destructive",
            });
        }
    }

    return (
        <AuthenticatedLayout header="Cetak Laporan">
            <div className="mt-16">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleExport)}>
                        <FormField
                            control={form.control}
                            name="nip_kepala_dinas"
                            render={({ field }) => (
                                <FormItem className="mb-3">
                                    <FormLabel>NIP Kepala Dinas</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Masukan nip kepala dinas"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="nama_kepala_dinas"
                            render={({ field }) => (
                                <FormItem className="mb-6">
                                    <FormLabel>Nama Kepala Dinas</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Masukan nama kepala dinas"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="pangkat_kepala_dinas"
                            render={({ field }) => (
                                <FormItem className="mb-6">
                                    <FormLabel>Pangkat Kepala Dinas</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Masukan pangkat kepala dinas"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="jabatan_kepala_dinas"
                            render={({ field }) => (
                                <FormItem className="mb-6">
                                    <FormLabel>Jabatan Kepala Dinas</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Masukan jabatan kepala dinas"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="unit_kerja_kepala_dinas"
                            render={({ field }) => (
                                <FormItem className="mb-6">
                                    <FormLabel>Unit Kerja Kepala Dinas</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Masukan unit kerja kepala dinas"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="nip"
                            render={({ field }) => (
                                <FormItem className="mb-6">
                                    <FormLabel>NIP Atasan Langsung</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Masukan nip atasan langsung"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="mb-6">
                                    <FormLabel>Nama Atasan Langsung</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Masukan atasan langsung"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button type="submit">
                            Cetak Laporan
                        </Button>
                    </form>
                </Form>
            </div>
        </AuthenticatedLayout>
    );
}
