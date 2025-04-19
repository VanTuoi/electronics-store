import { z } from "zod";

export const deliverySchema = z.object({
    name: z.string().min(1, "Họ tên là bắt buộc"),
    phone: z
        .string()
        .min(1, "Số điện thoại là bắt buộc")
        .regex(/^\d+$/, "Số điện thoại không hợp lệ")
        .min(10, "Số điện thoại phải có ít nhất 10 số")
        .max(15, "Số điện thoại không được vượt quá 15 số"),
    address: z.string().min(1, "Địa chỉ là bắt buộc"),
    email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
    note: z.string().optional(),
    saveInfo: z.boolean().optional()
});

export type DeliveryFormData = z.infer<typeof deliverySchema>;
