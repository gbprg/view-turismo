import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TourImageCarouselProps {
  images: string[];
  title: string;
}

export const Carousel = ({ images, title }: TourImageCarouselProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="w-full h-[400px] rounded-lg overflow-hidden"
    >
      {images.map((imageUrl, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={`${title} - Imagem ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}