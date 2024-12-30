import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "./FormSchema";
import { useToast } from "@/hooks/use-toast";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { router, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { Option } from "@/types";
import Select from "react-select";

type FormProps = {
    form: UseFormReturn<z.infer<typeof FormSchema>>;
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
                router.put(route("data-laporan-kurja.update", data.id), data, {
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
                        resolve('done');
                    }
                });
            });
        }

        return new Promise((resolve) => {
            router.post(route("data-laporan-kurja.store"), data, {
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
                    resolve('done');
                }
            });
        });
    };

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
                <Button>Tambah Data Laporan Kurja</Button>
            </DialogTrigger>

            <DialogContent className="overflow-y-auto sm:max-w-md sm:max-h-[90%]">
                <DialogHeader>
                    <DialogTitle>Tambah Data Laporan Kurja</DialogTitle>
                    <DialogDescription>
                        Silahkan isi form berikut untuk menambah data laporan
                        kurja.
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
                                        <FormLabel>
                                            Realisasi s.d Tribulan 1
                                        </FormLabel>
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
                                        <FormLabel>Capaian (%)</FormLabel>
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
                                name="penjelasan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Penjelasan</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Masukkan penjelasan"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="alternatif"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Alternatif/Upaya yang telah
                                            dilakukan
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Masukkan alternatif"
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
