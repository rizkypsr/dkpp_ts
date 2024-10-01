import React from "react";
import { User } from "@/types";
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
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

type FormProps = {
    form: UseFormReturn<z.infer<typeof FormSchema>>;
    users: User[];
    openFormModal: boolean;
    setOpenFormModal: (value: boolean) => void;
};

export default function Form({
    form,
    users,
    openFormModal,
    setOpenFormModal,
}: FormProps) {
    console.log(users);
    const { toast } = useToast();

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const fileRef = form.register("file");

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log(data);
    };

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
                                        <FormLabel>User</FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                options={users as any}
                                                onChange={(value) => {
                                                    field.onChange(value);
                                                }}
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
                                                placeholder="Nama Dokumen"
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
                                        <FormLabel>Dokumen</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                placeholder="Dokumen"
                                                {...fileRef}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tanggal_diterima"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Tanggal Diterima</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
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
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
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
