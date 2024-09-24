import { z } from "zod";

export const FormSchema = z.object({
    id: z.number().optional(),
    kinerja: z.string().min(1, "Kinerja wajib diisi"),
    indikator: z.string().min(1, "Indikator wajib diisi"),
});
