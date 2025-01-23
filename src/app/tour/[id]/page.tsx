"use client";

import { TourDetailsSkeleton } from "@/components/skeleton/tourDetails";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { TourService } from "@/services/tourService/route";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import DatePicker from "react-datepicker";
import CardContent from "@/components/ui/CardContent";
import { Carousel } from "@/components/ui/Carousel";
import { TourImage } from "@/types/Tour";

export default function TourDetails() {
  const { id } = useParams();
  const tourId = String(id);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { data: tour, isLoading: tourLoading, error: tourError } = useQuery({

    queryKey: ["tours", tourId],
    queryFn: () => TourService.getTourById(tourId),
  });

  console.log(tour)
  const { data: schedules, isLoading: schedulesLoading, error: schedulesError } = useQuery({
    queryKey: ["schedules", tourId, selectedDate?.toISOString().split("T")[0]],
    queryFn: () => {
      if (selectedDate) {
        return TourService.getTourSchedules(tourId, selectedDate.toISOString().split("T")[0]);
      }
      return [];
    },
    enabled: !!selectedDate,
  });

  if (tourLoading) {
    return <TourDetailsSkeleton />;
  }

  if (tourError) return <div>Erro ao carregar os detalhes do passeio.</div>;

  if (!tour) return <div>Passeio não encontrado</div>;

  const mainImage = tour.image || '';
  const galleryImages = tour.images?.map((img: TourImage) => img.image) || [];
  const images = [mainImage, ...galleryImages].filter(Boolean);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tour Info */}
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={tour.title || "Imagem do passeio"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
              <p className="text-gray-500">Imagem não disponível</p>
            </div>
          )}
          {tour.status_promotion && (
            <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">
              Promoção
            </span>
          )}
          <Carousel
            images={images}
            title={tour.title}
          />
        </div>

        {/* Tour Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>
          <p className="text-gray-600 mb-6">{tour.description}</p>
          <div className="text-2xl font-bold mb-8">
            R$ {tour.price?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>

          {/* Calendário */}
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">Escolha uma data:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()} // Não permite datas no passado
              className="border rounded px-4 py-2 text-black"
              placeholderText="Selecione uma data"
            />
          </div>

          {/* Available Schedules */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Horários Disponíveis</h2>
            {schedulesLoading && <div>Carregando horários...</div>}
            {schedulesError && <div>Erro ao carregar horários disponíveis.</div>}
            {(!schedulesLoading && (!schedules || schedules.length === 0)) && (
              <div>Nenhum horário disponível para esta data.</div>
            )}
            {(!schedulesLoading && schedules && schedules.length > 0) && (
              <div className="grid gap-4">
                {schedules.map((schedule) => (
                  <Card key={schedule.id}>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">
                            {schedule.time
                              .replaceAll(" ", "")
                              .split(",")
                              .map((x) => (
                                <div key={x}>{x}</div>
                              ))}
                          </div>
                          <p className="text-sm text-gray-500">
                            Motorista: {schedule.driver.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Assentos disponíveis: {schedule.available_seats}
                          </p>
                        </div>
                        <Button
                          variant="primary"
                          onClick={() => {
                            toast.success("Horário reservado com sucesso!");
                          }}
                          disabled={schedule.available_seats === 0}
                        >
                          Reservar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
