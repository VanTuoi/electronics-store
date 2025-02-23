import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ScheduleFormData, scheduleSchema } from "~/utils/validationSchemas/scheduleSchema";

const ScheduleForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ScheduleFormData>({
        resolver: zodResolver(scheduleSchema)
    });

    const onSubmit = (data: ScheduleFormData) => {
        toast.success("Đặt lịch hẹn thành công cho " + data.fullname);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="request-form bg-primary wow fadeInUp" data-wow-delay="0.1s">
            <h2>Đặt lịch hẹn tư vấn hỗ trợ</h2>
            <div className="form-group">
                <label htmlFor="fullname" className="label">
                    Họ và tên
                </label>
                <input
                    id="fullname"
                    type="text"
                    className="form-control"
                    placeholder="Nguyễn Trần Thủy Tiên"
                    {...register("fullname")}
                />
                {errors.fullname && <p className="text-warning">{errors.fullname.message}</p>}
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
                {errors.phone && <p className="text-warning">{errors.phone.message}</p>}
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
                {errors.note && <p className="text-warning">{errors.note.message}</p>}
            </div>
            <div className="form-group">
                <input type="submit" value="Đặt lịch hẹn" className="btn btn-secondary py-3 px-3" />
            </div>
        </form>
    );
};

export default ScheduleForm;
