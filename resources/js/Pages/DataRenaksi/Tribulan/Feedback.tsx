import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import React from "react";
import { DataTribulan } from "./Components/Columns";
import { Card, CardContent } from "@/components/ui/card";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { router, usePage } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";

type FeedbackProps = {
    tribulan: DataTribulan;
};

const FormSchema = z.object({
    id: z.number().nullable(),
    feedback: z.string().min(1, "Feedback harus diisi"),
});

export default function Feedback({ tribulan }: FeedbackProps) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: tribulan.id,
            feedback: tribulan.feedback ?? "",
        },
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        router.put(
            route("data-laporan-renaksi.tribulan.update", {
                data_laporan_renaksi: tribulan.data_laporan_renaksi_id,
                tribulan: tribulan.id,
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
        <AuthenticatedLayout header="Data Laporan Renaksi - Feedback Renaksi">
            <Card className="py-6 my-12">
                <CardContent>
                    <h1 className="mb-6">Tribulan 1</h1>
                    <div className="grid max-w-xl grid-cols-2 gap-y-6">
                        <h2 className="font-semibold">Rencana Aksi</h2>
                        <p>{tribulan.rencana_aksi}</p>

                        <h2 className="font-semibold">Target</h2>
                        <p>{tribulan.target}</p>

                        <h2 className="font-semibold">Feedback</h2>
                        <p>{tribulan.feedback}</p>

                        <h2 className="font-semibold">Feedback By</h2>
                        <p>{tribulan.feedback_by?.name ?? "-"}</p>
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
