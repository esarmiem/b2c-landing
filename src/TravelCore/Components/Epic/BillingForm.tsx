import { SelectItem } from '@/components/ui/select.tsx'
import { UserRoundCog } from 'lucide-react'
import { type ChangeEvent, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useMasters from '@/TravelCore/Hooks/useMasters'
import { TextField } from '@/TravelCore/Components/Epic/TextFieldComponent.tsx'
import { SelectField } from '@/TravelCore/Components/Epic/SelectFieldComponent.tsx'
import { SearchCountryComponent } from '@/TravelCore/Components/Epic/SearchCountryComponent'
import { CheckboxField } from '@/TravelCore/Components/Epic/CheckboxField.tsx'
import { PhoneFieldWrapper } from '@/TravelCore/Components/Epic/PhoneFieldWrapper.tsx'
import { Masters } from '@/TravelFeatures/Traveler/model/masters_entity'
import type { CitiesItems } from '@/TravelCore/Utils/interfaces/Cities.ts'
import type { DocumentTypeItems } from '@/TravelCore/Utils/interfaces/Document.ts'
import type { Billing, PaxForm } from '@/TravelCore/Utils/interfaces/Order.ts'

interface BillingFormProps {
  onCheck?: (value: boolean) => void
  selectTraveler?: (value: number) => void
  onChangeField?: (name: string, value: string) => void
  data: Billing
  onChange: (field: string, value: string) => void
  errors?: { [p: string]: string[] }
  travelers?: PaxForm[]
}

export const BillingForm = memo(({ onCheck, selectTraveler, onChangeField, data, onChange, errors, travelers }: BillingFormProps) => {
  const { t } = useTranslation(['invoice'])
  const master = useMasters()
  const [usePassengerInfo, setUsePassengerInfo] = useState(false)
  const [citiesByCountry, setCitiesByCountry] = useState<CitiesItems[]>([])
  const [currentTraveler, setCurrentTraveler] = useState<number | null>(null)

  // Obtener ciudades activas por país
  const fetchCitiesByCountry = async () => {
    if (data.billingCountry) {
      const masters = new Masters()
      const resp = await masters.getCitiesByCountry({ countryId: data.billingCountry })

      if (resp?.data) {
        const cities = resp.data as CitiesItems[]
        const activeCities = cities.filter(city => city.estaActivo).sort((a, b) => a.descripcion.localeCompare(b.descripcion))
        setCitiesByCountry(activeCities)
      }
    } else {
      console.error('No residence country data available')
    }
  }

  useEffect(() => {
    if (data.billingCountry) {
      fetchCitiesByCountry()
    }
  }, [data.billingCountry])

  // Extraer y procesar datos maestros
  const { documentTypeOptions } = useMemo(() => {
    const documentType = (master?.documents?.data?.items ?? []) as DocumentTypeItems[]

    const activeDocumentType = documentType.filter(type => type.estaActivo)

    const documentTypeOptions = activeDocumentType.map(type => (
      <SelectItem key={type.idTipoDocumento} value={type.abreviacion}>
        {type.abreviacion} - {type.nombre}
      </SelectItem>
    ))

    return { documentTypeOptions }
  }, [master?.documents?.data?.items])

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      onChangeField?.(name, value)
      onChange(name, value)
    },
    [onChangeField, onChange]
  )

  const handleSelectChange = useCallback(
    (name: string, value: string) => {
      onChangeField?.(name, value)
      onChange(name, value)
    },
    [onChangeField, onChange]
  )

  const handleCheckChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUsePassengerInfo(event.target.checked)
      onCheck?.(event.target.checked)
    },
    [onCheck]
  )

  // Crear handlers memoizados para cada select
  const createSelectHandler = useCallback((name: string) => (value: string) => handleSelectChange(name, value), [handleSelectChange])
  const documentTypeHandler = useMemo(() => createSelectHandler('documentType'), [createSelectHandler])
  const billingCountryHandler = useMemo(() => createSelectHandler('billingCountry'), [createSelectHandler])
  const billingCityHandler = useMemo(() => createSelectHandler('billingCity'), [createSelectHandler])
  const numberTravellers = travelers?.length

  return (
    <>
      <section className="p-4">
        <h2 className="mb-4 font-bold text-lg">{t('billing-select-passenger-title')}</h2>
        <div className={`flex flex-wrap items-center gap-2 ${numberTravellers === 1 ? 'hidden' : ''}`}>
          {travelers?.map((traveller, index) => (
            <button
              key={traveller.email}
              type="button"
              onClick={() => {
                setCurrentTraveler(index)
                selectTraveler?.(index)
              }}
              className={`flex items-center p-1 rounded-lg hover:bg-gray-200 hover:text-gray-700 border-2 ${
                currentTraveler === index ? 'bg-red-500 text-white' : ''
              }`}
            >
              <UserRoundCog className="w-4 h-4" />
              <span className="text-xs font-medium ml-1">
                {t('label-traveler')} {index + 1}
              </span>
            </button>
          ))}
        </div>
        {numberTravellers === 1 && (
          <CheckboxField
            id="usePassengerInfo"
            checked={usePassengerInfo}
            onChange={handleCheckChange}
            label={t('billing-use-passenger-info')}
          />
        )}
      </section>

      <section className="space-y-4 p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <TextField
            label={t('billing-first-name')}
            id="firstName"
            name="firstName"
            value={data.firstName || ''}
            placeholder={t('billing-placeholder-first-name')}
            errors={errors}
            onChange={handleInputChange}
          />
          <TextField
            label={t('billing-last-name')}
            id="lastName"
            name="lastName"
            value={data.lastName || ''}
            placeholder={t('billing-placeholder-last-name')}
            errors={errors}
            onChange={handleInputChange}
          />
          <SelectField
            label={t('billing-document-type')}
            name="documentType"
            value={data.documentType || ''}
            placeholder={t('billing-placeholder-select-document-type')}
            options={documentTypeOptions}
            errors={errors}
            onValueChange={documentTypeHandler}
          />
          <TextField
            label={t('billing-document-number')}
            id="documentNumber"
            name="documentNumber"
            value={data.documentNumber || ''}
            placeholder={t('billing-placeholder-document-number')}
            errors={errors}
            onChange={handleInputChange}
          />
          <PhoneFieldWrapper
            label={t('billing-phone')}
            value={{ phone: data.phone || '', countryCode: data.countryCode || '' }}
            onChange={handleInputChange}
            errors={errors}
            errorsChange={onChange}
            fieldId="phone"
          />
          <TextField
            label={t('billing-email')}
            id="email"
            name="email"
            value={data.email || ''}
            placeholder={t('billing-placeholder-email')}
            type="email"
            errors={errors}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid gap-4">
          <div className="space-y-2">
            <SearchCountryComponent
              label={t('billing-country')}
              name="billingCountry"
              value={data.billingCountry || ''}
              placeholder={t('billing-placeholder-country')}
              options={master?.countries?.data?.items?.filter(country => country.estaActivo) || []}
              errors={errors}
              onValueChange={billingCountryHandler}
              type="country"
            />

            <SearchCountryComponent
              label={t('billing-city')}
              name="billingCity"
              value={data.billingCity || ''}
              placeholder={t('billing-placeholder-city')}
              options={citiesByCountry || []}
              errors={errors}
              onValueChange={billingCityHandler}
              type="city"
              disabled={!data.billingCountry}
            />
          </div>
          <div className="space-y-2">
            <TextField
              label={t('billing-address')}
              id="address"
              name="address"
              value={data.address || ''}
              placeholder={t('billing-placeholder-address')}
              errors={errors}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <TextField
              label={t('billing-additional-info')}
              id="additional"
              name="additional"
              value={data.additional || ''}
              placeholder={t('billing-placeholder-additional-info')}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </section>
    </>
  )
})
