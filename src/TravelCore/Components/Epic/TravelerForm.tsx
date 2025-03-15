import { type ChangeEvent, memo, useCallback, useMemo, useState } from 'react'
import { SquareUser } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { SelectItem } from '@/components/ui/select.tsx'
import { useTranslation } from 'react-i18next'
import type { PaxForm } from '@/TravelCore/Utils/interfaces/Order.ts'
import useMasters from '@/TravelCore/Hooks/useMasters'
import type { CountriesItems } from '@/TravelCore/Utils/interfaces/countries.ts'
import type { DocumentTypeItems } from '@/TravelCore/Utils/interfaces/Document.ts'
import { calculateAndCompareAge } from '@/TravelCore/Utils/dates.ts'
import { PhoneNumberForm2 } from '@/TravelCore/Components/Epic/PhoneNumberForm2'
import { TextField } from '@/TravelCore/Components/Epic/TextFieldComponent.tsx'
import { SelectField } from '@/TravelCore/Components/Epic/SelectFieldComponent.tsx'

interface TravelFormProps {
  onChangeField?: (index: number, name: string, value: string) => void
  traveler: { id: number; age: string; phone: string }
  dataTraveler: PaxForm
  onChange: (field: string, value: string) => void
  errors?: { [p: string]: string[] }
}

