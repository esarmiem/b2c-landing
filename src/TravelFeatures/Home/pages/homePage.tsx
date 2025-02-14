import {Certifications} from "@/TravelCore/Components/Epic/Certifications.tsx";
import {Features} from "@/TravelCore/Components/Epic/Features.tsx";
import {Testimonials} from "@/TravelCore/Components/Epic/Testimonials.tsx";
import {Stats} from "@/TravelCore/Components/Epic/Stats.tsx";
import {HeroCarousel} from "@/TravelCore/Components/Epic/HeroCarousel.tsx";
import {TravelForm} from "@/TravelCore/Components/Epic/TravelForm.tsx";
import {TravelSteps} from "@/TravelCore/Components/Epic/TravelSteps.tsx";
import useHomeState from "@/TravelFeatures/Home/stateHelper";
import {WhatsAppButton} from "@/TravelCore/Components/Epic/WhatsAppButton.tsx";
/*
import {ModalForm} from "@/TravelCore/Components/Epic/ModalForm.tsx";
*/
import {useNavigate} from "react-router-dom";
import {dataOrder} from "@/TravelCore/Utils/interfaces/Order.ts";
import useData from "@/TravelCore/Hooks/useData.ts";

export default function HomePage () {
  const { HandleGetOrder } = useHomeState()
  const {data} = useData() || {}
  const navigate = useNavigate();
/*
  const [isOpenContactModal, setIsOpenContactModal] = useState(false);
*/

  const images = [
    '../../../../Assets/slide 1.webp',
    '../../../../Assets/slide 2.webp',
    '../../../../Assets/slide 3.webp'
  ];

  console.log("Order: ", data?.responseOrder)

 console.log("data", data?.payloadOrder)

/*  const handleSearch = () => {
    //Llamar al modal
    setIsOpenContactModal(true)
  };*/

  const handleGetQuote = async () => {
  console.log('click en handleGetQuote ', isDataOrderValid(data?.payloadOrder))
    //Validate if data is entire fill
    setTimeout(async () => {
      if (data && isDataOrderValid(data?.payloadOrder)) {
        const resp: any = await HandleGetOrder(data.payloadOrder)
        if (resp && resp > 0) {
          navigate('/quote/travel'); // Navegar a la siguiente pantalla
        }
      }
    }, 2000);
  };


 //TODO: Trasladar esta funcion al utils
  const isDataOrderValid = (order: dataOrder): boolean => {
    return Object.values(order).every(value => {
      if (value === null || value === undefined) {
        console.log('validacion 1')
        return false;
      }
      if (typeof value === 'string' && value.trim() === '') {
        console.log('validacion 2')
        return false;
      }
      if (Object.keys(order).length !== 11) {
        console.log('validacion 3', Object.keys(order).length)
        return false;
      }
      return true;
    });
  }

  return (
      <>
        <HeroCarousel images={images} />
        <TravelForm onClick ={handleSearch} />
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
  );
}