import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { DeliveryFormData, deliverySchema } from "~/utils/validation-schemas/delivery-schema";

interface DeliveryFormProps {
    isPending: boolean;
    defaultValue?: DeliveryFormData;
    onSubmit: (data: DeliveryFormData) => void;
}

export const DeliveryForm = ({ defaultValue, isPending, onSubmit }: DeliveryFormProps) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm<DeliveryFormData>({
        resolver: zodResolver(deliverySchema),
        defaultValues: defaultValue || undefined
    });

    useEffect(() => {
        reset(defaultValue);
    }, [defaultValue, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
            <div className="col-md-6">
                <label htmlFor="name" className="form-label fw-bold">
                    Họ và tên *
                </label>
                <input
                    disabled={isPending}
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    id="name"
                    {...register("name")}
                />
                {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>

            <div className="col-md-6">
                <label htmlFor="phone" className="form-label fw-bold">
                    Số điện thoại *
                </label>
                <input
                    disabled={isPending}
                    type="text"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    id="phone"
                    {...register("phone")}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
            </div>

            <div className="col-12">
                <label htmlFor="address" className="form-label fw-bold">
                    Địa chỉ *
                </label>
                <input
                    disabled={isPending}
                    type="text"
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    id="address"
                    {...register("address")}
                />
                {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
            </div>

            <div className="col-md-6">
                <label htmlFor="email" className="form-label fw-bold">
                    Email
                </label>
                <input
                    disabled={isPending}
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="email"
                    {...register("email")}
                />
                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="col-md-6">
                <label htmlFor="note" className="form-label fw-bold">
                    Ghi chú
                </label>
                <input type="text" disabled={isPending} className="form-control" id="note" {...register("note")} />
            </div>

            <div className="col-12">
                <div className="form-check">
                    <input
                        disabled={isPending}
                        className="form-check-input"
                        defaultChecked
                        type="checkbox"
                        id="saveInfo"
                        {...register("saveInfo")}
                    />
                    <label className="form-check-label" htmlFor="saveInfo">
                        Lưu thông tin cho lần mua sau
                    </label>
                </div>
            </div>
            <div className="col-12 text-muted fst-italic">
                - Để đảm bảo an toàn và chính xác nhân viên kinh doanh sẽ liên hệ lại Quý Khách hàng để xác nhân đơn
                hàng với số điện thoại đặt lần đầu.
            </div>
            <div className="col-12 text-muted fst-italic">
                - Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, tăng trải nghiệm sử dụng website, và cho
                các mục đích cụ thể khác đã được mô tả trong{" "}
                <Link target="_blank" to="/privacy">
                    chính sách bảo mật
                </Link>{" "}
                của chúng tôi.
            </div>

            <div className="col-12">
                <button type="submit" className="btn btn-primary w-100 py-2" disabled={isPending}>
                    {isPending ? (
                        <>
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                            ></span>
                            Đang xử lý...
                        </>
                    ) : (
                        "Đặt hàng ngay"
                    )}
                </button>
            </div>
        </form>
    );
};
