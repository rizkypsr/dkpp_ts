import { z } from "zod";

export const FormSchema = z.object({
    id: z.number().optional(),
    program: z.string().min(1, "Program wajib diisi"),
    anggaran: z.coerce.number().min(0, { message: "Anggaran minimal 0" }),
    realisasi_rupiah: z.coerce
        .number()
        .min(0, { message: "Realisasi minimal 0" }),
    realisasi_persentase: z.coerce
        .number()
        .min(0, { message: "Realisasi minimal 0" }),
});
