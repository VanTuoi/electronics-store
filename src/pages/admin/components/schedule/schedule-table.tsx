import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import {
    useCreateSchedules,
    useDeleteSchedules,
    useGetSchedules,
    useUpdateSchedule
} from "~/hooks/schedules/use-schedule";
import { Option, Schedule, ScheduleFormData, scheduleSchema } from "~/types";
import Input from "../form/input/input-field";
import Select from "../form/select";
import Button from "../ui/button/button";
import ConfirmDeleteButton from "../ui/button/delete-button";
import { Modal } from "../ui/modal";
import { SkeletonBox } from "../ui/skelenton/skeleton-box";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { TooltipText } from "../ui/tooltip-text/tooltip-text";

const statusOptions: Option[] = [
    { label: "Tất cả", value: "" },
    { label: "Chờ xác nhận", value: "pending" },
    { label: "Đã xác nhận", value: "confirmed" },
    { label: "Hoàn thành", value: "completed" },
    { label: "Đã hủy", value: "cancelled" }
];

export default function ScheduleTable() {
    const [filters, setFilters] = useState({
        status: "",
        search: ""
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateMode, setIsCreateMode] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);

    const { data: schedules, loading: isSearching, refetch } = useGetSchedules(filters);
    const { deleteSchedule, loading: isDeleting } = useDeleteSchedules(() => {
        setIsModalOpen(false);
        reset();
    });
    const { createSchedules, loading: isCreating } = useCreateSchedules(() => {
        setIsModalOpen(false);
        reset();
    });
    const { updateSchedule, loading: isUpdating } = useUpdateSchedule(() => {
        setIsModalOpen(false);
        reset();
    });

    const [searchParams, setSearchParams] = useSearchParams();
    const status = searchParams.get("status");

    useEffect(() => {
        if (statusOptions.some(option => option.value === status)) {
            setFilters(prev => ({ ...prev, status: status || "" }));
        }
    }, [status, refetch]);

    useEffect(() => {
        if (filters.status || filters.status === "") {
            searchParams.set("status", filters.status);
        }
        if (filters.search) {
            searchParams.set("search", filters.search);
        }
        setSearchParams(searchParams);
    }, [filters, searchParams, setSearchParams]);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<ScheduleFormData>({
        resolver: zodResolver(scheduleSchema),
        defaultValues: {
            name: "",
            phone: "",
            note: "",
            status: "pending",
            adminNote: ""
        }
    });

    const openCreateModal = () => {
        reset({
            name: "",
            phone: "",
            note: "",
            status: "pending",
            adminNote: ""
        });
        setEditingSchedule(null);
        setIsCreateMode(true);
        setIsModalOpen(true);
    };

    const handleRowClick = (schedule: Schedule) => {
        setValue("name", schedule.name);
        setValue("phone", schedule.phone);
        setValue("note", schedule.note || "");
        setValue("status", schedule.status || "pending");
        setValue("adminNote", schedule.adminNote || "");
        setValue(
            "createdAt",
            schedule.createdAt
                ? format(new Date(schedule.createdAt), "yyyy-MM-dd'T'HH:mm:ss")
                : format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")
        );
        setValue(
            "updatedAt",
            schedule.updatedAt
                ? format(new Date(schedule.updatedAt), "yyyy-MM-dd'T'HH:mm:ss")
                : format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")
        );
        setEditingSchedule(schedule);
        setIsCreateMode(false);
        setIsModalOpen(true);
    };

    const onSubmit = (data: ScheduleFormData) => {
        if (isCreateMode) {
            createSchedules(data);
        } else if (editingSchedule) {
            updateSchedule({ id: editingSchedule.id, ...data });
        }
    };

    const handleDelete = () => {
        if (editingSchedule) {
            deleteSchedule(editingSchedule);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    return (
        <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 w-full">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Lịch hẹn hỗ trợ</h2>
                        <Button
                            onClick={openCreateModal}
                            className="h-[42px] bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white"
                        >
                            Thêm lịch hẹn
                        </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-start items-end gap-2">
                        <div className="flex-1 max-w-[250px]">
                            <Input
                                label="Tìm kiếm theo tên hoặc SĐT"
                                value={filters.search}
                                onChange={e => handleFilterChange({ search: e.target.value })}
                                className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                            />
                        </div>

                        <div className="flex items-end gap-2 w-full sm:w-auto">
                            <div className="min-w-[200px]">
                                <Select
                                    options={statusOptions}
                                    placeholder="Chọn trạng thái"
                                    onValueChange={value => handleFilterChange({ status: value })}
                                    value={filters.status}
                                    label="Trạng thái xử lý"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader className="border-b border-gray-200 dark:border-gray-700">
                            <TableRow className="bg-gray-50 dark:bg-gray-700">
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-start text-gray-900 dark:text-white"
                                >
                                    Họ và tên
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-start text-gray-900 dark:text-white"
                                >
                                    Số điện thoại
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-start text-gray-900 dark:text-white"
                                >
                                    Trạng thái
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-start text-gray-900 dark:text-white"
                                >
                                    Ghi chú
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-start text-gray-900 dark:text-white"
                                >
                                    Ngày tạo
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-start text-gray-900 dark:text-white"
                                >
                                    Ngày cập nhật
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {isSearching ? (
                                <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <TableCell colSpan={6} className="px-5 py-4">
                                        <SkeletonBox height="2.5rem" className="bg-gray-200 dark:bg-gray-600" />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                schedules?.map(schedule => (
                                    <TableRow
                                        key={schedule.id}
                                        onClick={() => handleRowClick(schedule)}
                                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        <TableCell className="px-5 py-4 text-start text-gray-900 dark:text-white">
                                            <TooltipText maxWidth="max-w-[200px]">{schedule.name || "—"}</TooltipText>
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start text-gray-900 dark:text-white">
                                            {schedule.phone || "—"}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start min-w-[130px]">
                                            {schedule.status && (
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${
                                                        schedule.status === "pending"
                                                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                                            : schedule.status === "confirmed"
                                                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                                              : schedule.status === "completed"
                                                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                    }`}
                                                >
                                                    {schedule.status === "pending" && "Chờ xác nhận"}
                                                    {schedule.status === "confirmed" && "Đã xác nhận"}
                                                    {schedule.status === "completed" && "Hoàn thành"}
                                                    {schedule.status === "cancelled" && "Đã hủy"}
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start text-gray-900 dark:text-white">
                                            <TooltipText maxWidth="max-w-[200px]">{schedule.note || "—"}</TooltipText>
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start text-gray-900 dark:text-white">
                                            {schedule?.createdAt
                                                ? format(new Date(schedule.createdAt), "HH:mm dd/MM/yyyy")
                                                : "—"}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start text-gray-900 dark:text-white">
                                            {schedule?.updatedAt
                                                ? format(new Date(schedule.updatedAt), "HH:mm dd/MM/yyyy")
                                                : "—"}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Modal Form */}
            <Modal size="lg" isOpen={isModalOpen} onClose={handleCloseModal}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {isCreateMode ? "Thêm lịch hẹn mới" : "Chỉnh sửa lịch hẹn"}
                    </h2>

                    {!isCreateMode && (
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="schedule-id"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                ID lịch hẹn
                            </label>
                            <input
                                id="schedule-id"
                                className="rounded border px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                value={editingSchedule?.id || ""}
                                disabled
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Họ và tên *
                            </label>
                            <Input
                                id="name"
                                {...register("name")}
                                error={errors.name?.message}
                                placeholder="Nhập họ và tên khách hàng"
                                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Số điện thoại *
                            </label>
                            <Input
                                id="phone"
                                {...register("phone")}
                                error={errors.phone?.message}
                                placeholder="Nhập số điện thoại"
                                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="note" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Ghi chú của khách hàng
                        </label>
                        <textarea
                            id="note"
                            {...register("note")}
                            className="rounded border px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 dark:placeholder-gray-400"
                            placeholder="Nhập ghi chú (nếu có)"
                            rows={3}
                        />
                    </div>

                    {!isCreateMode && (
                        <>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="status"
                                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Trạng thái
                                    </label>
                                    <select
                                        id="status"
                                        {...register("status")}
                                        className="rounded border px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                    >
                                        <option value="pending">Chờ xác nhận</option>
                                        <option value="confirmed">Đã xác nhận</option>
                                        <option value="completed">Hoàn thành</option>
                                        <option value="cancelled">Đã hủy</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="adminNote"
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Ghi chú của quản trị viên
                                </label>
                                <textarea
                                    id="adminNote"
                                    {...register("adminNote")}
                                    className="rounded border px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 dark:placeholder-gray-400"
                                    placeholder="Nhập ghi chú quản trị (nếu có)"
                                    rows={3}
                                />
                            </div>
                        </>
                    )}

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCloseModal}
                            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            Hủy bỏ
                        </Button>
                        {!isCreateMode && (
                            <ConfirmDeleteButton
                                loading={isDeleting}
                                title="Bạn chắc chắn muốn xóa lịch hẹn này không?"
                                name="Xóa lịch hẹn"
                                onConfirm={handleDelete}
                                className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
                            />
                        )}
                        <Button
                            type="submit"
                            loading={isCreating || isUpdating}
                            disabled={isCreating || isUpdating}
                            className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded"
                        >
                            {isCreateMode ? "Tạo lịch hẹn" : "Cập nhật"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
