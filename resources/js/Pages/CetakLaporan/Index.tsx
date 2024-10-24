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
    name: z.string().min(2, "Nama minimal 2 karakter").max(255, "Nama maksimal 255 karakter"),
    nip: z.string().min(2, "NIP minimal 2 karakter").max(18, "NIP maksimal 18 karakter"),
})

type IndexProps = {
    data: {
        name: string;
        nip: string;
    }
}

export default function Index({ data }: IndexProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nip: data.nip ?? "",
            name: data.name ?? "",
        },
    });

    const handleExport = async (data: z.infer<typeof formSchema>) => {
        const res = await fetch((route('cetak-laporan.export') + "?" + new URLSearchParams({
            name: data.name,
            nip: data.nip,
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
                            name="nip"
                            render={({ field }) => (
                                <FormItem className="mb-3">
                                    <FormLabel>NIP</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Masukan nip"
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
                                    <FormLabel>Nama</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Masukan nama"
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
