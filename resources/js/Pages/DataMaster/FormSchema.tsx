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

// Create and Edit schemas without `superRefine` initially
export const createSchema = z.object({
    isCreate: z.literal(true),
    password: z
        .string()
        .min(8, { message: "Password harus lebih dari 8 karakter" })
        .max(255, { message: "Password harus kurang dari 255 karakter" }),
    confirmPassword: z
        .string({
            required_error: "Konfirmasi Password wajib diisi",
        })
        .min(8, { message: "Password harus lebih dari 8 karakter" })
        .max(255, { message: "Password harus kurang dari 255 karakter" }),
});

export const editSchema = z.object({
    isCreate: z.literal(false),
    password: z.string().optional(),
    confirmPassword: z
        .string()
        .min(8, { message: "Password harus lebih dari 8 karakter" })
        .max(255, { message: "Password harus kurang dari 255 karakter" }).optional(),
});

// Apply discriminated union without refinement first
const formSchema = z.discriminatedUnion("isCreate", [createSchema, editSchema]);

// Apply intersection between the discriminated union and the default schema
const intersectedSchema = z.intersection(formSchema, defaultSchema);

// Apply `superRefine` after the intersection
export const ValidatorSchema = intersectedSchema.superRefine((val, ctx) => {
    if (val.isCreate && val.password !== val.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password dan Konfirmasi Password tidak sama',
            path: ['confirmPassword'],
        });
    }
});

export type FormSchema = z.infer<typeof ValidatorSchema>;
