import { render, screen } from "@testing-library/react";
import Greet from "~/components/common/Greet";

describe("Greet", () => {
    it("should render Hello with the name when name is provided", () => {
        render(<Greet />);

        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(/hello/i);
    });
});