export const TravelerForm = memo(({ traveler, onChangeField, dataTraveler, onChange, errors }: TravelFormProps) => {
  const { t } = useTranslation(['traveler'])
  const [ageError, setAgeError] = useState<string>('')
  const master = useMasters()

  // Memoizamos toda la preparación de datos que no cambian con cada render
  const { countryOptions, documentTypeOptions } = useMemo(() => {
    const countries = master?.countries.data?.items as CountriesItems[]
    const documentType = master?.documents.data?.items as DocumentTypeItems[]

    const activeCountries =
      countries
        ?.filter(country => country.estaActivo)
        .slice()
        .sort((a, b) => a.descripcion.localeCompare(b.descripcion)) || []

    const activeDocumentType = documentType?.filter(type => type.estaActivo) || []

    const countryOptions = activeCountries.map(country => (
      <SelectItem key={country.idPais} value={country.idPais.toString()}>
        {country.codigoISO} - {country.descripcion}
      </SelectItem>
    ))

    const documentTypeOptions = activeDocumentType.map(type => (
      <SelectItem key={type.idTipoDocumento} value={type.abreviacion}>
        {type.abreviacion} - {type.nombre}
      </SelectItem>
    ))

    return { countryOptions, documentTypeOptions }
  }, [master?.countries.data?.items, master?.documents.data?.items])

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target

      // Primero validamos
      onChange(name, value)

      // Luego actualizamos el estado del padre
      const fieldName = name.replace(/\d+$/, '') // Eliminar cualquier número del final
      onChangeField?.(traveler.id, fieldName, value)

      // Lógica específica para birthdate
      if (name.includes('birthdate')) {
        if (!calculateAndCompareAge(value, Number.parseInt(traveler.age))) {
          setAgeError('La fecha de nacimiento debe coincidir con la edad del pasajero.')
        } else {
          setAgeError('')
        }
      }
    },
    [traveler.id, traveler.age, onChangeField, onChange]
  )

  const handleSelectChange = useCallback(
    (name: string, value: string) => {
      // Primero validamos
      onChange(name, value)

      // Luego actualizamos el estado del padre
      const fieldName = name.replace(/\d+$/, '') // Eliminar cualquier número del final
      onChangeField?.(traveler.id, fieldName, value)
    },
    [traveler.id, onChangeField, onChange]
  )

  // Helper para manejar los cambios del selector
  const createSelectHandler = useCallback((name: string) => (value: string) => handleSelectChange(name, value), [handleSelectChange])

  const travelerId = traveler.id + 1

  return (
    <section key={traveler.id} className="space-y-4">
      <div className="bg-[#B91C1C] text-white px-8 py-2 text-sm flex items-center gap-2 rounded-t-xl">
        <SquareUser className="w-6 h-6" />
        <h1 className="font-semibold text-xl">
          {t('label-traveler')} {travelerId} - {traveler.age} {t('label-years')}
        </h1>
      </div>

      <div className="space-y-4 p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <TextField
            label={t('label-first-name')}
            id={`firstName-${traveler.id}`}
            name={`firstName${travelerId}`}
            value={dataTraveler?.firstName || ''}
            placeholder={t('placeholder-first-name')}
            errors={errors}
            onChange={handleInputChange}
          />

          <TextField
            label={t('label-last-name')}
            id={`lastName-${traveler.id}`}
            name={`lastName${travelerId}`}
            value={dataTraveler?.lastName || ''}
            placeholder={t('placeholder-last-name')}
            errors={errors}
            onChange={handleInputChange}
          />

          <SelectField
            label={t('label-document-type')}
            name={`documentType${travelerId}`}
            value={dataTraveler?.documentType || ''}
            placeholder={t('placeholder-select-document-type')}
            options={documentTypeOptions}
            errors={errors}
            onValueChange={createSelectHandler(`documentType${travelerId}`)}
          />

          <TextField
            label={t('label-document-number')}
            id={`documentNumber-${traveler.id}`}
            name={`documentNumber${travelerId}`}
            value={dataTraveler?.documentNumber || ''}
            placeholder={t('placeholder-document-number')}
            errors={errors}
            onChange={handleInputChange}
          />

          <div>
            <label
              htmlFor={`birthdate-${traveler.id}`}
              className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.[`birthdate${travelerId}`] && errors[`birthdate${travelerId}`].length > 0 ? 'text-red-500' : ''}`}
            >
              {t('label-birthdate')}
            </label>
            <Input
              id={`birthdate-${traveler.id}`}
              name={`birthdate${travelerId}`}
              value={dataTraveler?.birthdate || ''}
              type="date"
              className={`rounded-3xl border-gray-300 p-6 ${errors?.[`birthdate${travelerId}`] && errors[`birthdate${travelerId}`].length > 0 ? 'border-red-500' : ''}`}
              onChange={handleInputChange}
            />
            {ageError && <span className="text-xs text-red-500">{ageError}</span>}
            {errors?.[`birthdate${travelerId}`] && errors[`birthdate${travelerId}`].length > 0 && (
              <span className="text-xs text-red-500">{errors[`birthdate${travelerId}`]}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TextField
              label={t('label-age')}
              id={`age-${traveler.id}`}
              name={`age${travelerId}`}
              value={traveler?.age}
              disabled={true}
              errors={errors}
            />

            <SelectField
              label={t('label-gender')}
              name={`gender${travelerId}`}
              value={dataTraveler?.gender || ''}
              placeholder={t('placeholder-select-gender')}
              options={
                <>
                  <SelectItem value="m">{t('option-male')}</SelectItem>
                  <SelectItem value="f">{t('option-female')}</SelectItem>
                </>
              }
              errors={errors}
              onValueChange={createSelectHandler(`gender${travelerId}`)}
            />
          </div>

          <SelectField
            label={t('label-nationality')}
            name={`nationality${travelerId}`}
            value={dataTraveler?.nationality?.toString() || ''}
            placeholder={t('placeholder-select-nationality')}
            options={countryOptions}
            errors={errors}
            onValueChange={createSelectHandler(`nationality${travelerId}`)}
          />

          <SelectField
            label={t('label-residence-country')}
            name={`residenceCountry${travelerId}`}
            value={dataTraveler?.residenceCountry?.toString() || ''}
            placeholder={t('placeholder-select-residence-country')}
            options={countryOptions}
            errors={errors}
            onValueChange={createSelectHandler(`residenceCountry${travelerId}`)}
          />

          <PhoneNumberForm2
            celType={traveler?.phone}
            value={{ phone: dataTraveler?.phone, countryCode: dataTraveler?.countryCode }}
            onChange={handleInputChange}
            errors={errors}
            errorsChange={onChange}
            fieldId={`phone${travelerId}`}
          />

          <TextField
            label={t('label-email')}
            id={`email-${traveler.id}`}
            name={`email${travelerId}`}
            value={dataTraveler?.email || ''}
            type="email"
            placeholder={t('placeholder-email')}
            errors={errors}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div />
    </section>
  )
})
