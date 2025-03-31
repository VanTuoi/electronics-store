import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "~/components/Footer";
import { CONTACT_INFO } from "~/constant/index";

const mockOpen = vi.fn();
Object.defineProperty(window, "open", {
    value: mockOpen,
    writable: true
});

describe("Footer", () => {
    beforeEach(() => {
        mockOpen.mockClear();
    });

    it("should render store name correctly", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        expect(screen.getByText(/electronicsstore/i)).toBeInTheDocument();
    });

    it("should render all quick links correctly", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        expect(screen.getByRole("link", { name: /sản phẩm/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /về chúng tôi/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /điều khoản và điều kiện/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /chính sách bảo mật/i })).toBeInTheDocument();
    });

    it("should render contact information correctly", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        const phoneButton = screen.getByRole("button", { name: CONTACT_INFO.phone });
        const emailButton = screen.getByRole("button", { name: CONTACT_INFO.email });

        expect(phoneButton).toBeInTheDocument();
        expect(emailButton).toBeInTheDocument();
        expect(screen.getByText(CONTACT_INFO.address)).toBeInTheDocument();
    });

    it("should handle phone number click correctly", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        const phoneButton = screen.getByRole("button", { name: CONTACT_INFO.phone });
        fireEvent.click(phoneButton);
        expect(mockOpen).toHaveBeenCalledWith(`tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, "")}`);
    });

    it("should handle email click correctly", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        const emailButton = screen.getByRole("button", { name: CONTACT_INFO.email });
        fireEvent.click(emailButton);
        expect(mockOpen).toHaveBeenCalledWith(`mailto:${CONTACT_INFO.email}`);
    });

    it("should render copyright information correctly", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        expect(screen.getByText(/bản quyền được bảo vệ/i)).toBeInTheDocument();
    });
});
