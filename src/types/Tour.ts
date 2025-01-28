export type TourImage = {
  id: string;
  image: string;
};

export type Tour = {
  id: string;
  name: string;
  description: string;
  slug: string;
  price: number;
  image: string;
  status_promotion: boolean;
  images: TourImage[];
};

export type Driver = {
  id: string;
  name: string;
  vehicle: string;
};

export type TourSchedule = {
  id: string;
  tour: Tour;
  driver: Driver;
  date: string;
  time: string;
  available_seats: number;
  price: number;
};

export type ReservationPeople = {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  quantity: number;
};
