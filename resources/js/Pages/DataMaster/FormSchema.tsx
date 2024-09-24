import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.invalid_type) {
        if (issue.expected === "object") {
            return { message: "Data ini wajib diisi" };
        }
    }
    return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

export const defaultSchema = z.object({
    isCreate: z.boolean(),
    id: z.number().optional(),
    nip: z.string().regex(/^\d+$/, "NIP hanya boleh berisi angka"),
    name: z
        .string()
        .min(3, { message: "Nama harus lebih dari 3 karakter" })
        .max(255, { message: "Nama harus kurang dari 255 karakter" }),
    feedback: z.boolean().default(false),
    jabatan: z
        .object({
            value: z.number(),
            label: z.string().min(1, "Jabatan label is required"),
        })
        .refine((data) => data.value && data.label, {
            message: "Jabatan wajib diisi",
            path: ["jabatan"],
        }),
    penilaianKeJabatan: z
        .array(
            z.object({
                value: z.number(),
                label: z.string(),
            })
        )
        .optional(),
});

export const createSchema = z.object({
    isCreate: z.literal(true),
    password: z
        .string()
        .min(8, { message: "Password harus lebih dari 8 karakter" })
        .max(255, { message: "Password harus kurang dari 255 karakter" }),
});

export const editSchema = z.object({
    isCreate: z.literal(false),
    password: z.string().optional(),
});

const formSchema = z.discriminatedUnion("isCreate", [createSchema, editSchema]);

export const ValidatorSchema = z.intersection(formSchema, defaultSchema);

export type FormSchema = z.infer<typeof ValidatorSchema>;
