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

export const FormSchema = z.object({
    id: z.number().optional(),
    user: z
        .object({
            value: z.number(),
            label: z.string(),
        })
        .refine((data) => data.value && data.label, {
            message: "User wajib dipilih",
            path: ["user"],
        }),
    filename: z.string({
        required_error: "Nama dokumen harus diisi",
    }),
    tanggal_dikirim: z.date(),
    tanggal_diterima: z.date(),
    file: z
        .instanceof(FileList, {
            message: "File wajib diisi",
        })
        .optional()
        .refine((file) => {
            console.log(file);

            if (!file || file.length === 0) {
                return true;
            }

            return file[0].size <= MAX_FILE_SIZE;
        }, "Ukuran file maksimal 5MB")
        .refine((file) => {
            if (!file || file.length === 0) {
                return true;
            }

            return ACCEPTED_FILE_TYPES.includes(file[0].type);
        }, "Tipe file tidak didukung"),
});
