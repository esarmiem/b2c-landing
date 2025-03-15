import { SelectItem } from '@/components/ui/select.tsx'
import { type ChangeEvent, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useMasters from '@/TravelCore/Hooks/useMasters'
import { TextField } from '@/TravelCore/Components/Epic/TextFieldComponent.tsx'
import { SelectField } from '@/TravelCore/Components/Epic/SelectFieldComponent.tsx'
import { CheckboxField } from '@/TravelCore/Components/Epic/CheckboxField.tsx'
import { PhoneFieldWrapper } from '@/TravelCore/Components/Epic/PhoneFieldWrapper.tsx'
import type { CitiesItems } from '@/TravelCore/Utils/interfaces/Cities.ts'
import type { DocumentTypeItems } from '@/TravelCore/Utils/interfaces/Document.ts'
import type { Billing } from '@/TravelCore/Utils/interfaces/Order.ts'
import type { CountriesItems } from '@/TravelCore/Utils/interfaces/countries.ts'
//import useData from '@/TravelCore/Hooks/useData.ts'

interface BillingFormProps {
  onCheck?: (value: boolean) => void
  onChangeField?: (name: string, value: string) => void
  data: Billing
  onChange: (field: string, value: string) => void
  errors?: { [p: string]: string[] }
}

export const BillingForm = memo(({ onCheck, onChangeField, data, onChange, errors }: BillingFormProps) => {
  const { t } = useTranslation(['invoice'])
  const [usePassengerInfo, setUsePassengerInfo] = useState(false)
  const [citiesByCountry, setCitiesByCountry] = useState<CitiesItems[]>([])
  const [isCities, setIsCities] = useState(false)
  const master = useMasters()

  // Extraer y procesar datos maestros
  const { documentTypeOptions, countriesOptions, activeCities } = useMemo(() => {
    const cities = (master?.cities?.data ?? []) as CitiesItems[]
    const documentType = (master?.documents?.data?.items ?? []) as DocumentTypeItems[]
    const countries = (master?.countries?.data?.items ?? []) as CountriesItems[]

    const activeCities = cities
      .filter(city => city.estaActivo)
      .slice()
      .sort((a, b) => a.descripcion.localeCompare(b.descripcion))

    const activeDocumentType = documentType.filter(type => type.estaActivo)
    const activeCountries = countries.filter(country => country.estaActivo)

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

    return { documentTypeOptions, countriesOptions, activeCities }
  }, [master?.cities?.data, master?.documents?.data?.items, master?.countries?.data?.items])

  // Efecto para filtrar ciudades cuando cambia el país seleccionado
  useEffect(() => {
    if (activeCities && data.billingCountry) {
      const filtered = activeCities.filter(city => city.idPais === Number.parseInt(data.billingCountry || '0'))
      setCitiesByCountry(filtered)
      filtered.length > 0 ? setIsCities(false) : setIsCities(true)
    } else {
      // Si no hay país seleccionado, inicializar con array vacío
      setCitiesByCountry([])
    }
  }, [data.billingCountry, activeCities])

  // Opciones de ciudades como useMemo separado
  const citiesOptions = useMemo(() => {
    return (citiesByCountry || []).map(city => (
      <SelectItem key={city.idCiudad} value={city.idCiudad.toString()}>
        {city.descripcion}
      </SelectItem>
    ))
  }, [citiesByCountry])

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

  return (
    <>
      <section className="p-4">
        <h2 className="mb-4 font-bold text-lg">{t('billing-select-passenger-title')}</h2>
        <CheckboxField
          id="usePassengerInfo"
          checked={usePassengerInfo}
          onChange={handleCheckChange}
          label={t('billing-use-passenger-info')}
        />
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
            <SelectField
              label={t('billing-country')}
              name="billingCountry"
              value={data.billingCountry || ''}
              placeholder={t('billing-placeholder-country')}
              options={countriesOptions}
              errors={errors}
              onValueChange={billingCountryHandler}
            />
          </div>
          <div className="space-y-2">
            <SelectField
              label={t('billing-city')}
              name="billingCity"
              value={data.billingCity || ''}
              placeholder={t('billing-placeholder-city')}
              options={citiesOptions}
              errors={errors}
              onValueChange={billingCityHandler}
              isCities={isCities}
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

// import { Input } from '@/components/ui/input.tsx'
// import { SelectItem } from '@/components/ui/select.tsx'
// import { PhoneNumberForm2 } from '@/TravelCore/Components/Epic/PhoneNumberForm2.tsx'
// import React, { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import useMasters from '@/TravelCore/Hooks/useMasters'
// import { TextField } from '@/TravelCore/Components/Epic/TextFieldComponent.tsx'
// import { SelectField } from '@/TravelCore/Components/Epic/SelectFieldComponent.tsx'
// import type { CitiesItems } from '@/TravelCore/Utils/interfaces/Cities.ts'
// import type { DocumentTypeItems } from '@/TravelCore/Utils/interfaces/Document.ts'
// import type { Billing } from '@/TravelCore/Utils/interfaces/Order.ts'
// import type { CountriesItems } from '@/TravelCore/Utils/interfaces/countries.ts'
//
// interface BillingFormProps {
//   onCheck?: (value: boolean) => void
//   onChangeField?: (name: string, value: string) => void
//   data: Billing
//   onChange: (field: string, value: string) => void
//   errors?: { [p: string]: string[] }
// }
//
// export function BillingForm({ onCheck, onChangeField, data, onChange, errors }: BillingFormProps) {
//   const { t } = useTranslation(['invoice'])
//   const [usePassengerInfo, setUsePassengerInfo] = useState(false)
//   const master = useMasters()
//
//   const cities = (master?.cities?.data ?? []) as CitiesItems[]
//   const documentType = (master?.documents?.data?.items ?? []) as DocumentTypeItems[]
//   const countries = (master?.countries?.data?.items ?? []) as CountriesItems[]
//
//   const activeCities = cities
//     .filter(city => city.estaActivo)
//     .slice()
//     .sort((a, b) => a.descripcion.localeCompare(b.descripcion))
//
//   const activeDocumentType = documentType.filter(type => type.estaActivo)
//
//   const activeCountries = countries.filter(country => country.estaActivo)
//
//   const citiesOptions = activeCities.map(city => (
//     <SelectItem key={city.idCiudad} value={city.idCiudad.toString()}>
//       {city.descripcion}
//     </SelectItem>
//   ))
//
//   const documentTypeOptions = activeDocumentType.map(type => (
//     <SelectItem key={type.idTipoDocumento} value={type.abreviacion}>
//       {type.abreviacion} - {type.nombre}
//     </SelectItem>
//   ))
//
//   const countriesOptions = activeCountries.map(country => (
//     <SelectItem key={country.idPais} value={country.idPais.toString()}>
//       {country.descripcion}
//     </SelectItem>
//   ))
//
//   const handleInputChange = useCallback(
//     (e: ChangeEvent<HTMLInputElement>) => {
//       const { name, value } = e.target
//       onChangeField?.(name, value)
//       onChange(name, value)
//     },
//     [onChangeField, onChange]
//   )
//
//   const handleSelectChange = useCallback(
//     (name: string, value: string) => {
//       onChangeField?.(name, value)
//       onChange(name, value)
//     },
//     [onChangeField, onChange]
//   )
//
//   const handleCheckChange = useCallback(
//     (event: ChangeEvent<HTMLInputElement>) => {
//       setUsePassengerInfo(event.target.checked)
//       onCheck?.(event.target.checked)
//     },
//     [onCheck]
//   )
//
//   return (
//     <>
//       <section className="p-4">
//         <h2 className="mb-4 font-bold text-lg">{t('billing-select-passenger-title')}</h2>
//         <div className="flex items-center space-x-2">
//           <Input
//             type="checkbox"
//             id="usePassengerInfo"
//             checked={usePassengerInfo}
//             onChange={handleCheckChange}
//             className="h-3 w-3 rounded border-gray-300"
//           />
//           <label htmlFor="usePassengerInfo" className="text-sm font-medium text-gray-700">
//             {t('billing-use-passenger-info')}
//           </label>
//         </div>
//       </section>
//
//       <section className="space-y-4 p-4">
//         <div className="grid md:grid-cols-2 gap-4">
//           <TextField
//             label={t('billing-first-name')}
//             id="firstName"
//             name="firstName"
//             value={data.firstName || ''}
//             placeholder={t('billing-placeholder-first-name')}
//             errors={errors}
//             onChange={handleInputChange}
//           />
//           <TextField
//             label={t('billing-last-name')}
//             id="lastName"
//             name="lastName"
//             value={data.lastName || ''}
//             placeholder={t('billing-placeholder-last-name')}
//             errors={errors}
//             onChange={handleInputChange}
//           />
//           <SelectField
//             label={t('billing-document-type')}
//             name="documentType"
//             value={data.documentType || ''}
//             placeholder={t('billing-placeholder-select-document-type')}
//             options={documentTypeOptions}
//             errors={errors}
//             onValueChange={value => handleSelectChange('documentType', value)}
//           />
//           <TextField
//             label={t('billing-document-number')}
//             id="documentNumber"
//             name="documentNumber"
//             value={data.documentNumber || ''}
//             placeholder={t('billing-placeholder-document-number')}
//             errors={errors}
//             onChange={handleInputChange}
//           />
//           <PhoneNumberForm2
//             celType={t('billing-phone')}
//             value={{ phone: data.phone, countryCode: data.countryCode }}
//             onChange={handleInputChange}
//             errors={errors}
//             errorsChange={onChange}
//             fieldId="phone"
//           />
//           <TextField
//             label={t('billing-email')}
//             id="email"
//             name="email"
//             value={data.email || ''}
//             placeholder={t('billing-placeholder-email')}
//             type="email"
//             errors={errors}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="grid gap-4">
//           <div className="space-y-2">
//             <SelectField
//               label={t('billing-country')}
//               name="billingCountry"
//               value={data.billingCountry || ''}
//               placeholder={t('billing-placeholder-country')}
//               options={countriesOptions}
//               errors={errors}
//               onValueChange={value => handleSelectChange('billingCountry', value)}
//             />
//           </div>
//           <div className="space-y-2">
//             <SelectField
//               label={t('billing-city')}
//               name="billingCity"
//               value={data.billingCity || ''}
//               placeholder={t('billing-placeholder-city')}
//               options={citiesOptions}
//               errors={errors}
//               onValueChange={value => handleSelectChange('billingCity', value)}
//             />
//           </div>
//           <div className="space-y-2">
//             <TextField
//               label={t('billing-address')}
//               id="address"
//               name="address"
//               value={data.address || ''}
//               placeholder={t('billing-placeholder-address')}
//               errors={errors}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="space-y-2">
//             <TextField
//               label={t('billing-additional-info')}
//               id="additional"
//               name="additional"
//               value={data.additional || ''}
//               placeholder={t('billing-placeholder-additional-info')}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }
