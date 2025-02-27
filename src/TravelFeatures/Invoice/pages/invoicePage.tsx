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

export default function InvoicePage() {
    const {data, setData} = useData() || {};
    const { mapperPreorder, mapperAddOrder, mapperPayment } = useInvoiceState()
    const [billingData, setBillingData] = useState<Billing>({})
    const [loading, setLoading] = useState<object>({
        isOpen: false,
        title: '',
        text: ''
    })

    const handleChangeReuseInfo = (check: boolean) => {
        if (check) {
            const firstTraveler: PaxForm = data.travelersData[0]
            setBillingData({
                billingCountry: firstTraveler.residenceCountry.toString(),
                countryCode: firstTraveler.countryCode,
                documentNumber: firstTraveler.documentNumber,
                documentType: firstTraveler.documentType,
                email: firstTraveler.email,
                firstName: firstTraveler.firstName,
                lastName: firstTraveler.lastName,
                phone: firstTraveler.phone
            })
        } else {
            setBillingData({})
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
                setLoading({
                    isOpen: true,
                    title: 'Espere un momento por favor',
                    text: 'Estamos agregando la orden de compra...'
                })
                const mapAddOrder: dataIslOrder = mapperAddOrder(respPre)

                const respAdd = await order.addOrder(mapAddOrder)
                if (respAdd && respAdd.data) {
                    setLoading({
                        isOpen: true,
                        title: 'Un momento más',
                        text: 'Estamos redirigiendo a pasarela de pago...'
                    })

                    const respIP = await order.getIP()
                    if (respIP && respIP.data) {
                        //const mapPayment = mapperPayment()
                        //const respPayment = await order.payment(mapPayment)
                        //TODO: consumir servicio epayco y configurarle la redireccion
                    }
                }
            }
        }, 500)

        /*setTimeout(() => {
            console.log('redirigiendo a /invoice')
            //navigate('/invoice/billingResult'); // Navegar a la siguiente pantalla
        }, 1000);*/

    }

    const handleChangeBilling = useCallback( (name: string, value: string) => {
        setBillingData((prevData) => ({
            ...prevData,
            billingData: billingData,
        }));
        alert('Se envia a pasarela de pagos ePayco.... En proceso');
    };

    // Función para manejar cambios en los campos del formulario
    const handleChangeBilling = useCallback((index: number, name: string, value: string) => {
        setBillingData((prevData) => {
            const newData = [...prevData];
            newData[index] = {
                ...newData[index],
                [name]: value,
            };
            return newData;
        });
    }, []);

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