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
    images: ProductImage[];
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
};

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

export interface LoginData {
    token: string;
    user: User;
}
