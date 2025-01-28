import { useQuery } from "@tanstack/react-query";
import { tourService } from "@/services/tourService/route";

export const useTourQuery = {
  useGetAllTours: () => {
    return useQuery({
      queryKey: ["tours"],
      queryFn: () => tourService.getAllTours(),
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    });
  },

  useGetTourById: (tourSlug: string) => {
    return useQuery({
      queryKey: ["tours", tourSlug],
      queryFn: () => tourService.getTourBySlug(tourSlug),
      enabled: !!tourSlug,
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    });
  },

  useGetTourSchedules: (tourId: string, date?: string | null) => {
    return useQuery({
      queryKey: ["schedules", tourId, date],
      queryFn: () => tourService.getTourSchedules(tourId, date ?? undefined),
      enabled: !!tourId && date !== null,
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    });
  },
};
