import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "./FormSchema";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form as FormWrapper,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { router } from "@inertiajs/react";

type FormProps = {
    kurjaId: number;
    form: UseFormReturn<z.infer<typeof FormSchema>>;
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
};

export default function Form({
    kurjaId,
    form,
    openModal,
    setOpenModal,
}: FormProps) {
    const { toast } = useToast();

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        if (data.id) {
            router.put(
                route("data-laporan-kurja.keterkaitan-kurja.update", {
                    data_laporan_kurja: kurjaId,
                    keterkaitan_kurja: data.id,
                }),
                data,
                {
                    onSuccess: (page) => {
                        toast({
                            title: page.props.flash.success,
                        });

                        setOpenModal(false);
                    },
                    onError: (errors) => {
                        if (errors.error) {
                            toast({
                                variant: "destructive",
                                title: "Ups! Terjadi kesalahan",
                                description:
                                    "Terjadi kesalahan saat menyimpan data",
                            });

                            setOpenModal(false);
                        }

                        Object.keys(errors).forEach((key) => {
                            form.setError(key as any, {
                                message: errors[key],
                            });
                        });
                    },
                }
            );

            return;
        }

        router.post(
            route("data-laporan-kurja.keterkaitan-kurja.store", kurjaId),
            data,
            {
                onSuccess: (page) => {
                    toast({
                        title: page.props.flash.success,
                    });

                    setOpenModal(false);
                },
                onError: (errors) => {
                    if (errors.error) {
                        toast({
                            variant: "destructive",
                            title: "Ups! Terjadi kesalahan",
                            description:
                                "Terjadi kesalahan saat menyimpan data",
                        });

                        setOpenModal(false);
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
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
                <Button>Tambah Data Keterkaitan</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Tambah Data Keterkaitan</DialogTitle>
                    <DialogDescription>
                        Silahkan isi form berikut untuk menambah data
                        keterkaitan dengan komponen perencanaan.
                    </DialogDescription>
                </DialogHeader>

                <FormWrapper {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-5">
                            <FormField
                                control={form.control}
                                name="program"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Program</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Masukkan program"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="anggaran"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Anggaran (Rp)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Masukkan anggaran"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="realisasi_rupiah"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Realisasi (Rp)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Masukkan realisasi"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="realisasi_persentase"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Realisasi (%)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Masukkan realisasi"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="mt-6"
                            disabled={form.formState.isSubmitting}
                        >
                            Submit
                        </Button>
                    </form>
                </FormWrapper>
            </DialogContent>
        </Dialog>
    );
}
