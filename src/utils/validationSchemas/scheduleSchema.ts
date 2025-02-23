import * as z from "zod";

export const scheduleSchema = z.object({
    fullname: z.string().min(1, "Họ và tên là bắt buộc"),
    phone: z
        .string()
        .min(1, "Số điện thoại là bắt buộc")
        .regex(/^\d{10,11}$/, "Số điện thoại không hợp lệ"),
    note: z.string().optional()
});

export type ScheduleFormData = z.infer<typeof scheduleSchema>;
