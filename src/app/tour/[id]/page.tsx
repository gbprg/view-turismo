"use client";

import { TourDetailsSkeleton } from "@/components/skeleton/tourDetails";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import DatePicker from "react-datepicker";
import CardContent from "@/components/ui/CardContent";
import { Carousel } from "@/components/ui/Carousel";
import { ReservationPeople, TourImage } from "@/types/Tour";
import { useTourQuery } from "@/hooks/useTourQuery";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { tourService } from "@/services/tourService/route";

export default function TourDetails() {
  const { id } = useParams();
  const tourId = String(id);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const {
    data: tour,
    isLoading: tourLoading,
    error: tourError,
  } = useTourQuery.useGetTourById(tourId);

  const {
    data: schedules,
    isLoading: schedulesLoading,
    error: schedulesError,
  } = useTourQuery.useGetTourSchedules(
    tourId,
    selectedDate?.toISOString().split("T")[0]
  );

  if (tourLoading) {
    return <TourDetailsSkeleton />;
  }

  if (tourError) return <div>Erro ao carregar os detalhes do passeio.</div>;

  if (!tour) return <div>Passeio não encontrado</div>;

  const mainImage = tour.images[0].image || "";
  const galleryImages = tour.images?.map((img: TourImage) => img.image) || [];
  const images = [mainImage, ...galleryImages].filter(Boolean);

  const handlePayment = async (event: FormEvent) => {
    event.preventDefault();

    const people: ReservationPeople = {
      name,
      email,
      cpf,
      phone,
      quantity,
    };

    await tourService.createReservationTrip(tour.slug, people);
    setName("");
    setCpf("");
    setEmail("");
    setPhone("");
    setQuantity(1);
    alert("Reserva feita com sucesso!");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex gap-2 items-center pb-6">
        <Link href={"/"} className="hover:underline">
          <p>Home</p>
        </Link>
        <p>
          {" "}
          <FaArrowRight />{" "}
        </p>
        <Link href={`/tour/${tour.slug}`} className="hover:underline">
          <p>{tour.name}</p>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tour Info */}
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={tour.name || "Imagem do passeio"}
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
          <Carousel images={images} title={tour.name} />
        </div>

        {/* Tour Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{tour.name}</h1>
          <p className="text-gray-600 mb-6">{tour.description}</p>
          <div className="text-2xl font-bold mb-8">
            R${" "}
            {tour.price?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>

          {/* Calendário */}
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">
              Escolha uma data:
            </label>
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
            {schedulesError && (
              <div>Erro ao carregar horários disponíveis.</div>
            )}
            {!schedulesLoading && (!schedules || schedules.length === 0) && (
              <div>Nenhum horário disponível para esta data.</div>
            )}
            {!schedulesLoading && schedules && schedules.length > 0 && (
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
                            Veículo: {schedule.driver.vehicle}
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

      {/* PAGAMENTO MOCK */}
      <form onSubmit={(event) => handlePayment(event)}>
        <div>
          <label htmlFor="quantity">Quantidade de Reservas</label>
          <select
            name=""
            id=""
            className="text-black"
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setQuantity(Number(event.target.value))
            }
          >
            {[1, 2, 3, 4, 5].map((range, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="name">Nome</label>
          <input
            className="text-black p-2"
            type="text"
            name="name"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="cpf">CPF</label>
          <input
            className="text-black p-2"
            type="text"
            name="cpf"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setCpf(event.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="email">E-mail</label>
          <input
            className="text-black p-2"
            type="email"
            name="email"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="phone">Telefone</label>
          <input
            className="text-black p-2"
            type="tel"
            name="phone"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setPhone(event.target.value)
            }
          />
        </div>

        <button>Realizar Pagamento</button>
      </form>
      {/* FIM PAGAMENTO MOCK */}
    </div>
  );
}
