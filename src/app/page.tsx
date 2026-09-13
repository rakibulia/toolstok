import { Discovery } from "@/components/home/discovery";
import { Hero } from "@/components/home/hero";
import { OpenSource } from "@/components/home/open-source";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <Hero />
      <Discovery />
      <OpenSource />
    </main>
  );
}