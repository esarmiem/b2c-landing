import { Certifications } from '@/TravelCore/Components/Epic/Certifications.tsx'
import { Features } from '@/TravelCore/Components/Epic/Features.tsx'
import { HeroCarousel } from '@/TravelCore/Components/Epic/HeroCarousel.tsx'
import { Stats } from '@/TravelCore/Components/Epic/Stats.tsx'
import { Testimonials } from '@/TravelCore/Components/Epic/Testimonials.tsx'
import { TravelForm } from '@/TravelCore/Components/Epic/TravelForm.tsx'
import { TravelSteps } from '@/TravelCore/Components/Epic/TravelSteps.tsx'
import { WhatsAppButton } from '@/TravelCore/Components/Epic/WhatsAppButton.tsx'
import slide1 from '../../../../Assets/slide1.webp'
import slide2 from '../../../../Assets/slide2.webp'
import slide4 from '../../../../Assets/slide4.webp'
import slide5 from '../../../../Assets/slide5.webp'
import slide6 from '../../../../Assets/slide6.webp'
// import {ModalForm} from "@/TravelCore/Components/Epic/ModalForm.tsx"

const images = [slide1, slide2, slide4, slide5, slide6]

export default function HomePage() {
  //const [isOpenContactModal, setIsOpenContactModal] = useState(false)

  // const handleSearch = () => {
  //   setIsOpenContactModal(true)
  // }

  return (
    <>
      <HeroCarousel images={images} />
      <TravelForm />
      <TravelSteps />
      <Certifications />
      <Features />
      <Testimonials />
      <Stats />
      <WhatsAppButton />
      {/*<ModalForm isOpen={isOpenContactModal} toggleModal={() => setIsOpenContactModal(!isOpenContactModal)} onClick ={handleGetQuote} />*/}
    </>
  )
}