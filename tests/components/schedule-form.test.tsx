import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { ScheduleForm } from "~/components/pages";

const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("ScheduleForm", () => {
  test("renders form correctly", () => {
    render(<ScheduleForm />, { wrapper: Wrapper });

    expect(screen.getByText("Đặt lịch hẹn tư vấn hỗ trợ")).toBeInTheDocument();
    expect(screen.getByLabelText("Họ và tên")).toBeInTheDocument();
    expect(screen.getByLabelText("Số điện thoại (Có sử dụng Zalo)")).toBeInTheDocument();
    expect(screen.getByLabelText("Ghi chú")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Đặt lịch hẹn" })).toBeInTheDocument();
  });

  test("shows validation errors when submitting an empty form", async () => {
    render(<ScheduleForm />, { wrapper: Wrapper });

    fireEvent.click(screen.getByRole("button", { name: "Đặt lịch hẹn" }));

    await waitFor(() => {
      expect(screen.getByText(/họ và tên là bắt buộc/i)).toBeInTheDocument();
      expect(screen.getByText(/số điện thoại là bắt buộc/i)).toBeInTheDocument();
    });
  });
});
