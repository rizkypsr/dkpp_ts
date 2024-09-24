import { z } from "zod";

export const FormSchema = z.object({
    id: z.number().optional(),
    tribulan: z.number().optional(),
    rencana_aksi: z.string().min(1, "Rencana Aksi wajib diisi"),
    target: z.string().min(1, "Target wajib diisi"),
    data_laporan_renaksi_id: z.number().optional(),
});
