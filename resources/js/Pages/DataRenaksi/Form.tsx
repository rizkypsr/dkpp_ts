import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form as FormWrapper,
} from "@/Components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "./FormSchema";
import { z } from "zod";
import { Input } from "@/Components/ui/input";
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
            router.put(route("data-laporan-renaksi.update", data.id), data, {
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
            });

            return;
        }

        router.post(route("data-laporan-renaksi.store"), data, {
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
                <Button>Tambah Data Laporan Renaksi</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Tambah Data Laporan Renaksi</DialogTitle>
                    <DialogDescription>
                        Silahkan isi form berikut untuk menambah data laporan
                        renaksi.
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
