import { Certifications } from '@/TravelCore/Components/Epic/Certifications.tsx'
import { Features } from '@/TravelCore/Components/Epic/Features.tsx'
import { HeroCarousel } from '@/TravelCore/Components/Epic/HeroCarousel.tsx'
import { LoadingScreen } from '@/TravelCore/Components/Epic/LoadingScreen.tsx'
import { Stats } from '@/TravelCore/Components/Epic/Stats.tsx'
import { Testimonials } from '@/TravelCore/Components/Epic/Testimonials.tsx'
import { TravelForm } from '@/TravelCore/Components/Epic/TravelForm.tsx'
import { TravelSteps } from '@/TravelCore/Components/Epic/TravelSteps.tsx'
import { WhatsAppButton } from '@/TravelCore/Components/Epic/WhatsAppButton.tsx'
import useData from '@/TravelCore/Hooks/useData.ts'
import type { dataOrder } from '@/TravelCore/Utils/interfaces/Order.ts'
import useHomeState from '@/TravelFeatures/Home/stateHelper'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
/*
import {ModalForm} from "@/TravelCore/Components/Epic/ModalForm.tsx";
*/
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const { t } = useTranslation(['home'])

  const { HandleGetOrder, isDataOrderValid } = useHomeState()
  const { data } = useData() || {}
  const navigate = useNavigate()
  const [isLoadingOrders, setIsLoadingOrders] = useState(false)
  /*
      const [isOpenContactModal, setIsOpenContactModal] = useState(false);
    */

  const images = ['../../../../Assets/slide 1.webp', '../../../../Assets/slide 2.webp', '../../../../Assets/slide 3.webp']

  /*  const handleSearch = () => {
    //Llamar al modal
    setIsOpenContactModal(true)
  };*/

  const handleGetQuote = async () => {
    setIsLoadingOrders(true)
    try {
      if (!data?.payloadOrder || !isDataOrderValid(data?.payloadOrder as dataOrder)) {
        throw new Error('Invalid order data')
      }

      const resp = await HandleGetOrder(data.payloadOrder as dataOrder)

      if (resp && resp > 0) {
        setTimeout(() => {
          navigate('/quote/travel')
        }, 1000)
      } else {
        throw new Error('Invalid order response')
      }
    } catch (error) {
      setIsLoadingOrders(false)
      console.error('Error processing quote:', error)
    }
  }

  if (isLoadingOrders) {
    return <LoadingScreen message={t('label-title-loader')} subMessage={t('label-text-loader')} />
  }

  return (
    <>
      <HeroCarousel images={images} />
      <TravelForm onClick={handleGetQuote} />
      <TravelSteps />
      <Certifications />
      <Features />
      <Testimonials />
      <Stats />
      <WhatsAppButton />
      {/*
        <ModalForm isOpen={isOpenContactModal} toggleModal={() => setIsOpenContactModal(!isOpenContactModal)} onClick ={handleGetQuote} />
*/}
    </>
  )
}
