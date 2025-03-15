import { memo } from 'react'
import { Breadcrumb } from '@/TravelCore/Components/Epic/Breadcrumb'
import { EmergencyContact } from '@/TravelCore/Components/Epic/EmergencyContact'
import { HeaderTraveler } from '@/TravelCore/Components/Epic/HeaderTraveler'
import { PurchaseDetails } from '@/TravelCore/Components/Epic/PurchaseDetails'
import { TravelerForm } from '@/TravelCore/Components/Epic/TravelerForm'
import { ContinuarButton } from '@/TravelCore/Components/Raw/ContinuarButton'
import { GoBack } from '@/TravelCore/Components/Raw/GoBack'
import Loader from '@/TravelCore/Components/Raw/Loader'
import { useTravelForm } from '../stateHelper/index.ts'

const MemoizedTravelerForm = memo(TravelerForm)
const MemoizedEmergencyContact = memo(EmergencyContact)
const MemoizedPurchaseDetails = memo(PurchaseDetails)
const MemoizedHeaderTraveler = memo(HeaderTraveler)

/**
 * TravelForm
 *
 * Spanish:
 * Componente que renderiza el formulario de viaje. Este componente integra varios subcomponentes:
 * - Breadcrumb: muestra la ruta de navegación.
 * - HeaderTraveler: visualiza la información de los viajeros.
 * - TravelerForm: formulario individual para cada viajero.
 * - EmergencyContact: formulario para el contacto de emergencia.
 * - PurchaseDetails: muestra los detalles de la compra, incluyendo un botón para continuar.
 */
export default function TravelForm() {
  const {
    travelers,
    travelersData,
    emergencyContact,
    isLoading,
    errors,
    handleChangeTravelers,
    handleChangeEmergency,
    handleChangeValidate,
    handleSubmit,
    t
  } = useTravelForm()

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100">
          <Loader />
        </div>
      )}

      <Breadcrumb />

      <main className="max-w-6xl mx-auto p-4 my-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <GoBack title={t('label-back-to-coverages')} url="quote/travel" />

        <section className="grid md:grid-cols-[1fr_400px] gap-6 my-2">
          <section className="space-y-4 items-center">
            <MemoizedHeaderTraveler traveler={travelers} />
            <form className="border border-gray-200 rounded-2xl space-y-4">
              {travelers.map(traveler => (
                <MemoizedTravelerForm
                  key={`traveler-${traveler?.id}`}
                  traveler={traveler}
                  onChangeField={handleChangeTravelers}
                  dataTraveler={travelersData[traveler?.id] || {}}
                  onChange={handleChangeValidate}
                  errors={errors}
                />
              ))}
              <MemoizedEmergencyContact
                data={emergencyContact}
                onChangeField={handleChangeEmergency}
                errors={errors}
                onChange={handleChangeValidate}
              />
            </form>
          </section>
          <MemoizedPurchaseDetails button={<ContinuarButton onClick={handleSubmit} />} />
        </section>
      </main>
    </div>
  )
}
