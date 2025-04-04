import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { SHIPPINGS } from "~/constant";
import { useCheckout } from "~/hooks";
import { CartItem, Product } from "~/types";
import { formatCurrency, getDisplayPrice } from "~/utils/price-utils";
import { DeliveryFormData } from "~/utils/validation-schemas/delivery-schema";
import { DeliveryForm } from "./delivery-form";

export const Checkout = () => {
    const location = useLocation();
    const { cart, totalPrice } = location.state || {};
    const { mutate: checkout, isPending } = useCheckout();
    const [cost, setCost] = useState<number>(0);

    const [defaultData, setDefaultData] = useState<DeliveryFormData>({
        fullName: "",
        phone: "",
        address: "",
        email: "",
        note: "",
        saveInfo: false
    });

    const getSavedCheckoutInfo = (): DeliveryFormData | null => {
        try {
            const savedData = localStorage.getItem("checkout-info");
            return savedData ? JSON.parse(savedData) : null;
        } catch (error) {
            console.error("Failed to parse checkout info", error);
            return null;
        }
    };

    useEffect(() => {
        const savedData = getSavedCheckoutInfo();
        if (savedData) {
            setDefaultData(savedData);
        }
    }, []);

    useEffect(() => {
        setCost(calculateShippingCost(cart.reduce((re: number, current: CartItem) => re + current.quantity, 0)));
    }, [cart]);

    const handleGetDisplay = (product: Product) => {
        const { display, rawDisplay, original, isDiscounted } = getDisplayPrice(product);

        return { display, rawDisplay, original, isDiscounted };
    };

    const calculateShippingCost = (quantity: number): number => {
        if (quantity < 3) {
            return SHIPPINGS["1-2"];
        } else if (quantity < 5) {
            return SHIPPINGS["3-4"];
        } else if (quantity < 10) {
            return SHIPPINGS["5-9"];
        }
        return SHIPPINGS["10+"];
    };

    const handleSubmit = (data: DeliveryFormData) => {
        if (isPending) return;

        checkout(
            { cart, totalPrice },
            {
                onSuccess: () => {
                    toast.success("Đặt hàng thành công");
                    if (data.saveInfo) {
                        localStorage.setItem("checkout-info", JSON.stringify(data));
                    } else {
                        localStorage.removeItem("checkout-info");
                    }
                },
                onError: () => {
                    toast.error("Đặt hàng không thành công");
                }
            }
        );
    };

    if (!cart || cart.length === 0) {
        return (
            <div className="container bg-white py-5">
                <div className="text-center">Giỏ hàng trống</div>
            </div>
        );
    }

    return (
        <div className="container bg-white py-5">
            <div className="d-flex justify-content-flex-end align-items-center">
                <div className="col-md-12">
                    <p className="mb-4 fs-3 fs-bold text-dark">Đơn hàng gồm</p>
                    <div className="mb-5">
                        {cart.map((item: CartItem, index: number) => (
                            <div key={item.product.id} className="border-bottom py-3 row align-items-center">
                                <div className="col-md-8">
                                    <p className="fs-6 mb-0">
                                        {index + 1}. {item.product.name} × {item.quantity}
                                    </p>
                                </div>
                                <div className="col-md-2 text-end">
                                    {handleGetDisplay(item.product).isDiscounted ? (
                                        <div className="d-flex flex-column flex-md-row justify-content-end align-items-end">
                                            <span className="fw-bold text-primary fs-5">
                                                {handleGetDisplay(item.product).display}
                                            </span>
                                            <span className="fw-bold text-decoration-line-through fs-6 ms-md-2">
                                                {formatCurrency(handleGetDisplay(item.product).original!)}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="fw-bold text-primary fs-5">
                                            {handleGetDisplay(item.product).display}
                                        </span>
                                    )}
                                </div>

                                <div className="col-md-2 text-end">
                                    <span className="fw-bold text-primary fs-5">
                                        <span className="fw-bold text-primary fs-5">
                                            {formatCurrency(handleGetDisplay(item.product).rawDisplay * item.quantity)}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div className="row mt-1">
                            <div className="col-md-8">Chi phí vận chuyển </div>
                            <div className="col-md-4 text-end">
                                <span className="fw-bold text-primary fs-5">{formatCurrency(cost)}</span>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-9 text-end fw-bold">Tổng cộng:</div>
                            <div className="col-md-3 text-end fw-bold fs-5 text-danger">
                                {formatCurrency(totalPrice + cost)}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <p className="mb-4 fs-3 fs-bold text-dark">Thông tin nhận hàng</p>
                    </div>
                    <div className="col-md-8 offset-md-4">
                        <div className="card shadow-lg py-3 px-4">
                            <DeliveryForm onSubmit={handleSubmit} defaultValue={defaultData} isPending={isPending} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
