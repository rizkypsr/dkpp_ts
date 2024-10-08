import React from "react";
import { InertiaFormProps, User } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form as FormWrapper,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "./FormSchema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import Select from "react-select";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { router } from "@inertiajs/react";
import moment from "moment-timezone";

type FormProps = {
    form: UseFormReturn<z.infer<typeof FormSchema>>;
    users: {
        value: number;
        label: string;
    }[];
    openFormModal: boolean;
    setOpenFormModal: (value: boolean) => void;
};

export default function Form({
    users,
    form,
    openFormModal,
    setOpenFormModal,
}: FormProps) {
    const { toast } = useToast();

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (data.id) {
            return new Promise((resolve) => {
                router.post(
                    route("laporan.update", data.id),
                    {
                        ...data,
                        tanggal_dikirim: moment(data.tanggal_dikirim)
                            .tz("Asia/Jakarta")
                            .format("YYYY-MM-DD"),
                        tanggal_diterima: moment(data.tanggal_diterima)
                            .tz("Asia/Jakarta")
                            .format("YYYY-MM-DD"),
                        _method: "put",
                    },
                    {
                        forceFormData: true,
                        onSuccess: (page) => {
                            toast({
                                title: page.props.flash.success,
                            });

                            setOpenFormModal(false);
                        },
                        onError: (errors) => {
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
            router.post(
                route("laporan.store"),
                {
                    ...data,
                    tanggal_dikirim: moment(data.tanggal_dikirim)
                        .tz("Asia/Jakarta")
                        .format("YYYY-MM-DD"),
                    tanggal_diterima: moment(data.tanggal_diterima)
                        .tz("Asia/Jakarta")
                        .format("YYYY-MM-DD"),
                },
                {
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

    return (
        <Dialog open={openFormModal} onOpenChange={setOpenFormModal}>
            <DialogTrigger asChild>
                <Button>Tambah Laporan</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Tambah Laporan</DialogTitle>
                    <DialogDescription>
                        Silahkan isi form berikut untuk menambah data laporan.
                    </DialogDescription>
                </DialogHeader>

                <FormWrapper {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-5">
                            <FormField
                                control={form.control}
                                name="user"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>NIP</FormLabel>
                                        <FormControl>
                                            <Select
                                                options={users}
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="filename"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Dokumen</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Masukan nama dokumen"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="file"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>File Dokumen</FormLabel>
                                        <FormControl>
                                            <Input
                                                ref={field.ref}
                                                type="file"
                                                name={field.name}
                                                placeholder="Masukan nama dokumen"
                                                onBlur={field.onBlur}
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files?.[0];
                                                    field.onChange(file);
                                                }}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {form.getValues("id") && (
                                <FormField
                                    control={form.control}
                                    name="tanggal_dikirim"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Tanggal Dikirim
                                            </FormLabel>
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger
                                                        className="w-full"
                                                        asChild
                                                    >
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "pl-3 text-left font-normal",
                                                                !field.value &&
                                                                    "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(
                                                                    field.value,
                                                                    "PP"
                                                                )
                                                            ) : (
                                                                <span>
                                                                    Pilih
                                                                    tanggal
                                                                </span>
                                                            )}
                                                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent
                                                        className="w-auto p-0"
                                                        align="start"
                                                    >
                                                        <Calendar
                                                            mode="single"
                                                            selected={
                                                                field.value
                                                            }
                                                            onSelect={
                                                                field.onChange
                                                            }
                                                            disabled={(date) =>
                                                                date >
                                                                    new Date() ||
                                                                date <
                                                                    new Date(
                                                                        "1900-01-01"
                                                                    )
                                                            }
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <FormField
                                control={form.control}
                                name="tanggal_diterima"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tanggal Diterima</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger
                                                    className="w-full"
                                                    asChild
                                                >
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pilih tanggal
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-auto p-0"
                                                    align="start"
                                                >
                                                    <Calendar
                                                        mode="single"
                                                        selected={
                                                            field.value as any
                                                        }
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        disabled={(date) =>
                                                            date > new Date() ||
                                                            date <
                                                                new Date(
                                                                    "1900-01-01"
                                                                )
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
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

                {/* <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <Label>User</Label>
                        <Select
                            options={users}
                            onChange={(user) => {
                                console.log(user);
                                form.setData("user", user as any);
                            }}
                            value={form.data.user}
                        />
                        {form.errors.user && (
                            <p className="text-[0.8rem] font-medium text-destructive">
                                {form.errors.user}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label>Nama Dokumen</Label>
                        <Input
                            value={form.data.filename}
                            placeholder="Nama Dokumen"
                            onChange={(e) =>
                                form.setData("filename", e.target.value)
                            }
                            autoFocus
                        />
                        {form.errors.filename && (
                            <p className="text-[0.8rem] font-medium text-destructive">
                                {form.errors.filename}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label>File Dokumen</Label>
                        <Input
                            type="file"
                            placeholder="Dokumen"
                            onChange={(e) =>
                                form.setData("file", e.target.files![0])
                            }
                        />
                        {form.errors.file && (
                            <p className="text-[0.8rem] font-medium text-destructive">
                                {form.errors.file}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label>Tanggal Dikirim</Label>
                        <Popover>
                            <PopoverTrigger className="w-full" asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "pl-3 text-left font-normal",
                                        !form.data.tanggal_dikirim &&
                                            "text-muted-foreground"
                                    )}
                                >
                                    {form.data.tanggal_dikirim ? (
                                        format(form.data.tanggal_dikirim, "PP")
                                    ) : (
                                        <span>Pilih tanggal</span>
                                    )}
                                    <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={form.data.tanggal_dikirim as any}
                                    onSelect={(date) =>
                                        form.setData("tanggal_dikirim", date)
                                    }
                                    disabled={(date) =>
                                        date > new Date() ||
                                        date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {form.errors.tanggal_dikirim && (
                            <p className="text-[0.8rem] font-medium text-destructive">
                                {form.errors.tanggal_dikirim}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label>Tanggal Diterima</Label>
                        <Popover>
                            <PopoverTrigger className="w-full" asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "pl-3 text-left font-normal",
                                        !form.data.tanggal_diterima &&
                                            "text-muted-foreground"
                                    )}
                                >
                                    {form.data.tanggal_diterima ? (
                                        format(form.data.tanggal_diterima, "PP")
                                    ) : (
                                        <span>Pilih tanggal</span>
                                    )}
                                    <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={form.data.tanggal_diterima as any}
                                    onSelect={(date) =>
                                        form.setData("tanggal_diterima", date)
                                    }
                                    disabled={(date) =>
                                        date > new Date() ||
                                        date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {form.errors.tanggal_diterima && (
                            <p className="text-[0.8rem] font-medium text-destructive">
                                {form.errors.tanggal_diterima}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="mt-6"
                        disabled={form.processing}
                    >
                        {form.processing ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Tunggu sebentar
                            </>
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </form> */}
            </DialogContent>
        </Dialog>
    );
}
