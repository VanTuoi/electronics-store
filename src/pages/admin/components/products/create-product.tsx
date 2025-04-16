"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Category, Product, ProductImageInput, ProductInputSchema, ProductSchema } from "~/types";
import { useGetCategories } from "../../hooks/use-categories";
import { useCreateProducts, useUpdateProduct } from "../../hooks/use-products";
import DropzoneComponent from "../form/form-elements/drop-zone";
import Input from "../form/input/input-field";
import Select from "../form/select";
import Button from "../ui/button/button";
import ConfirmDeleteButton from "../ui/button/delete-button";

type ProductFormProps = {
    defaultValues?: Product;
    formTitle: string;
    onCancel: () => void;
    isCreateMode: boolean;
    onDelete?: () => void;
};

export const ProductForm = ({ defaultValues, formTitle, onCancel, isCreateMode, onDelete }: ProductFormProps) => {
    const { data: categories } = useGetCategories();
    const { createProducts, loading: isCreating } = useCreateProducts(onCancel);
    const { updateProduct, loading: isUpdating } = useUpdateProduct(onCancel);

    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [currentImages, setCurrentImages] = useState<ProductImageInput[] | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors }
    } = useForm<z.infer<typeof ProductInputSchema>>({
        resolver: zodResolver(ProductInputSchema),
        defaultValues: defaultValues || {
            features: [],
            specs: [],
            dimensions: {
                height: undefined,
                width: undefined,
                depth: undefined,
                unit: "cm"
            }
        }
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    useEffect(() => {
        if (defaultValues?.images) {
            setCurrentImages(defaultValues.images);
        }
    }, [defaultValues]);

    useEffect(() => {
        if (categories) {
            const category = defaultValues?.category;
            setCurrentCategory(
                !category
                    ? null
                    : typeof category === "object"
                      ? category
                      : categories.find(cat => cat.id === category) || null
            );
        }
    }, [categories, defaultValues]);

    const currentFeatures = watch("features") || [];
    const currentSpecs = watch("specs") || [];

    const handleFormSubmit: SubmitHandler<z.infer<typeof ProductSchema>> = async formData => {
        try {
            if (!currentCategory?.id) {
                toast.error("Vui lòng chọn danh mục");
                return;
            }

            const submitFormData = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (typeof value === "object") {
                        submitFormData.append(key, JSON.stringify(value));
                    } else {
                        submitFormData.append(key, value.toString());
                    }
                }
            });

            submitFormData.append("category", currentCategory.id);

            if (currentImages) {
                currentImages.forEach(image => {
                    if (image.file) {
                        submitFormData.append("files", image.file);
                    }
                });

                const mainImageIndex = currentImages.findIndex(img => img.isMain);

                if (mainImageIndex !== -1) {
                    submitFormData.append("mainImageIndex", String(mainImageIndex));
                }

                const deleteImages = currentImages.filter(img => img.isDelete && img.url).map(img => img.url);

                if (deleteImages.length > 0) {
                    submitFormData.append("deleteImages", JSON.stringify(deleteImages));
                }
            }

            if (isCreateMode) {
                await createProducts(submitFormData);
            } else if (defaultValues?.id) {
                await updateProduct({
                    id: defaultValues.id,
                    formData: submitFormData
                });
            }
        } catch (error) {
            console.error("Error in form submission:", error);
            toast.error("Có lỗi xảy ra khi lưu sản phẩm");
        }
    };

    const handleAddFeature = () => {
        setValue("features", [...currentFeatures, ""]);
    };

    const handleRemoveFeature = (index: number) => {
        setValue(
            "features",
            currentFeatures.filter((_, i) => i !== index)
        );
    };

    const handleAddSpec = () => {
        setValue("specs", [...currentSpecs, { key: "", value: "" }]);
    };

    const handleRemoveSpec = (index: number) => {
        setValue(
            "specs",
            currentSpecs.filter((_, i) => i !== index)
        );
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6" id="product-form">
            <h2 className="text-xl font-semibold">{formTitle}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Tên sản phẩm" {...register("name")} error={errors.name?.message} />
                <Input label="Mã sản phẩm" {...register("code")} error={errors.code?.message} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                    label="Thuộc danh mục"
                    placeholder="Chọn danh mục"
                    options={
                        categories?.map(cat => ({
                            label: cat.name,
                            value: cat.id
                        })) || []
                    }
                    value={currentCategory?.id || ""}
                    onValueChange={value => {
                        const selected = categories?.find(cat => cat.id === value);
                        setCurrentCategory(selected || null);
                    }}
                />
                <Input label="Xuất xứ" {...register("origin")} error={errors.origin?.message} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Mô tả" {...register("description")} error={errors.description?.message} row={4} />
                <Input label="Mục đích sử dụng" {...register("usage")} error={errors.usage?.message} row={4} />
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-white">Tính năng sản phẩm</h3>
                    <button
                        type="button"
                        onClick={handleAddFeature}
                        className="text-sm text-brand-500 hover:text-brand-600"
                    >
                        + Thêm tính năng
                    </button>
                </div>
                <div className="space-y-2">
                    {currentFeatures.map((_, index) => (
                        <div key={index} className="flex gap-2">
                            <Input
                                {...register(`features.${index}`)}
                                placeholder={`Tính năng ${index + 1}`}
                                error={errors.features?.[index]?.message}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveFeature(index)}
                                className="px-2 py-1 text-red-500 hover:text-red-700"
                                aria-label={`Xóa tính năng ${index + 1}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-white">Thông số kỹ thuật</h3>
                    <button
                        type="button"
                        onClick={handleAddSpec}
                        className="text-sm text-brand-500 hover:text-brand-600"
                    >
                        + Thêm thông số
                    </button>
                </div>
                <div className="space-y-2">
                    {currentSpecs.map((_, index) => (
                        <div key={index} className="grid grid-cols-2 gap-2">
                            <Input
                                {...register(`specs.${index}.key`)}
                                placeholder="Tên thông số"
                                error={errors.specs?.[index]?.key?.message}
                            />
                            <div className="flex gap-2">
                                <Input
                                    {...register(`specs.${index}.value`)}
                                    placeholder="Giá trị"
                                    error={errors.specs?.[index]?.value?.message}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSpec(index)}
                                    className="px-2 py-1 text-red-500 hover:text-red-700"
                                    aria-label={`Xóa thông số ${index + 1}`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                    label="Giá gốc"
                    type="number"
                    {...register("price", { valueAsNumber: true })}
                    error={errors.price?.message}
                />
                <Input
                    label="Giảm số tiền trực tiếp"
                    type="number"
                    {...register("discountPrice", { valueAsNumber: true })}
                    error={errors.discountPrice?.message}
                />
                <Input
                    label="Giảm theo phần trăm"
                    type="number"
                    {...register("discountPercent", { valueAsNumber: true })}
                    error={errors.discountPercent?.message}
                />
            </div>

            <div className="grid grid-cols-1 gap-4">
                <Input
                    label="Giảm giá khác (VD: Giá liên hệ)"
                    {...register("priceText")}
                    error={errors.priceText?.message}
                />
            </div>

            <div className="grid grid-cols-1 gap-4">
                <DropzoneComponent
                    label="Ảnh sản phẩm"
                    value={currentImages || []}
                    onChange={images =>
                        setCurrentImages(
                            images.map(img => ({
                                ...img
                            }))
                        )
                    }
                />

                {defaultValues?.images && defaultValues.images.length > 0 && (
                    <div className="text-sm text-gray-500">
                        * Ảnh hiện tại sẽ được giữ nguyên nếu bạn không tải lên ảnh mới
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input label="Vật liệu" {...register("material")} error={errors.material?.message} />
                <Input label="Thể tích" {...register("capacity")} error={errors.capacity?.message} />
                <Input
                    label="Trọng lượng (Kg)"
                    type="number"
                    {...register("weightKg", { valueAsNumber: true })}
                    error={errors.weightKg?.message}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                    label="Chiều dài"
                    type="number"
                    {...register("dimensions.height", { valueAsNumber: true })}
                    error={errors.dimensions?.height?.message}
                />
                <Input
                    label="Chiều rộng"
                    type="number"
                    {...register("dimensions.width", { valueAsNumber: true })}
                    error={errors.dimensions?.width?.message}
                />
                <Input
                    label="Chiều cao"
                    type="number"
                    {...register("dimensions.depth", { valueAsNumber: true })}
                    error={errors.dimensions?.depth?.message}
                />
                <Input label="Đơn vị tính" {...register("dimensions.unit")} error={errors.dimensions?.unit?.message} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                    label="Cấp độ bảo vệ (IPxx)"
                    {...register("protectionLevel")}
                    error={errors.protectionLevel?.message}
                />
                <Input label="Điện áp đầu vào" {...register("inputVoltage")} error={errors.inputVoltage?.message} />
                <Input label="Điện áp đầu ra" {...register("outputVoltage")} error={errors.outputVoltage?.message} />
            </div>

            {defaultValues?.id && (
                <div className="text-sm text-gray-500">
                    ID: {defaultValues.id}
                    {defaultValues.updatedAt && (
                        <span className="ml-4">
                            Cập nhật lần cuối: {format(defaultValues.updatedAt, "HH:mm dd/MM/yyyy")}
                        </span>
                    )}
                </div>
            )}

            <div className="flex justify-end items-center gap-4 pt-4 border-t">
                <Button
                    disabled={Object.keys(errors).length > 0 || isCreating || isUpdating}
                    type="submit"
                    loading={isCreating || isUpdating}
                >
                    {isCreateMode ? "Tạo mới" : "Cập nhật"}
                </Button>
                {!isCreateMode && onDelete && (
                    <ConfirmDeleteButton onConfirm={onDelete} title={`Bạn muốn xóa sản phẩm này không?`} />
                )}
            </div>
        </form>
    );
};
