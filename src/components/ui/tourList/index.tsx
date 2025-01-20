"use client"

import { TourService } from "@/services/tourService/route"
import { useQuery } from "@tanstack/react-query"

import Image from "next/image"
import { Card } from "../Card"
import { CardHeader } from "../CardHeader"
import { CardTitle } from "../CardTitle"
import { CardContent } from "../CardContent"

export const TourList = () => {
  const { data: tours, isLoading, error } = useQuery({
    queryKey: ["tours"],
    queryFn: TourService.getAllTours
  })

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
        </Card>
      ))}
    </div>
  )
}