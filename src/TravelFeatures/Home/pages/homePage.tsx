import {Certifications} from "@/TravelCore/Components/Epic/Certifications.tsx";
import {Features} from "@/TravelCore/Components/Epic/Features.tsx";
import {Testimonials} from "@/TravelCore/Components/Epic/Testimonials.tsx";
import {Stats} from "@/TravelCore/Components/Epic/Stats.tsx";
import {HeroCarousel} from "@/TravelCore/Components/Epic/HeroCarousel.tsx";
import {TravelForm} from "@/TravelCore/Components/Epic/TravelForm.tsx";
import {TravelSteps} from "@/TravelCore/Components/Epic/TravelSteps.tsx";
import useHomeState from "@/TravelFeatures/Home/stateHelper";

export default function HomePage () {
  const { order, getOrder } = useHomeState()

  const images = [
    '../../../../Assets/slide 1.webp',
    '../../../../Assets/slide 2.webp',
    '../../../../Assets/slide 3.webp'
  ];

  console.log("Order: ", order)

  return (
      <>
        <HeroCarousel images={images} />
        <TravelForm getOrder={getOrder} />
        <TravelSteps />
        <Certifications />
        <Features />
        <Testimonials />
        <Stats />
      </>
  );
}