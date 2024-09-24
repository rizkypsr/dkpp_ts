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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Form as FormWrapper,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { router } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";

type FormProps = {
    form: UseFormReturn<z.infer<typeof FormSchema>>;
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
};

export default function Form({ form, openModal, setOpenModal }: FormProps) {
    const { toast } = useToast();

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        if (data.id) {
            router.put(
                route("data-laporan-monev-renaksi.update", data.id),
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

        router.post(route("data-laporan-monev-renaksi.store"), data, {
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
                        description: "Terjadi kesalahan saat menyimpan data",
                    });

                    setOpenModal(false);
                }

                Object.keys(errors).forEach((key) => {
                    form.setError(key as any, {
                        message: errors[key],
                    });
                });
            },
        });
    };

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
                <Button>Tambah Data Laporan Monev Renaksi</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Tambah Data Laporan Monev Renaksi</DialogTitle>
                    <DialogDescription>
                        Silahkan isi form berikut untuk menambah data laporan
                        monev renaksi.
                    </DialogDescription>
                </DialogHeader>

                <FormWrapper {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-5">
                            <FormField
                                control={form.control}
                                name="kinerja"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kinerja</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Masukkan kinerja"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="indikator"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Indikator Kinerja Individu
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Masukkan indikator kinerja individu"
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
