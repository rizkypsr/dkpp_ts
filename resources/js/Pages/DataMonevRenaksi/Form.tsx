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
import { router, usePage } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Select from "react-select";
import { Option } from "@/types";

type FormProps = {
    form: any;
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    jabatanOptions: Option[];
};

export default function Form({ form, openModal, setOpenModal, jabatanOptions }: FormProps) {
    const { auth } = usePage().props;
    const { toast } = useToast();

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        if (data.id) {
            return new Promise((resolve) => {
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
                        onFinish: () => {
                            resolve("done");
                        },
                    }
                );
            });
        }

        return new Promise((resolve) => {
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
                onFinish: () => {
                    resolve("done");
                },
            });
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
                            {auth.user?.roles?.some(role => role.name === "kepaladinas" || role.name === "superadmin") && (
                                <FormField
                                    control={form.control}
                                    name="jabatan"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Jabatan</FormLabel>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    isMulti
                                                    isClearable
                                                    options={jabatanOptions as any}
                                                    onChange={(value) => {
                                                        field.onChange(value);
                                                    }}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="mt-6"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Tunggu sebentar
                                </>
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </form>
                </FormWrapper>
            </DialogContent>
        </Dialog>
    );
}
