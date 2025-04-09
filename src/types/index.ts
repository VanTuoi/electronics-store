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
    category: string;
    description?: string;
    usage?: string;
    features?: string[];

    price?: number;
    priceText?: string;
    discountPrice?: number;
    discountPercent?: number;
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
