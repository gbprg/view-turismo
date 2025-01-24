import { Tour, TourSchedule } from "@/types/Tour";
import api from "../api";

interface ITourService {
  getAllTours(): Promise<Tour[]>;
  getTourById(id: string): Promise<Tour>;
  getTourSchedules(tourId: string, date?: string): Promise<TourSchedule[]>;
}

export class TourService implements ITourService {
  private static instance: TourService;

  private constructor() { }

  public static getInstance(): TourService {
    if (!TourService.instance) {
      TourService.instance = new TourService();
    }
    return TourService.instance;
  }

  async getAllTours(): Promise<Tour[]> {
    try {
      const response = await api.get<Tour[]>("/tours/");
      return response.data;
    } catch (error) {
      console.error('Error fetching tours:', error);
      throw error;
    }
  }

  async getTourById(id: string): Promise<Tour> {
    try {
      const response = await api.get<Tour>(`/tours/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching tour with ID ${id}:`, error);
      throw error;
    }
  }

  async getTourSchedules(tourId: string, date?: string): Promise<TourSchedule[]> {
    try {
      const url = date
        ? `/tours/${tourId}/schedules?date=${date}`
        : `/tours/${tourId}/schedules`;

      const response = await api.get<TourSchedule[]>(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching schedules for tour ${tourId}:`, error);
      throw error;
    }
  }
}

export const tourService = TourService.getInstance();