import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_FILE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const defaultSchema = z.object({
    isCreate: z.boolean(),
    id: z.number().optional(),
    user: z
        .object(
            {
                value: z.number({
                    required_error: "User harus dipilih",
                }),
                label: z.string({
                    required_error: "User harus dipilih",
                }),
            },
            {
                required_error: "User harus dipilih",
            }
        )
        .refine((data) => data.value && data.label, {
            message: "User wajib dipilih",
            path: ["user"],
        }),
    filename: z
        .string({
            required_error: "Nama dokumen harus diisi",
        })
        .min(1, "Nama dokumen harus diisi"),
    tanggal_diterima: z.date({
        required_error: "Tanggal diterima harus dipilih",
    }),
});

export const createSchema = z.object({
    isCreate: z.literal(true),
    tanggal_dikirim: z
        .date({
            required_error: "Tanggal dikirim harus dipilih",
        })
        .optional(),
    file: z
        .instanceof(File, { message: "File dokumen wajib dipilih" })
        .refine((value) => value instanceof File || typeof value === "string", {
            message: "File dokumen wajib dipilih",
        })
        .refine((file) => {
            if (!file) {
                return true;
            }
            return file.size <= MAX_FILE_SIZE;
        }, "Ukuran file maksimal 5MB")
        .refine((file) => {
            if (!file) {
                return true;
            }

            return ACCEPTED_FILE_TYPES.includes(file.type);
        }, "Tipe file tidak didukung"),
});

export const editSchema = z.object({
    isCreate: z.literal(false),
    tanggal_dikirim: z.date({
        required_error: "Tanggal dikirim harus dipilih",
    }),
    file: z
        .instanceof(File, { message: "File dokumen wajib dipilih" })
        .refine((value) => value instanceof File || typeof value === "string", {
            message: "File dokumen wajib dipilih",
        })
        .refine((file) => {
            if (!file) {
                return true;
            }
            return file.size <= MAX_FILE_SIZE;
        }, "Ukuran file maksimal 5MB")
        .refine((file) => {
            if (!file) {
                return true;
            }

            return ACCEPTED_FILE_TYPES.includes(file.type);
        }, "Tipe file tidak didukung")
        .optional(),
});

const discriminatedSchema = z.discriminatedUnion("isCreate", [
    createSchema,
    editSchema,
]);
export const FormSchema = z.intersection(discriminatedSchema, defaultSchema);
