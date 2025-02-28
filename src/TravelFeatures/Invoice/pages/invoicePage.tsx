import { Breadcrumb } from "@/TravelCore/Components/Epic/Breadcrumb.tsx";
import { GoBack } from "@/TravelCore/Components/Raw/GoBack.tsx";
import { HeaderBilling } from "@/TravelCore/Components/Epic/HeaderBilling.tsx";
import { BillingForm } from "@/TravelCore/Components/Epic/BillingForm.tsx";
import { PurchaseDetails } from "@/TravelCore/Components/Epic/PurchaseDetails.tsx";
import { ProcessButton } from "@/TravelCore/Components/Epic/ProcessButton.tsx";
import { ModalLoadingProcess } from "@/TravelCore/Components/Epic/LoadingProcess.tsx";
import useData from "@/TravelCore/Hooks/useData.ts";
import {useCallback, useState} from "react";
import {PaxForm, Billing, dataPreorder, dataIslOrder} from "@/TravelCore/Utils/interfaces/Order.ts";
import {Order} from "@/TravelFeatures/Invoice/model/order_entity.ts";
import useInvoiceState from "@/TravelFeatures/Invoice/adapterHelper";

interface loading {
    isOpen: boolean,
    title: string,
    text: string
}
export default function InvoicePage() {
    const {data, setData} = useData() || {};
    const { mapperPreorder, mapperAddOrder, mapperPayment } = useInvoiceState()
    const [billingData, setBillingData] = useState<Billing>({
        additional: '',
        address: '',
        billingCity: '',
        billingCountry: '',
        countryCode: '',
        documentNumber: '',
        documentType: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: ''
    })
    const [loading, setLoading] = useState<loading>({
        isOpen: false,
        title: '',
        text: ''
    })

    const handleChangeReuseInfo = (check: boolean) => {
        const firstTraveler: PaxForm[] = data?.travelersData || []
        if (check && firstTraveler.length > 0 ) {
            setBillingData({
                billingCountry: firstTraveler?.[0].residenceCountry?.toString(),
                countryCode: firstTraveler?.[0].countryCode,
                documentNumber: firstTraveler?.[0].documentNumber,
                documentType: firstTraveler?.[0].documentType,
                email: firstTraveler?.[0].email,
                firstName: firstTraveler?.[0].firstName,
                lastName: firstTraveler?.[0].lastName,
                phone: firstTraveler?.[0].phone,
                additional: "",
                address: "",
                billingCity: ""
            })
        } else {
            setBillingData({
                billingCountry: "",
                countryCode: "",
                documentNumber: "",
                documentType: "",
                email: "",
                firstName: "",
                lastName: "",
                phone: "",
                additional: "",
                address: "",
                billingCity: ""
            })
        }
    };

    const handleSendBilling = async () => {
        setData?.((prevData: any) => ({
                ...prevData,
                billingData: billingData
            })
        )

        setLoading({
            isOpen: true,
            title: 'Espere un momento por favor',
            text: 'Estamos preparando los datos para el pago...'
        })

        setTimeout(async () => {
            const mapPreorder: dataPreorder = mapperPreorder()

            const order = new Order();
            const respPre = await order.checkPreOrder(mapPreorder)
            if (respPre && respPre.data) {
                console.log('Respuesta de checkPreOrder: ', respPre.data)
                setLoading({
                    isOpen: true,
                    title: 'Espere un momento por favor',
                    text: 'Estamos agregando la orden de compra...'
                })
                const mapAddOrder: dataIslOrder = mapperAddOrder(respPre)

                const respAdd = await order.addOrder(mapAddOrder)
                if (respAdd && respAdd.data) {
                    console.log('Respuesta de addOrder: ', respAdd.data)
                    setLoading({
                        isOpen: true,
                        title: 'Un momento más',
                        text: 'Estamos redirigiendo a pasarela de pago...'
                    })

                    const respIP = await order.getIP()
                    if (respIP && respIP.data) {
                        console.log('Respuesta de la ip: ', respIP.data)
                        const mapPayment = mapperPayment(respIP.data, respAdd.data)
                        const respPayment = await order.payment(mapPayment)
                        console.log("respPayment: ",respPayment)
                    }
                }
            }
        }, 500)

        /*setTimeout(() => {
            console.log('redirigiendo a /invoice')
            //navigate('/invoice/billingResult'); // Navegar a la siguiente pantalla
        }, 1000);*/

    }

    // Función para manejar cambios en los campos del formulario
    const handleChangeBilling = useCallback( (name: string, value: string) => {
        setBillingData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }, [])

console.log('billingData', billingData)

        return (
        <>
            <Breadcrumb />
            <main className="max-w-6xl mx-auto p-4 my-6">
                <GoBack title="Volver a la informacion de pasajeros" url="/traveler" />
                <section className="grid md:grid-cols-[1fr_400px] gap-6 my-2">
                    <section className="space-y-4 items-center">
                        <HeaderBilling />
                        <form className="border border-gray-200 rounded-2xl space-y-4">
                            <BillingForm onChangeField={handleChangeBilling} data={billingData} onCheck={handleChangeReuseInfo}/>
                        </form>
                    </section>
                    <PurchaseDetails button={<ProcessButton onClick={handleSendBilling} />} />
                </section>
                <ModalLoadingProcess isOpen={loading.isOpen} title={loading.title} text={loading.text} />
            </main>
        </>
    );
}