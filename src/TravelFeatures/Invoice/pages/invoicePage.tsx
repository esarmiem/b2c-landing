import { Breadcrumb } from '@/TravelCore/Components/Epic/Breadcrumb.tsx'
import { GoBack } from '@/TravelCore/Components/Raw/GoBack.tsx'
import { HeaderBilling } from '@/TravelCore/Components/Epic/HeaderBilling.tsx'
import { BillingForm } from '@/TravelCore/Components/Epic/BillingForm.tsx'
import { PurchaseDetails } from '@/TravelCore/Components/Epic/PurchaseDetails.tsx'
import { ProcessButton } from '@/TravelCore/Components/Epic/ProcessButton.tsx'
import { ModalLoadingProcess } from '@/TravelCore/Components/Epic/LoadingProcess.tsx'
import useData from '@/TravelCore/Hooks/useData.ts'
import { type MouseEvent, useCallback, useState } from 'react'
import type { PaxForm, Billing, dataPreorder, dataIslOrder } from '@/TravelCore/Utils/interfaces/Order.ts'
import { Order } from '@/TravelFeatures/Invoice/model/order_entity.ts'
import useInvoiceState from '@/TravelFeatures/Invoice/adapterHelper'
import { URL_EPAYCO_METHODS, SERVICE_METHODS_EPAYCO } from '@/TravelCore/Utils/constants.ts'
import { useTranslation } from 'react-i18next'
import { useUtilsValidations } from '@/TravelCore/Utils/validations/useUtilsValidations.ts'

