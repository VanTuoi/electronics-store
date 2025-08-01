import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { schedulesApi } from "~/services/schelude";
import { Schedule } from "~/types";

export const useGetSchedules = (params?: { search?: string; categoryId?: string; status?: string }) => {
  const {
    data,
    refetch,
    isPending: loading,
    error
  } = useQuery<Schedule[]>({
    queryKey: ["schedules", params],
    queryFn: async (): Promise<Schedule[]> => {
      const res = await schedulesApi("private").getSchedules(params);
      return res.data.data ?? [];
    },
    staleTime: 5 * 60 * 1000
  });

  if (error) {
    console.error("Error fetching schedules:", error);
    toast.error("Lỗi khi lấy tất cả lịch hẹn");
  }

  return {
    data,
    refetch,
    loading,
    error: error as Error | null
  };
};

export const useCreateSchedules = (onClose?: () => void) => {
  const queryClient = useQueryClient();

  const {
    mutate: createSchedules,
    isPending,
    error
  } = useMutation({
    mutationFn: async (scheduleData: Omit<Schedule, "id" | "createdAt" | "updatedAt">): Promise<Schedule | null> => {
      const res = await schedulesApi("private").createSchedule(scheduleData);
      return res.data.data;
    },
    onSuccess: newSchedule => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      onClose?.();
      toast.success(`Đã tạo lịch hẹn cho ${newSchedule?.name}`);
    },
    onError: err => {
      console.error("Error creating schedule:", err);
      toast.error(`Lỗi khi tạo lịch hẹn`);
    }
  });

  const data = queryClient.getQueryData<Schedule[]>(["schedules"]);

  return {
    data,
    createSchedules,
    loading: isPending,
    error: error as Error | null
  };
};

export const useUpdateSchedule = (onClose?: () => void) => {
  const queryClient = useQueryClient();

  const {
    mutate: updateSchedule,
    isPending,
    error
  } = useMutation({
    mutationFn: async (schedule: Omit<Schedule, "createdAt" | "updatedAt">): Promise<void> => {
      await schedulesApi("private").updateSchedule(schedule);
    },
    onSuccess: (_data, updatedSchedule) => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      onClose?.();
      toast.success(`Đã cập nhật lịch hẹn cho ${updatedSchedule?.name}`);
    },
    onError: err => {
      console.error("Error updating schedule:", err);
      toast.error(`Lỗi khi cập nhật lịch hẹn`);
    }
  });

  return {
    updateSchedule,
    loading: isPending,
    error: error as Error | null
  };
};

export const useDeleteSchedules = (onClose?: () => void) => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteSchedule,
    isPending,
    error
  } = useMutation({
    mutationFn: async (schedule: Schedule): Promise<void> => {
      await schedulesApi("private").deleteSchedule(schedule.id);
    },
    onSuccess: (_data, schedule) => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      onClose?.();
      toast.success(`Đã xóa lịch hẹn cho${schedule?.name}`);
    },
    onError: err => {
      console.error("Error deleting schedule:", err);
      toast.error(`Lỗi khi xóa lịch hẹn`);
    }
  });

  return {
    deleteSchedule,
    loading: isPending,
    error: error as Error | null
  };
};
