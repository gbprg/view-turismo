import { Tour, TourSchedule } from "@/types/Tour";
import api from "../api";

export const TourService = {
  getAllTours: async () => {
    const response = await api.get<Tour[]>("/tours/");
    return response.data;
  },

  getTourById: async (id: string): Promise<Tour[]> => {
    const response = await api.get<Tour[]>(`/tours/${id}`);
    return response.data;
  },

  getTourSchedules: async (tourId: string, date: string): Promise<TourSchedule[]> => {
    if (!date) {
      const response = await api.get<TourSchedule[]>(`/tours/${tourId}/schedules`);
      console.log(response.data);
      return response.data;
    }
    const response = await api.get<TourSchedule[]>(`/tours/${tourId}/schedules?date=${date}`);
    console.log(response.data);
    return response.data;
  },
}