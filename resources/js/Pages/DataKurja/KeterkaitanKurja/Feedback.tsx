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
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataKurja } from "../Components/Columns";
import { DataKeterkaitanKurja } from "./Components/Columns";

type FeedbackProps = {
    dataKurja: DataKurja;
    keterkaitanKurja: DataKeterkaitanKurja;
    canFeedback: boolean;
};

const FormSchema = z.object({
    id: z.number().nullable(),
    feedback: z.string().min(1, "Feedback harus diisi"),
});

export default function Feedback({
    dataKurja,
    keterkaitanKurja,
    canFeedback,
}: FeedbackProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: keterkaitanKurja.id,
            feedback: keterkaitanKurja.feedback ?? "",
        },
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        router.put(
            route("data-laporan-kurja.keterkaitan-kurja.update", {
                data_laporan_kurja: dataKurja.id,
                keterkaitan_kurja: keterkaitanKurja.id,
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
                        <h2 className="font-semibold">Kinerja</h2>
                        <p>{dataKurja.kinerja}</p>

                        <h2 className="font-semibold">Target</h2>
                        <p>{dataKurja.indikator}</p>

                        <h2 className="font-semibold">Realisasi</h2>
                        <p>{dataKurja.target}</p>

                        <h2 className="font-semibold">Capaian(%)</h2>
                        <p>{dataKurja.realisasi}</p>

                        <h2 className="font-semibold">Catatan Monev</h2>
                        <p>{dataKurja.capaian}</p>

                        <h2 className="font-semibold">Tindak Lanjut</h2>
                        <p>{dataKurja.penjelasan}</p>

                        <h2 className="font-semibold">
                            Alternatif/Upaya yang telah dilakukan
                        </h2>
                        <p>{dataKurja.alternatif}</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="py-6 my-12">
                <CardContent>
                    <div className="grid max-w-xl grid-cols-2 gap-y-6">
                        <h2 className="font-semibold">
                            Nama Program/Kegiatan/Sub Kegiatan
                        </h2>
                        <p>{keterkaitanKurja.program}</p>

                        <h2 className="font-semibold">Anggaran (Rp)</h2>
                        <p>{keterkaitanKurja.anggaran}</p>

                        <h2 className="font-semibold">Realisasi (Rp)</h2>
                        <p>{keterkaitanKurja.realisasi_rupiah}</p>

                        <h2 className="font-semibold">Realisasi (%)</h2>
                        <p>{keterkaitanKurja.realisasi_persentase}</p>

                        <h2 className="font-semibold">Feedback</h2>
                        <p>{keterkaitanKurja.feedback}</p>

                        <h2 className="font-semibold">Feedback By</h2>
                        <p>{keterkaitanKurja.feedback_by?.name ?? "-"}</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="pt-6">
                <CardContent>
                    {canFeedback ? (
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
                    ) : (
                        <div>Tidak dapat memberikan feedback</div>
                    )}
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