interface loading {
  isOpen: boolean
  title: string
  text: string
}
export default function InvoicePage() {
  const { t } = useTranslation(['invoice'])
  const { data, setData } = useData() || {}
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

  const handleChangeReuseInfo = (index: number) => {
    const travelers: PaxForm[] = data?.travelersData || []
    console.log('selectedTraveler: ', travelers[index])
    if (index >= 0 && index < travelers.length) {
      const selectedTraveler = travelers[index]
      const newBillingData = {
        billingCountry: selectedTraveler?.residenceCountry?.toString() || '',
        countryCode: selectedTraveler?.countryCode || '',
        documentNumber: selectedTraveler?.documentNumber || '',
        documentType: selectedTraveler?.documentType || '',
        email: selectedTraveler?.email || '',
        firstName: selectedTraveler?.firstName || '',
        lastName: selectedTraveler?.lastName || '',
        phone: selectedTraveler?.phone || '',
        additional: '',
        address: '',
        billingCity: ''
      }

      setBillingData(newBillingData)

      for (const [field, value] of Object.entries(newBillingData)) {
        if (validationRules[field as keyof typeof validationRules]) {
          handleChangeValidate(field, value)
        }
      }
    } else {
      const emptyBillingData = {
        billingCountry: '',
        countryCode: '',
        documentNumber: '',
        documentType: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        additional: '',
        address: '',
        billingCity: ''
      }

      setBillingData(emptyBillingData)

      for (const field of Object.keys(emptyBillingData)) {
        if (validationRules[field as keyof typeof validationRules]) {
          handleChangeValidate(field, '')
        }
      }
    }
  }

  const handleChangeReuseInfoForOneTraveler = (check: boolean) => {
    const firstTraveler: PaxForm[] = data?.travelersData || []
    console.log('firstTraveler: ', firstTraveler)
    if (check && firstTraveler.length > 0) {
      const newBillingData = {
        billingCountry: firstTraveler?.[0].residenceCountry?.toString() || '',
        countryCode: firstTraveler?.[0].countryCode || '',
        documentNumber: firstTraveler?.[0].documentNumber || '',
        documentType: firstTraveler?.[0].documentType || '',
        email: firstTraveler?.[0].email || '',
        firstName: firstTraveler?.[0].firstName || '',
        lastName: firstTraveler?.[0].lastName || '',
        phone: firstTraveler?.[0].phone || '',
        additional: '',
        address: '',
        billingCity: ''
      }

      setBillingData(newBillingData)

      for (const [field, value] of Object.entries(newBillingData)) {
        if (validationRules[field as keyof typeof validationRules]) {
          handleChangeValidate(field, value)
        }
      }
    } else {
      const emptyBillingData = {
        billingCountry: '',
        countryCode: '',
        documentNumber: '',
        documentType: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        additional: '',
        address: '',
        billingCity: ''
      }

      setBillingData(emptyBillingData)

      for (const field of Object.keys(emptyBillingData)) {
        if (validationRules[field as keyof typeof validationRules]) {
          handleChangeValidate(field, '')
        }
      }
    }
  }

  const handleSendBilling = async () => {
    setData?.(prevData => ({
      ...prevData,
      billingData: billingData
    }))

    setLoading({
      isOpen: true,
      title: t('loading-title-wait'),
      text: t('loading-text-preparing-payment')
    })

    setTimeout(async () => {
      const mapPreorder: dataPreorder = mapperPreorder(billingData)

      const order = new Order()
      const respPre = await order.checkPreOrder(mapPreorder)
      if (respPre?.data) {
        console.log('Respuesta de checkPreOrder: ', respPre.data)
        setLoading({
          isOpen: true,
          title: t('loading-title-wait'),
          text: t('loading-text-adding-order')
        })
        const mapAddOrder: dataIslOrder = mapperAddOrder(respPre.data)

        const respAdd = await order.addOrder(mapAddOrder)
        if (respAdd?.data) {
          console.log('Respuesta de addOrder: ', respAdd.data)
          setLoading({
            isOpen: true,
            title: t('loading-title-one-moment'),
            text: t('loading-text-redirecting-payment')
          })

          const respIP = await order.getIP()
          if (respIP?.data) {
            console.log('Respuesta de la ip: ', respIP.data)
            const { mapPayment, transactionId } = mapperPayment(respIP.data.data, respAdd.data)

            const payloadString = JSON.stringify(mapPayment)
            const params = new URLSearchParams()
            params.append('fname', payloadString)

            const respPayment = await order.payment(params.toString(), transactionId)
            console.log('respPayment: ', respPayment, respPayment?.data, respPayment?.data?.data?.id_session)
            if (respPayment?.data.success && respPayment?.data?.data?.id_session !== '') {
              const transaction = respPayment?.data?.data?.id_session
              setData?.(prevData => ({
                ...prevData,
                epaycoTx: transaction
              }))
              window.location.href = `${URL_EPAYCO_METHODS}/${SERVICE_METHODS_EPAYCO}?transaction=${transaction}`
            } else {
              alert('Ha ocurrido un error al procesar la orden con la pasarela de pago')
            }
          }
        }
      }
    }, 500)
  }

  const validationRules = {
    firstName: { required: true },
    lastName: { required: true },
    documentType: { required: true },
    documentNumber: { required: true },
    phone: { required: true },
    email: { required: true, email: true },
    billingCountry: { required: true },
    billingCity: { required: true },
    address: { required: true }
  }

  const { errors, handleChangeValidate, validateFormData } = useUtilsValidations(validationRules)

  // Función para manejar cambios en los campos del formulario
  const handleChangeBilling = useCallback(
    (name: string, value: string) => {
      setBillingData(prevData => ({
        ...prevData,
        [name]: value
      }))

      handleChangeValidate(name, value)
    },
    [handleChangeValidate]
  )

  const handleChange = (field: string, value: string) => {
    handleChangeValidate(field, value)
  }

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (!validateFormData()) {
      return
    }
    handleSendBilling()
  }

  return (
    <>
      <Breadcrumb />
      <main className="max-w-6xl mx-auto p-4 my-6">
        <GoBack title={t('title-goback')} url="/traveler" />
        <section className="grid md:grid-cols-[1fr_400px] gap-6 my-2">
          <section className="space-y-4 items-center">
            <HeaderBilling />
            <form className="border border-gray-200 rounded-2xl space-y-4">
              <BillingForm
                onChangeField={handleChangeBilling}
                data={billingData}
                onCheck={handleChangeReuseInfoForOneTraveler}
                selectTraveler={handleChangeReuseInfo}
                errors={errors}
                onChange={handleChange}
                travelers={data?.travelersData}
              />
            </form>
          </section>
          <PurchaseDetails button={<ProcessButton onClick={handleSubmit} />} />
        </section>
        <ModalLoadingProcess isOpen={loading.isOpen} title={loading.title} text={loading.text} />
      </main>
    </>
  )
}
