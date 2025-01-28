import { ReservationPeople, Tour, TourSchedule } from "@/types/Tour";
import api from "../api";

interface ITourService {
  getAllTours(): Promise<Tour[]>;
  getTourBySlug(id: string): Promise<Tour>;
  getTourSchedules(tourId: string, date?: string): Promise<TourSchedule[]>;
}

export class TourService implements ITourService {
  private static instance: TourService;

  private constructor() {}

  public static getInstance(): TourService {
    if (!TourService.instance) {
      TourService.instance = new TourService();
    }
    return TourService.instance;
  }

  async getAllTours(): Promise<Tour[]> {
    try {
      const response = await api.get<Tour[]>("/viagens");
      return response.data;
    } catch (error) {
      console.error("Error fetching tours:", error);
      throw error;
    }
  }

  async getTourBySlug(slug: string): Promise<Tour> {
    try {
      const response = await api.get<Tour>(`/viagens/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching tour with ID ${slug}:`, error);
      throw error;
    }
  }

  async getTourSchedules(
    tourId: string,
    date?: string
  ): Promise<TourSchedule[]> {
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

  async createReservationTrip(slug: string, reservation: ReservationPeople) {
    const people = {
      name: reservation.name,
      cpf: reservation.cpf,
      email: reservation.email,
      phone: reservation.phone,
      quantity: reservation.quantity,
    };

    try {
      const response = await api.post<ReservationPeople[]>(
        `/viagens/${slug}/payment`,
        people
      );

      return response.data;
    } catch (error) {
      console.error(`Error payment tour with name ${slug}:`, error);
      throw error;
    }
  }
}

export const tourService = TourService.getInstance();
