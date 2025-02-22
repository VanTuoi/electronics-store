import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "~/components/Header";

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
        expect(screen.getByRole("link", { name: /liên hệ/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /giới thiệu/i })).toBeInTheDocument();
    });

    it("should highlight the active navigation link", () => {
        render(
            <MemoryRouter initialEntries={["/product"]}>
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
});
