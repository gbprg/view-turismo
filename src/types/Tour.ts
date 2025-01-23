export type Tour = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  status_promotion: boolean;
};

export type Driver = {
  id: string;
  name: string;
  vehicle: string;
}

export type TourSchedule = {
  id: string;
  tour: Tour;
  driver: Driver;
  date: string;
  time: string;
  available_seats: number;
  price: number;
}