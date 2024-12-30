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
    rencana_aksi: z.string().min(1, { message: "Rencana Aksi wajib diisi" }),
    target: z.string().min(1, { message: "Target wajib diisi" }),
    realisasi: z.string().min(1, { message: "Realisasi wajib diisi" }),
    capaian: z.coerce.number().min(0, { message: "Capaian wajib diisi" }),
    catatan: z.string().min(1, { message: "Catatan wajib diisi" }),
    tindak_lanjut: z.string().min(1, { message: "Tindak Lanjut wajib diisi" }),
    bukti_pendukung: z
        .instanceof(FileList, {
            message: "Bukti Pendukung wajib diisi",
        })
        .optional()
        .refine((file) => {
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
