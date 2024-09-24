import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "./FormSchema";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import {
    Form as FormWrapper,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { router } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";

type FormProps = {
    monevRenaksiId: number;
    form: UseFormReturn<z.infer<typeof FormSchema>>;
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
};

export default function Form({
    monevRenaksiId,
    form,
    openModal,
    setOpenModal,
}: FormProps) {
    const { toast } = useToast();

    const fileRef = form.register("bukti_pendukung");

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        if (data.id) {
            router.post(
                route("data-laporan-monev-renaksi.rencana-aksi.update", {
                    data_laporan_monev_renaksi: monevRenaksiId,
                    rencana_aksi: data.id,
                }),
                {
                    ...data,
                    _method: "put",
                    bukti_pendukung: data.bukti_pendukung[0],
                },
                {
                    forceFormData: true,
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
            route(
                "data-laporan-monev-renaksi.rencana-aksi.store",
                monevRenaksiId
            ),
            {
                ...data,
                bukti_pendukung: data.bukti_pendukung[0],
            },
            {
                forceFormData: true,
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
                <Button>Tambah Data Laporan Renaksi</Button>
            </DialogTrigger>

            <DialogContent className="overflow-y-auto sm:max-w-md sm:max-h-[90%]">
                <DialogHeader>
                    <DialogTitle>Tambah Data Rencana Aksi</DialogTitle>
                    <DialogDescription>
                        Silahkan isi form berikut untuk menambah data rencana
                        aksi.
                    </DialogDescription>
                </DialogHeader>

                <FormWrapper {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-5">
                            <FormField
                                control={form.control}
                                name="rencana_aksi"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rencana Aksi</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Masukkan rencana aksi"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="target"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Target</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Masukkan target"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="realisasi"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Realisasi</FormLabel>
                                        <FormControl>
                                            <Input
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
                                name="capaian"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Capaian</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Masukkan capaian"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="catatan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Catatan</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Masukkan catatan"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tindak_lanjut"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tindak Lanjut</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Masukkan tindak lanjut"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bukti_pendukung"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bukti Pendukung</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                placeholder="Masukan bukti pendukung"
                                                {...fileRef}
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
