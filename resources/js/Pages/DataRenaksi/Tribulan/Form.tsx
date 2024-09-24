import React from "react";
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
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "./Components/FormSchema";
import { router, usePage } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";

type FormProps = {
    tribulan: number;
    renaksiId: number;
    form: UseFormReturn<z.infer<typeof FormSchema>>;
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
};

export default function Form({
    tribulan,
    renaksiId,
    form,
    openModal,
    setOpenModal,
}: FormProps) {
    const { toast } = useToast();

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        if (data.id) {
            router.put(
                route("data-laporan-renaksi.tribulan.update", {
                    data_laporan_renaksi: renaksiId,
                    tribulan: data.id,
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

        data.tribulan = tribulan;

        router.post(
            route("data-laporan-renaksi.tribulan.store", renaksiId),
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
                <Button>Tambah Data Tribulan {tribulan}</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Tambah Data Tribulan 1</DialogTitle>
                    <DialogDescription>
                        Silahkan isi form berikut untuk menambah data tribulan
                        {tribulan}.
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
                                            <Input
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
