import React from "react";
import { Button } from "@/Components/ui/button";
import {
    Form as FormWrapper,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { router, usePage } from "@inertiajs/react";
import { JabatanOption } from "./Types";
import { useToast } from "@/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Checkbox } from "@/Components/ui/checkbox";
import { defaultSchema, editSchema, FormSchema } from "./FormSchema";
import { useModeStore } from "@/store/useModeStore";

type FormProps = {
    form: UseFormReturn<FormSchema>;
    jabatanOptions: JabatanOption[];
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

    const props = usePage().props;

    const { mode, setMode } = useModeStore();

    const [loadingCreateJabatan, setLoadingCreateJabatan] =
        React.useState(false);

    const onSubmit = (values: FormSchema) => {
        console.log("form values", values);

        if (mode === "create") {
            router.post(route("data-master.store"), values, {
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

                    Object.keys(errors).forEach((key) => {
                        form.setError(key, {
                            message: errors[key],
                        });
                    });
                },
            });
        }

        if (mode === "edit") {
            if (!values.feedback) {
                values.penilaianKeJabatan = [];
            }

            router.patch(route("data-master.update", values.id), values, {
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
        }
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
                    const newOption = response.props.jabatanOptions.find(
                        (option: any) => option.label === inputValue
                    );

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
