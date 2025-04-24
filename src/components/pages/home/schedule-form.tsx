import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useCreateSchedules } from "~/hooks/schedules/use-schedule";
import { ScheduleFormData, scheduleSchema } from "~/types";

export const ScheduleForm = memo(() => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ScheduleFormData>({
        resolver: zodResolver(scheduleSchema)
    });

    const { createSchedules, loading } = useCreateSchedules(reset);

    const onSubmit = (data: ScheduleFormData) => {
        createSchedules({ ...data, status: "pending" });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="request-form bg-primary py-5">
            <h3 className="title">Đặt lịch hẹn tư vấn hỗ trợ</h3>
            <div className="form-group">
                <label htmlFor="name" className="label">
                    Họ và tên
                </label>
                <input
                    id="name"
                    type="text"
                    className="form-control"
                    placeholder="Nguyễn Trần Thủy Tiên"
                    {...register("name")}
                />
                {errors.name && <p className="text-warning text-small">{errors.name.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="phone" className="label">
                    Số điện thoại (Có sử dụng Zalo)
                </label>
                <input
                    id="phone"
                    type="text"
                    className="form-control"
                    placeholder="0369369369"
                    {...register("phone")}
                />
                {errors.phone && <p className="text-warning text-small">{errors.phone.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="note" className="label">
                    Ghi chú
                </label>
                <input
                    id="note"
                    type="text"
                    className="form-control"
                    placeholder="Loại đồ án,..."
                    {...register("note")}
                />
                {errors.note && <p className="text-warning text-small">{errors.note.message}</p>}
            </div>
            <div className="form-group mt-4">
                <input disabled={loading} type="submit" value="Đặt lịch hẹn" className="btn btn-secondary py-3 px-3" />
            </div>
        </form>
    );
});
