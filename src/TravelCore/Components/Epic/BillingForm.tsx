import { Input } from '@/components/ui/input.tsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx'
//import { PhoneNumberForm } from "@/TravelCore/Components/Epic/PhoneNumberForm.tsx";
import { PhoneNumberForm2 } from '@/TravelCore/Components/Epic/PhoneNumberForm2.tsx'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useMasters from '@/TravelCore/Hooks/useMasters'
import type { CitiesItems } from '@/TravelCore/Utils/interfaces/Cities.ts'
import type { DocumentTypeItems } from '@/TravelCore/Utils/interfaces/Document.ts'
import type { Billing } from '@/TravelCore/Utils/interfaces/Order.ts'
import type { CountriesItems } from '@/TravelCore/Utils/interfaces/countries.ts'

interface BillingFormProps {
  onCheck?: (value: boolean) => void
  onChangeField?: (name: string, value: string) => void
  data: Billing
  onChange: (field: string, value: string) => void
  errors?: { [p: string]: string[] }
}

export function BillingForm({ onCheck, onChangeField, data, onChange, errors }: BillingFormProps) {
  const { t } = useTranslation(['invoice'])
  const [usePassengerInfo, setUsePassengerInfo] = useState(false)
  const master = useMasters()

  const cities = (master?.cities?.data ?? []) as CitiesItems[]
  const documentType = (master?.documents?.data?.items ?? []) as DocumentTypeItems[]
  const countries = (master?.countries?.data?.items ?? []) as CountriesItems[]

  const activeCities = cities
    .filter(city => city.estaActivo)
    .slice()
    .sort((a, b) => a.descripcion.localeCompare(b.descripcion))

  const activeDocumentType = documentType.filter(type => type.estaActivo)

  const activeCountries = countries.filter(country => country.estaActivo)

  const citiesOptions = activeCities.map(city => (
    <SelectItem key={city.idCiudad} value={city.idCiudad.toString()}>
      {city.descripcion}
    </SelectItem>
  ))

  const documentTypeOptions = activeDocumentType.map(type => (
    <SelectItem key={type.idTipoDocumento} value={type.abreviacion}>
      {type.abreviacion} - {type.nombre}
    </SelectItem>
  ))

  const countriesOptions = activeCountries.map(country => (
    <SelectItem key={country.idPais} value={country.idPais.toString()}>
      {country.descripcion}
    </SelectItem>
  ))

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      onChangeField?.(name, value)
      onChange(name, value)
    },
    [onChangeField, onChange]
  )

  const handleSelectChange = React.useCallback(
    (name: string, value: string) => {
      onChangeField?.(name, value)
      onChange(name, value)
    },
    [onChangeField, onChange]
  )

  const handleCheckChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsePassengerInfo(event.target.checked)
      onCheck?.(event.target.checked)
    },
    [onCheck]
  )

  return (
    <>
      <section className="p-4">
        <h2 className="mb-4 font-bold text-lg">{t('billing-select-passenger-title')}</h2>
        <div className="flex items-center space-x-2">
          <Input
            type="checkbox"
            id="usePassengerInfo"
            checked={usePassengerInfo}
            onChange={handleCheckChange}
            className="h-3 w-3 rounded border-gray-300"
          />
          <label htmlFor="usePassengerInfo" className="text-sm font-medium text-gray-700">
            {t('billing-use-passenger-info')}
          </label>
        </div>
      </section>

      <section className="space-y-4 p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.firstName && errors.firstName.length > 0 ? 'text-red-500' : ''}`}
            >
              {t('billing-first-name')}
            </label>
            <Input
              name="firstName"
              value={data.firstName || ''}
              placeholder={t('billing-placeholder-first-name')}
              className={`rounded-3xl border-gray-300 p-6 ${errors?.firstName && errors.firstName.length > 0 ? 'border-red-500' : ''}`}
              onChange={handleInputChange}
            />
            {errors?.firstName && <span className="text-xs text-red-500">{errors.firstName}</span>}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.lastName && errors.lastName.length > 0 ? 'text-red-500' : ''}`}
            >
              {t('billing-last-name')}
            </label>
            <Input
              name="lastName"
              value={data.lastName || ''}
              placeholder={t('billing-placeholder-last-name')}
              className={`rounded-3xl border-gray-300 p-6 ${errors?.lastName && errors.lastName.length > 0 ? 'border-red-500' : ''}`}
              onChange={handleInputChange}
            />
            {errors?.lastName && <span className="text-xs text-red-500">{errors.lastName}</span>}
          </div>
          <div>
            <label
              htmlFor="documentType"
              className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.documentType && errors.documentType.length > 0 ? 'text-red-500' : ''}`}
            >
              {t('billing-document-type')}
            </label>
            <Select
              name="documentType"
              value={data.documentType || ''}
              onValueChange={(value: string) => handleSelectChange('documentType', value)}
            >
              <SelectTrigger
                className={`rounded-3xl border-gray-300 p-6 ${errors?.documentType && errors.documentType.length > 0 ? 'border-red-500' : ''}`}
              >
                <SelectValue placeholder={t('billing-placeholder-select-document-type')} />
              </SelectTrigger>
              <SelectContent>{documentTypeOptions}</SelectContent>
            </Select>
            {errors?.documentType && <span className="text-xs text-red-500">{errors.documentType}</span>}
          </div>
          <div>
            <label
              htmlFor="documentNumber"
              className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.documentNumber && errors.documentNumber.length > 0 ? 'text-red-500' : ''}`}
            >
              {t('billing-document-number')}
            </label>
            <Input
              name="documentNumber"
              value={data.documentNumber || ''}
              placeholder={t('billing-placeholder-document-number')}
              className={`rounded-3xl border-gray-300 p-6 ${errors?.documentNumber && errors.documentNumber.length > 0 ? 'border-red-500' : ''}`}
              onChange={handleInputChange}
            />
            {errors?.documentNumber && <span className="text-xs text-red-500">{errors.documentNumber}</span>}
          </div>
          <PhoneNumberForm2
            celType={t('billing-phone')}
            value={{ phone: data.phone, countryCode: data.countryCode }}
            onChange={handleInputChange}
            errors={errors}
            errorsChange={onChange}
            fieldId="phone"
          />
          <div>
            <label
              htmlFor="email"
              className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.email && errors.email.length > 0 ? 'text-red-500' : ''}`}
            >
              {t('billing-email')}
            </label>
            <Input
              name="email"
              value={data.email || ''}
              type="email"
              placeholder={t('billing-placeholder-email')}
              className={`rounded-3xl border-gray-300 p-6 ${errors?.email && errors.email.length > 0 ? 'border-red-500' : ''}`}
              onChange={handleInputChange}
            />
            {errors?.email && <span className="text-xs text-red-500">{errors.email}</span>}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="space-y-2">
            <label
              htmlFor="billingCountry"
              className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.billingCountry && errors.billingCountry.length > 0 ? 'text-red-500' : ''}`}
            >
              {t('billing-country')}
            </label>
            <Select
              name="billingCountry"
              value={data.billingCountry || ''}
              onValueChange={value => handleSelectChange('billingCountry', value)}
            >
              <SelectTrigger
                className={`rounded-3xl border-gray-300 p-6 ${errors?.billingCountry && errors.billingCountry.length > 0 ? 'border-red-500' : ''}`}
              >
                <SelectValue placeholder={t('billing-placeholder-country')} />
              </SelectTrigger>
              <SelectContent>{countriesOptions}</SelectContent>
            </Select>
            {errors?.billingCountry && <span className="text-xs text-red-500">{errors.billingCountry}</span>}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="billingCity"
              className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.billingCity && errors.billingCity.length > 0 ? 'text-red-500' : ''}`}
            >
              {t('billing-city')}
            </label>
            <Select name="billingCity" value={data.billingCity || ''} onValueChange={value => handleSelectChange('billingCity', value)}>
              <SelectTrigger
                className={`rounded-3xl border-gray-300 p-6 ${errors?.billingCity && errors.billingCity.length > 0 ? 'border-red-500' : ''}`}
              >
                <SelectValue placeholder={t('billing-placeholder-city')} />
              </SelectTrigger>
              <SelectContent>{citiesOptions}</SelectContent>
            </Select>
            {errors?.billingCity && <span className="text-xs text-red-500">{errors.billingCity}</span>}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="address"
              className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.address && errors.address.length > 0 ? 'text-red-500' : ''}`}
            >
              {t('billing-address')}
            </label>
            <Input
              type="text"
              id="address"
              name="address"
              value={data.address || ''}
              placeholder={t('billing-placeholder-address')}
              required
              className={`w-full rounded-3xl border border-gray-300 text-base p-6 ${errors?.address && errors.address.length > 0 ? 'border-red-500' : ''}`}
              onChange={handleInputChange}
            />
            {errors?.address && <span className="text-xs text-red-500">{errors.address}</span>}
          </div>
          <div className="space-y-2">
            <label htmlFor="additional" className="block font-semibold text-gray-500 text-sm mb-1">
              {t('billing-additional-info')}
            </label>
            <Input
              type="text"
              id="additional"
              name="additional"
              value={data.additional || ''}
              placeholder={t('billing-placeholder-additional-info')}
              className="w-full rounded-3xl border border-gray-300 text-base p-6"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </section>
    </>
  )
}
