import type React from 'react'
import { memo, useState, useCallback } from 'react'
import { SquareUser } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx'
import { useTranslation } from 'react-i18next'
import type { PaxForm } from '@/TravelCore/Utils/interfaces/Order.ts'
import useMasters from '@/TravelCore/Hooks/useMasters'
import type { CountriesItems } from '@/TravelCore/Utils/interfaces/countries.ts'
import type { DocumentTypeItems } from '@/TravelCore/Utils/interfaces/Document.ts'
import { calculateAndCompareAge } from '@/TravelCore/Utils/dates.ts'
import { PhoneNumberForm2 } from '@/TravelCore/Components/Epic/PhoneNumberForm2'

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
  const countries = master?.countries.data?.items as CountriesItems[]
  const documentType = master?.documents.data?.items as DocumentTypeItems[]
  const activeCountries = countries
    .filter(country => country.estaActivo)
    .slice()
    .sort((a, b) => a.descripcion.localeCompare(b.descripcion))
  const activeDocumentType = documentType.filter(type => type.estaActivo)
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

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <section key={traveler.id} className="space-y-4">
      <div className="bg-[#B91C1C] text-white px-8 py-2 text-sm flex items-center gap-2 rounded-t-xl">
        <SquareUser className="w-6 h-6" />
        <h1 className="font-semibold text-xl">
          {t('label-traveler')} {traveler.id + 1} - {traveler.age} {t('label-years')}
        </h1>
      </div>

      <div className="space-y-4 p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor={`firstName-${traveler.id}`}
              className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.[`firstName${traveler.id + 1}`] && errors[`firstName${traveler.id + 1}`].length > 0 ? 'text-red-500' : ''}`}
            >
              {t('label-first-name')}
            </label>
            <Input
              id={`firstName-${traveler.id}`}
              name={`firstName${traveler.id + 1}`}
              value={dataTraveler?.firstName || ''}
              placeholder={t('placeholder-first-name')}
              className={`rounded-3xl border-gray-300 p-6 ${errors?.[`firstName${traveler.id + 1}`] && errors[`firstName${traveler.id + 1}`].length > 0 ? 'border-red-500' : ''}`}
              onChange={handleInputChange}
            />
            {errors?.[`firstName${traveler.id + 1}`] && errors[`firstName${traveler.id + 1}`].length > 0 && (
              <span className="text-xs text-red-500">{errors[`firstName${traveler.id + 1}`]}</span>
            )}
          </div>
          <div>
            <label
              htmlFor={`lastName-${traveler.id}`}
              className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.[`lastName${traveler.id + 1}`] && errors[`lastName${traveler.id + 1}`].length > 0 ? 'text-red-500' : ''}`}
            >
              {t('label-last-name')}
            </label>
            <Input
              id={`lastName-${traveler.id}`}
              name={`lastName${traveler.id + 1}`}
              value={dataTraveler?.lastName || ''}
              placeholder={t('placeholder-last-name')}
              className={`rounded-3xl border-gray-300 p-6 ${errors?.[`lastName${traveler.id + 1}`] && errors[`lastName${traveler.id + 1}`].length > 0 ? 'border-red-500' : ''}`}
              onChange={handleInputChange}
            />
            {errors?.[`lastName${traveler.id + 1}`] && errors[`lastName${traveler.id + 1}`].length > 0 && (
              <span className="text-xs text-red-500">{errors[`lastName${traveler.id + 1}`]}</span>
            )}
          </div>
          <div>
            <label
              htmlFor={`documentType-${traveler.id}`}
              className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.[`documentType${traveler.id + 1}`] && errors[`documentType${traveler.id + 1}`].length > 0 ? 'text-red-500' : ''}`}
            >
              {t('label-document-type')}
            </label>
            <Select
              name={`documentType${traveler.id + 1}`}
              value={dataTraveler?.documentType || ''}
              onValueChange={value => handleSelectChange(`documentType${traveler.id + 1}`, value)}
            >
              <SelectTrigger
                className={`rounded-3xl border-gray-300 p-6 ${errors?.[`documentType${traveler.id + 1}`] && errors[`documentType${traveler.id + 1}`].length > 0 ? 'border-red-500' : ''}`}
              >
                <SelectValue placeholder={t('placeholder-select-document-type')} />
              </SelectTrigger>
              <SelectContent>{documentTypeOptions}</SelectContent>
            </Select>
            {errors?.[`documentType${traveler.id + 1}`] && errors[`documentType${traveler.id + 1}`].length > 0 && (
              <span className="text-xs text-red-500">{errors[`documentType${traveler.id + 1}`]}</span>
            )}
          </div>
          <div>
            <label
              htmlFor={`documentNumber-${traveler.id}`}
              className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.[`documentNumber${traveler.id + 1}`] && errors[`documentNumber${traveler.id + 1}`].length > 0 ? 'text-red-500' : ''}`}
            >
              {t('label-document-number')}
            </label>
            <Input
              id={`documentNumber-${traveler.id}`}
              name={`documentNumber${traveler.id + 1}`}
              value={dataTraveler?.documentNumber || ''}
              placeholder={t('placeholder-document-number')}
              className={`rounded-3xl border-gray-300 p-6 ${errors?.[`documentNumber${traveler.id + 1}`] && errors[`documentNumber${traveler.id + 1}`].length > 0 ? 'border-red-500' : ''}`}
              onChange={handleInputChange}
            />
            {errors?.[`documentNumber${traveler.id + 1}`] && errors[`documentNumber${traveler.id + 1}`].length > 0 && (
              <span className="text-xs text-red-500">{errors[`documentNumber${traveler.id + 1}`]}</span>
            )}
          </div>
          <div>
            <label
              htmlFor={`birthdate-${traveler.id}`}
              className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.[`birthdate${traveler.id + 1}`] && errors[`birthdate${traveler.id + 1}`].length > 0 ? 'text-red-500' : ''}`}
            >
              {t('label-birthdate')}
            </label>
            <Input
              id={`birthdate-${traveler.id}`}
              name={`birthdate${traveler.id + 1}`}
              value={dataTraveler?.birthdate || ''}
              type="date"
              className={`rounded-3xl border-gray-300 p-6 ${errors?.[`birthdate${traveler.id + 1}`] && errors[`birthdate${traveler.id + 1}`].length > 0 ? 'border-red-500' : ''}`}
              onChange={handleInputChange}
            />
            <span className="text-xs text-red-500">{ageError}</span>
            {errors?.[`birthdate${traveler.id + 1}`] && errors[`birthdate${traveler.id + 1}`].length > 0 && (
              <span className="text-xs text-red-500">{errors[`birthdate${traveler.id + 1}`]}</span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`age-${traveler.age}`}
                className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.[`age${traveler.id + 1}`] && errors[`age${traveler.id + 1}`].length > 0 ? 'text-red-500' : ''}`}
              >
                {t('label-age')}
              </label>
              <Input
                name={`age${traveler.id + 1}`}
                value={traveler?.age}
                disabled
                className={`rounded-3xl border-gray-300 p-6 ${errors?.[`age${traveler.id + 1}`] && errors[`age${traveler.id + 1}`].length > 0 ? 'border-red-500' : ''}`}
              />
              {errors?.[`age${traveler.id + 1}`] && errors[`age${traveler.id + 1}`].length > 0 && (
                <span className="text-xs text-red-500">{errors[`age${traveler.id + 1}`]}</span>
              )}
            </div>
            <div>
              <label
                htmlFor={`gender-${traveler.id}`}
                className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.[`gender${traveler.id + 1}`] && errors[`gender${traveler.id + 1}`].length > 0 ? 'text-red-500' : ''}`}
              >
                {t('label-gender')}
              </label>
              <Select
                name={`gender${traveler.id + 1}`}
                value={dataTraveler?.gender || ''}
                onValueChange={value => handleSelectChange(`gender${traveler.id + 1}`, value)}
              >
                <SelectTrigger
                  className={`rounded-3xl border-gray-300 p-6 ${errors?.[`gender${traveler.id + 1}`] && errors[`gender${traveler.id + 1}`].length > 0 ? 'border-red-500' : ''}`}
                >
                  <SelectValue placeholder={t('placeholder-select-gender')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m">{t('option-male')}</SelectItem>
                  <SelectItem value="f">{t('option-female')}</SelectItem>
                </SelectContent>
              </Select>
              {errors?.[`gender${traveler.id + 1}`] && errors[`gender${traveler.id + 1}`].length > 0 && (
                <span className="text-xs text-red-500">{errors[`gender${traveler.id + 1}`]}</span>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor={`nationality-${traveler.id}`}
              className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.[`nationality${traveler.id + 1}`] && errors[`nationality${traveler.id + 1}`].length > 0 ? 'text-red-500' : ''}`}
            >
              {t('label-nationality')}
            </label>
            <Select
              name={`nationality${traveler.id + 1}`}
              value={dataTraveler?.nationality?.toString() || ''}
              onValueChange={value => handleSelectChange(`nationality${traveler.id + 1}`, value)}
            >
              <SelectTrigger
                className={`rounded-3xl border-gray-300 p-6 ${errors?.[`nationality${traveler.id + 1}`] && errors[`nationality${traveler.id + 1}`].length > 0 ? 'border-red-500' : ''}`}
              >
                <SelectValue placeholder={t('placeholder-select-nationality')} />
              </SelectTrigger>
              <SelectContent>{countryOptions}</SelectContent>
            </Select>
            {errors?.[`nationality${traveler.id + 1}`] && errors[`nationality${traveler.id + 1}`].length > 0 && (
              <span className="text-xs text-red-500">{errors[`nationality${traveler.id + 1}`]}</span>
            )}
          </div>
          <div>
            <label
              htmlFor={`residenceCountry-${traveler.id}`}
              className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.[`residenceCountry${traveler.id + 1}`] && errors[`residenceCountry${traveler.id + 1}`].length > 0 ? 'text-red-500' : ''}`}
            >
              {t('label-residence-country')}
            </label>
            <Select
              name={`residenceCountry${traveler.id + 1}`}
              value={dataTraveler?.residenceCountry?.toString() || ''}
              onValueChange={value => handleSelectChange(`residenceCountry${traveler.id + 1}`, value)}
            >
              <SelectTrigger
                className={`rounded-3xl border-gray-300 p-6 ${errors?.[`residenceCountry${traveler.id + 1}`] && errors[`residenceCountry${traveler.id + 1}`].length > 0 ? 'border-red-500' : ''}`}
              >
                <SelectValue placeholder={t('placeholder-select-residence-country')} />
              </SelectTrigger>
              <SelectContent>{countryOptions}</SelectContent>
            </Select>
            {errors?.[`residenceCountry${traveler.id + 1}`] && errors[`residenceCountry${traveler.id + 1}`].length > 0 && (
              <span className="text-xs text-red-500">{errors[`residenceCountry${traveler.id + 1}`]}</span>
            )}
          </div>
          <PhoneNumberForm2
            celType={traveler?.phone}
            value={{ phone: dataTraveler?.phone, countryCode: dataTraveler?.countryCode }}
            onChange={handleInputChange}
            errors={errors}
            errorsChange={onChange}
            fieldId={`phone${traveler.id + 1}`}
          />
          <div>
            <label
              htmlFor={`email-${traveler.id}`}
              className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.[`email${traveler.id + 1}`] && errors[`email${traveler.id + 1}`].length > 0 ? 'text-red-500' : ''}`}
            >
              {t('label-email')}
            </label>
            <Input
              id={`email-${traveler.id}`}
              name={`email${traveler.id + 1}`}
              value={dataTraveler?.email || ''}
              type="email"
              placeholder={t('placeholder-email')}
              className={`rounded-3xl border-gray-300 p-6 ${errors?.[`email${traveler.id + 1}`] && errors[`email${traveler.id + 1}`].length > 0 ? 'border-red-500' : ''}`}
              onChange={handleInputChange}
            />
            {errors?.[`email${traveler.id + 1}`] && errors[`email${traveler.id + 1}`].length > 0 && (
              <span className="text-xs text-red-500">{errors[`email${traveler.id + 1}`]}</span>
            )}
          </div>
        </div>
      </div>
      <div />
    </section>
  )
})