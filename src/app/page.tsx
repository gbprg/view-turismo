import { TourList } from "@/components/tourList";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold text-center my-8">Nossos Tours</h1>
      <TourList />
    </main>
  );
}
