import { Tour } from "@/types/Tour";
import api from "../api";

export const TourService = {
  getAllTours: async () => {
    const response = await api.get<Tour[]>("/tours/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });


    return response.data;
  }
}