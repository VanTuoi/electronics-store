/* eslint-disable camelcase */
import { z } from "zod";

export interface ApiError {
    field?: string;
    message: string;
    code?: string;
}

export interface ResponseData<T> {
    success: boolean;
    message: string;
    data: T | null;
    statusCode: number;
    errors?: ApiError[];
}

export type ProductImage = {
    url: string;
    isMain?: boolean;
};

export type ProductSpec = {
    key: string;
    value: string;
};

export type Product = {
    id: string;
    name: string;
    code?: string;
    category: {
        name: string;
        id: string;
    };
    description?: string;
    usage?: string;
    features?: string[];
    price?: number;
    priceText?: string;
    discountPrice?: number;
    discountPercent?: number;
    quantity?: number;
    images?: ProductImage[];
    specs?: ProductSpec[];

    material?: string;
    capacity?: string;
    weightKg?: number;
    dimensions?: {
        height?: number;
        width?: number;
        depth?: number;
        unit?: string;
    };
    protectionLevel?: string;
    inputVoltage?: string;
    outputVoltage?: string;

    origin?: string;

    createdAt?: Date;
    updatedAt?: Date;
};

export type ProductImageInput = {
    file?: File;
    url?: string;
    isMain?: boolean;
    isDelete?: boolean;
};

export type ProductInput = Omit<Product, "createdAt" | "updatedAt" | "images"> & {
    images: ProductImageInput[];
};

export const ProductSpecSchema = z.object({
    key: z.string(),
    value: z.string()
});

export const ProductImageInputSchema = z.object({
    file: z.instanceof(File),
    url: z.string(),
    isMain: z.boolean().optional(),
    isDelete: z.boolean().optional()
});

export const ProductSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Tên sản phẩm không được để trống").max(100, "Tên sản phẩm không được vượt quá 100 ký tự"),
    code: z
        .string()
        .min(1, "Mã sản phẩm không được để trống")
        .max(100, "Mã sản phẩm không được vượt quá 100 ký tự")
        .optional(),
    description: z.string().optional(),
    usage: z.string().optional(),
    features: z.array(z.string()).optional(),

    price: z.preprocess(val => (val === "" || isNaN(Number(val)) ? undefined : Number(val)), z.number().optional()),
    discountPrice: z.preprocess(
        val => (val === "" || isNaN(Number(val)) ? undefined : Number(val)),
        z.number().optional()
    ),
    priceText: z.string().optional(),
    discountPercent: z.preprocess(
        val => (val === "" || isNaN(Number(val)) ? undefined : Number(val)),
        z.number().optional()
    ),

    specs: z.array(ProductSpecSchema).optional(),
    quantity: z.number().min(0, "Số lượng sản phẩm không được nhỏ hơn 0").optional(),
    images: z.array(ProductImageInputSchema).optional(),

    material: z.string().optional(),
    capacity: z.string().optional(),
    weightKg: z.preprocess(val => (val === "" || isNaN(Number(val)) ? undefined : Number(val)), z.number().optional()),
    dimensions: z
        .object({
            height: z.number({ invalid_type_error: "Vui lòng nhập chiều dài hợp lệ" }).optional(),
            width: z.number({ invalid_type_error: "Vui lòng nhập chiều rộng hợp lệ" }).optional(),
            depth: z.number({ invalid_type_error: "Vui lòng nhập chiều cao hợp lệ" }).optional(),
            unit: z.string().optional()
        })
        .optional(),

    protectionLevel: z.string().optional(),
    inputVoltage: z.string().optional(),
    outputVoltage: z.string().optional(),
    origin: z.string().optional()
});

export const ProductInputSchema = ProductSchema.omit({
    id: true,
    images: true
});

export interface User {
    id: string;
    email: string;
    role: "admin" | "user";
    accessToken: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type CartItem = {
    product: Product;
    quantity: number;
};

export interface LoginData {
    token: string;
    user: User;
}

export interface Category {
    id: string;
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type Option = {
    value: string;
    label: string;
};

export interface Schedule {
    id: string;
    name: string;
    phone: string;
    note?: string;
    status?: "pending" | "confirmed" | "completed" | "cancelled";
    adminNote?: string;
    createdAt: Date;
    updatedAt: Date;
}

export const scheduleSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Họ và tên là bắt buộc"),
    phone: z
        .string()
        .min(1, "Số điện thoại là bắt buộc")
        .regex(/^\d{10,11}$/, "Số điện thoại không hợp lệ"),
    note: z.string().max(200, "Tối đa 200 ký tự").optional(),
    status: z.enum(["pending", "confirmed", "completed", "cancelled"]).optional(),
    adminNote: z.string().max(2000, "Tối đa 2000 ký tự").optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
});

export type ScheduleFormData = z.infer<typeof scheduleSchema>;

export interface Order {
    id: string;
    name: string;
    phone: string;
    address: string;
    email?: string;
    note?: string;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    adminNote?: string;
    products: {
        id: string;
        name?: string;
        originalPrice?: number;
        price: number;
        quantity: number;
    }[];
    shippingFee: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export type OrderFormData = {
    id?: string;
    name: string;
    phone: string;
    address: string;
    email?: string;
    note?: string;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    adminNote?: string;
    products: {
        id: string;
        name?: string;
        price: number;
        originalPrice?: number;
        quantity: number;
    }[];
    shippingFee: number;
    createdAt?: string;
    updatedAt?: string;
};

export const orderSchema = z.object({
    name: z.string().min(1, "Tên là bắt buộc"),
    phone: z.string().min(1, "Số điện thoại là bắt buộc"),
    address: z.string().min(1, "Địa chỉ là bắt buộc"),
    email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
    note: z.string().optional(),
    status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
    adminNote: z.string().optional(),
    products: z
        .array(
            z.object({
                id: z.string().min(1, "ID sản phẩm là bắt buộc"),
                name: z.string().optional(),
                price: z.number().min(0, "Giá phải lớn hơn hoặc bằng 0"),
                originalPrice: z.number().optional(),
                quantity: z.number().min(1, "Số lượng phải lớn hơn 0")
            })
        )
        .min(1, "Phải có ít nhất một sản phẩm"),
    shippingFee: z.number().min(0, "Phí vận chuyển phải lớn hơn 0"),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
});
