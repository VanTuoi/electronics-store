import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "~/components/Footer";

const mockOpen = vi.fn();
Object.defineProperty(window, "open", {
    value: mockOpen,
    writable: true
});

describe("Footer", () => {
    beforeEach(() => {
        mockOpen.mockClear();
    });

    it("should render store information correctly", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        expect(screen.getByText(/electronics store/i)).toBeInTheDocument();
        expect(screen.getByText(/địa chỉ tin cậy cho mọi nhu cầu điện tử/i)).toBeInTheDocument();
    });

    it("should render all quick links", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        expect(screen.getByRole("link", { name: /trang chủ/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /sản phẩm/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /về chúng tôi/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /liên hệ/i })).toBeInTheDocument();
    });

    it("should render contact information correctly", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        expect(screen.getByText(/123 đường hùng vương/i)).toBeInTheDocument();
        expect(screen.getByText(/quận 1, tp.hcm/i)).toBeInTheDocument();
        expect(screen.getByText(/\(0369\) 369 369/i)).toBeInTheDocument();
        expect(screen.getByText(/electronicsstore@dientu.com/i)).toBeInTheDocument();
    });

    it("should render newsletter section correctly", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        expect(screen.getByText(/bản tin/i)).toBeInTheDocument();
        expect(screen.getByText(/đăng ký nhận tin để cập nhật những ưu đãi mới nhất/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/nhập email của bạn/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /đăng ký/i })).toBeInTheDocument();
    });

    it("should render social media links", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        expect(screen.getByRole("link", { name: /facebook/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /twitter/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /instagram/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /linkedin/i })).toBeInTheDocument();
    });

    it("should handle phone number click", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        const phoneButton = screen.getByRole("button", { name: /gọi điện thoại/i });
        fireEvent.click(phoneButton);
        expect(mockOpen).toHaveBeenCalledWith("tel:0369369369");
    });

    it("should handle email click", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        const emailButton = screen.getByRole("button", { name: /gửi email đến/i });
        fireEvent.click(emailButton);
        expect(mockOpen).toHaveBeenCalledWith("mailto:ElectronicsStore@dientu.com");
    });

    it("should render copyright information", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        expect(screen.getByText(/bản quyền được bảo vệ/i)).toBeInTheDocument();
    });
});
