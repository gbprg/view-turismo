"use client"

import Image from "next/image"
import Card from "../ui/Card"
import CardHeader from "../ui/CardHeader"
import CardTitle from "../ui/CardTitle"
import CardContent from "../ui/CardContent"
import { ButtonCard } from "../ui/ButtonCard"
import Link from "next/link"
import { useTourQuery } from "@/hooks/useTourQuery"

export const TourList = () => {
  const { data: tours, isLoading, error } = useTourQuery.useGetAllTours();
  if (isLoading) {
    return <div className="text-center">Carregando tours...</div>
  }

  if (error) {
    return <div className="text-red-500">Erro ao carregar os tours.</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {tours?.map((tour) => (
        <Card key={tour.id}>
          <div className="relative w-full h-48">
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              className="object-cover rounded-t-lg"
            />
            {tour.status_promotion && (
              <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
                Promoção
              </span>
            )}
          </div>
          <CardHeader>
            <CardTitle>{tour.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4 line-clamp-3">{tour.description}</p>
            <p className="text-lg font-bold">
              R$ {tour.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
          <Link href={`/tour/${tour.id}`}>
            <ButtonCard className="text-white text-center ">
              Comprar
            </ButtonCard>
          </Link>
        </Card>
      ))}
    </div>
  )
}