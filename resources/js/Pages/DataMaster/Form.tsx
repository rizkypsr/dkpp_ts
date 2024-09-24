import React from "react";
import { Button } from "@/components/ui/button";
import {
    Form as FormWrapper,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { router } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { FormSchema } from "./FormSchema";
import { Jabatan } from "@/types";

type FormProps = {
    form: UseFormReturn<FormSchema>;
    jabatanOptions: Jabatan[];
    openFormModal: boolean;
    setOpenFormModal: (value: boolean) => void;
};

export default function Form({
    form,
    jabatanOptions,
    openFormModal,
    setOpenFormModal,
}: FormProps) {
    const { toast } = useToast();

    const [loadingCreateJabatan, setLoadingCreateJabatan] =
        React.useState(false);

    const onSubmit = (data: FormSchema) => {
        if (data.id) {
            if (!data.feedback) {
                data.penilaianKeJabatan = [];
            }

            router.patch(route("data-master.update", data.id), data, {
                onSuccess: (page) => {
                    toast({
                        title: page.props.flash.success,
                    });

                    setOpenFormModal(false);
                },
                onError: (errors) => {
                    console.log("onError", errors);

                    if (errors.error) {
                        toast({
                            variant: "destructive",
                            title: "Ups! Terjadi kesalahan",
                            description:
                                "Terjadi kesalahan saat menyimpan data",
                        });

                        setOpenFormModal(false);
                    }
                },
            });

            return;
        }

        router.post(route("data-master.store"), data, {
            onSuccess: (page) => {
                toast({
                    title: page.props.flash.success,
                });

                setOpenFormModal(false);
            },
            onError: (errors) => {
                console.log("onError", errors);

                if (errors.error) {
                    toast({
                        variant: "destructive",
                        title: "Ups! Terjadi kesalahan",
                        description: "Terjadi kesalahan saat menyimpan data",
                    });

                    setOpenFormModal(false);
                }

                Object.keys(errors).forEach((key) => {
                    form.setError(key as any, {
                        message: errors[key],
                    });
                });
            },
        });
    };

    const handleCreateJabatan = (inputValue: string) => {
        setLoadingCreateJabatan(true);

        router.post(
            route("jabatan.store"),
            {
                nama: inputValue,
            },
            {
                onSuccess: (response) => {
                    const newOption = (
                        response.props.jabatanOptions as any
                    ).find((option: any) => option.label === inputValue);

                    if (newOption) {
                        form.setValue("jabatan", newOption);
                    }
                    setLoadingCreateJabatan(false);
                },
                onError: (error) => {
                    setLoadingCreateJabatan(false);
                },
            }
        );
    };

    return (
        <Dialog open={openFormModal} onOpenChange={setOpenFormModal}>
            <DialogTrigger asChild>
                <Button>Tambah Data Master</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Tambah Data Master</DialogTitle>
                    <DialogDescription>
                        Silahkan isi form berikut untuk menambah data master.
                    </DialogDescription>
                </DialogHeader>

                <FormWrapper {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-5">
                            <FormField
                                control={form.control}
                                name="nip"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>NIP</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="NIP Pegawai"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nama Pegawai"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Password"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="jabatan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Jabatan</FormLabel>
                                        <FormControl>
                                            <CreatableSelect
                                                {...field}
                                                isClearable
                                                options={jabatanOptions as any}
                                                onChange={(value) => {
                                                    field.onChange(value);
                                                }}
                                                onCreateOption={
                                                    handleCreateJabatan
                                                }
                                                isDisabled={
                                                    loadingCreateJabatan
                                                }
                                                isLoading={loadingCreateJabatan}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="feedback"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Feedback</FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="penilaianKeJabatan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Penilaian Ke Jabatan
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                isMulti
                                                isClearable
                                                options={jabatanOptions as any}
                                                onChange={(value) => {
                                                    console.log(
                                                        "multi select value",
                                                        value
                                                    );

                                                    field.onChange(value);
                                                }}
                                                isDisabled={
                                                    !form.watch("feedback")
                                                }
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Hanya bisa diisi jika feedback
                                            diaktifkan
                                        </FormDescription>

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
