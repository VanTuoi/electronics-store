import { fireEvent, render, screen } from "@testing-library/react";
import { Provider, createStore } from "jotai";
import { MemoryRouter } from "react-router-dom";
import { Cart } from "~/components/pages/cart/cart";
import { cartAtom } from "~/stores/cart";
import { Product } from "~/types";
import { formatCurrency } from "~/utils/price-utils";

const mockProduct: Product = {
    id: "1",
    name: "Test Product",
    price: 2000000,
    priceText: "",
    images: [{ url: "test-image.jpg", isMain: true }],
    description: "Test description",
    category: {
        name: "Test category",
        id: "1"
    }
};

const mockCartItem = {
    product: mockProduct,
    quantity: 1
};

describe("Cart Component", () => {
    const renderCart = (initialCart = [mockCartItem]) => {
        const store = createStore();
        store.set(cartAtom, initialCart);
        return render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        );
    };

    it("should render empty cart message when cart is empty", () => {
        renderCart([]);
        expect(screen.getByText(/giỏ hàng trống/i)).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /tiếp tục mua sắm/i })).toBeInTheDocument();
    });

    it("should render cart items correctly", () => {
        renderCart();
        expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
        expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    });

    it("should update quantity when clicking plus button", () => {
        renderCart();
        const plusButton = screen.getByTestId("plus");
        fireEvent.click(plusButton);
        expect(screen.getByDisplayValue("2")).toBeInTheDocument();
    });

    it("should update quantity when clicking minus button", () => {
        renderCart([{ ...mockCartItem, quantity: 2 }]);
        const minusButton = screen.getByTestId("minus");
        fireEvent.click(minusButton);
        expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    });

    it("should not allow quantity less than 1", () => {
        renderCart();
        const minusButton = screen.getByTestId("minus");
        fireEvent.click(minusButton);
        expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    });

    it("should update quantity when typing in input", () => {
        renderCart();
        const quantityInput = screen.getByDisplayValue("1");
        fireEvent.change(quantityInput, { target: { value: "3" } });
        expect(screen.getByDisplayValue("3")).toBeInTheDocument();
    });

    it("should remove item when clicking delete button", () => {
        renderCart();
        const deleteButton = screen.getByRole("button", { name: /xóa/i });
        fireEvent.click(deleteButton);
        expect(screen.queryByText(mockProduct.name)).not.toBeInTheDocument();
    });

    it("should calculate total correctly", () => {
        const cartItems = [
            { ...mockCartItem, quantity: 2 },
            { ...mockCartItem, product: { ...mockProduct, id: "2", price: 2000000 }, quantity: 1 }
        ];
        renderCart(cartItems);
        expect(screen.getByTestId("total").textContent).toBe(formatCurrency(6000000));
    });

    it("should have checkout button", () => {
        renderCart();
        expect(screen.getByRole("button", { name: /tiến hành thanh toán/i })).toBeInTheDocument();
    });

    it("should link to product detail page when clicking product name", () => {
        renderCart();
        const productLink = screen.getByRole("link", { name: mockProduct.name });
        expect(productLink).toHaveAttribute("href", `/product/${mockProduct.id}`);
    });
});
