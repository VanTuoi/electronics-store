import { ResponseData, Schedule } from "~/types";
import { getApi } from "~/utils/api-selector";

export const schedulesApi = (type: "public" | "private" = "public") => {
  const api = getApi(type);

  return {
    getSchedules: (params?: { search?: string; status?: string }) =>
      api.get<ResponseData<Schedule[] | null>>("/schedules", { params }),
    createSchedule: (schedule: Partial<Schedule>) => api.post<ResponseData<Schedule | null>>("/schedules", schedule),
    updateSchedule: (schedule: Partial<Schedule>) =>
      api.put<ResponseData<Schedule | null>>(`/schedules/${schedule.id}`, schedule),
    deleteSchedule: (id: string) => api.delete<ResponseData<null>>(`/schedules/${id}`)
  };
};
