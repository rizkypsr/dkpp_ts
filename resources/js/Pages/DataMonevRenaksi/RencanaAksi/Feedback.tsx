import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { DataMonevRenaksi } from "../Components/Columns";
import { DataRencanaAksi } from "./Components/Columns";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FeedbackProps = {
    monevRenaksi: DataMonevRenaksi;
    rencanaAksi: DataRencanaAksi;
};

const FormSchema = z.object({
    id: z.number().nullable(),
    feedback: z.string().min(1, "Feedback harus diisi"),
});

export default function Feedback({ monevRenaksi, rencanaAksi }: FeedbackProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: rencanaAksi.id,
            feedback: rencanaAksi.feedback ?? "",
        },
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        router.put(
            route("data-laporan-monev-renaksi.rencana-aksi.update", {
                data_laporan_monev_renaksi: monevRenaksi.id,
                rencana_aksi: rencanaAksi.id,
            }),
            data,
            {
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
        <AuthenticatedLayout header="Data Laporan Monev Renaksi - Rencana Aksi">
            <Card className="py-6 my-12">
                <CardContent>
                    <div className="grid max-w-xl grid-cols-2 gap-y-6">
                        <h2 className="font-semibold">Rencana Aksi</h2>
                        <p>{rencanaAksi.rencana_aksi}</p>

                        <h2 className="font-semibold">Target</h2>
                        <p>{rencanaAksi.target}</p>

                        <h2 className="font-semibold">Realisasi</h2>
                        <p>{rencanaAksi.realisasi}</p>

                        <h2 className="font-semibold">Capaian(%)</h2>
                        <p>{rencanaAksi.capaian}</p>

                        <h2 className="font-semibold">Catatan Monev</h2>
                        <p>{rencanaAksi.catatan}</p>

                        <h2 className="font-semibold">Tindak Lanjut</h2>
                        <p>{rencanaAksi.tindak_lanjut}</p>

                        <h2 className="font-semibold">Bukti Pendukung</h2>
                        <a
                            className="underline"
                            href={rencanaAksi.bukti_pendukung}
                            target="_blank"
                        >
                            Lihat
                        </a>

                        <h2 className="font-semibold">Feedback</h2>
                        <p>{rencanaAksi.feedback}</p>

                        <h2 className="font-semibold">Feedback By</h2>
                        <p>{rencanaAksi.feedbackBy?.name ?? "-"}</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="pt-6">
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="feedback"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Feedback</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Masukkan feedback"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="mt-6"
                                disabled={form.formState.isSubmitting}
                            >
                                Submit
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
