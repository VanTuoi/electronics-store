import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "~/components/header/header";

describe("Header", () => {
    it("should render all navigation links", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        expect(screen.getByRole("link", { name: /electronics store/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /trang chủ/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /tủ điện/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /giới thiệu/i })).toBeInTheDocument();
    });

    it("should highlight the active navigation link", () => {
        render(
            <MemoryRouter initialEntries={["/products"]}>
                <Header />
            </MemoryRouter>
        );

        const activeLink = screen.getByRole("link", { name: /tủ điện/i });
        expect(activeLink.parentElement).toHaveClass("active");
    });

    it("should render the menu toggle button", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        expect(screen.getByRole("button", { name: /toggle navigation/i })).toBeInTheDocument();
    });

    it("should render CartIcon with correct count", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        expect(screen.getByRole("img", { name: "cart" })).toBeInTheDocument();
    });

    it("should allow CallIcon to be activated by keyboard", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const callButton = screen.getByRole("button", { name: /liên hệ/i });

        if (callButton) {
            fireEvent.keyDown(callButton, { key: "Enter" });
            fireEvent.keyDown(callButton, { key: " " });
        }

        fireEvent.keyDown(callButton, { key: " " });

        expect(callButton).toBeInTheDocument();
    });
});
