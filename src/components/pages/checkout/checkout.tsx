import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SHIPPINGS } from "~/constant";
import { useCreateOrders } from "~/hooks/orders/use-order";
import { cartAtom } from "~/stores/cart";
import { CartItem, Product } from "~/types";
import { formatCurrency, getDisplayPrice } from "~/utils/price-utils";
import { DeliveryFormData } from "~/utils/validation-schemas/delivery-schema";
import { DeliveryForm } from "./delivery-form";

interface CartItemFromForm {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart: cartState, totalPrice } = location.state || {};
    const { createOrders, loading: isPending, data: dataOrder } = useCreateOrders();
    const [cart, setCart] = useAtom(cartAtom);
    const [cost, setCost] = useState<number>(0);

    const [defaultData, setDefaultData] = useState<DeliveryFormData>({
        name: "",
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
        setCost(
            calculateShippingCost(cartState?.reduce((re: number, current: CartItem) => re + current.quantity, 0) ?? 0)
        );
    }, [cartState]);

    useEffect(() => {
        if (dataOrder?.id) {
            const timer = setTimeout(() => {
                navigate(`/check?id=${dataOrder.id}`, { replace: true, state: null });
            }, 500);

            return () => clearTimeout(timer);
        }
        return undefined;
    }, [dataOrder, navigate]);

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

    const removeFromCart = (productId: string) => {
        const updatedCart = cart.filter((item: CartItem) => item.product.id !== productId);
        setCart(updatedCart);
    };

    const handleSubmit = (data: DeliveryFormData) => {
        if (isPending) return;

        const orderData = {
            name: data.name,
            phone: data.phone,
            address: data.address,
            email: data.email,
            note: data.note,
            status: "pending" as const,
            products: cartState.map((item: CartItem) => ({
                id: item.product.id,
                name: item.product.name,
                price: getDisplayPrice(item.product).rawDisplay,
                quantity: item.quantity
            })),
            totalPrice: totalPrice + cost,
            shippingFee: cost
        };

        createOrders(orderData, {
            onSuccess: () => {
                orderData?.products?.forEach((element: CartItemFromForm) => {
                    removeFromCart(element.id);
                });

                if (data.saveInfo) {
                    localStorage.setItem("checkout-info", JSON.stringify(data));
                } else {
                    localStorage.removeItem("checkout-info");
                }
            }
        });
    };

    if (!cartState || cartState.length === 0) {
        return (
            <div className="text-center py-5">
                <h3 className="py-5">Giỏ hàng trống !</h3>
                <Link to="/cart" className="btn btn-primary py-2">
                    Quay lại giỏ hàng
                </Link>
                <p className="py-3">
                    Nếu đã thực hiện mua hàng, vui lòng kiểm tra đơn hàng <Link to="/check">tại đây</Link>
                </p>
            </div>
        );
    }

    return (
        <div className="container bg-white py-5">
            <div className="d-flex justify-content-flex-end align-items-center">
                <div className="col-md-12">
                    <p className="mb-4 fs-3 fs-bold text-dark">Đơn hàng gồm</p>
                    <div className="mb-5">
                        {cartState.map((item: CartItem, index: number) => (
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
                        <div className="row mt-1 py-3">
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
