import { z } from "zod";

export const FormSchema = z.object({
    id: z.number().optional(),
    kinerja: z.string().min(1, "Kinerja wajib diisi"),
    indikator: z.string().min(1, "Indikator wajib diisi"),
    target: z.string().min(1, "Target wajib diisi"),
    realisasi: z.string().min(1, "Realisasi wajib diisi"),
    capaian: z.coerce
        .number({
            required_error: "Capaian wajib diisi",
            invalid_type_error: "Capaian harus berupa angka",
        })
        .nonnegative("Capaian harus positif"),
    penjelasan: z.string().min(1, "Penjelasan wajib diisi"),
    alternatif: z.string().min(1, "Alternatif wajib diisi"),
});
