import { type ChangeEvent, memo, useCallback, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { PhoneNumberForm2 } from '@/TravelCore/Components/Epic/PhoneNumberForm2'
import { useTranslation } from 'react-i18next'
import type { EmergencyContactType } from '@/TravelCore/Utils/interfaces/Order'

interface TravelFormProps {
  onChangeField?: (name: string, value: string) => void
  data: EmergencyContactType
  onChange: (field: string, value: string) => void
  errors?: { [p: string]: string[] }
}

const TextField = memo(
  ({
    label,
    name,
    value,
    placeholder,
    errors,
    errorKey,
    onChange
  }: {
    label: string
    name: string
    value: string
    placeholder: string
    errors?: { [p: string]: string[] }
    errorKey: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
  }) => {
    const hasError = errors?.[errorKey] && errors[errorKey].length > 0

    return (
      <div>
        <label htmlFor={name} className={`block font-semibold text-gray-500 text-sm mb-1 ${hasError ? 'text-red-500' : ''}`}>
          {label}
        </label>
        <Input
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          className={`rounded-3xl border-gray-300 p-6 ${hasError ? 'border-red-500' : ''}`}
          onChange={onChange}
        />
        {hasError && <span className="text-xs text-red-500">{errors[errorKey]}</span>}
      </div>
    )
  }
)

const PhoneField = memo(
  ({
    phone,
    onChange,
    errors,
    errorsChange,
    fieldId
  }: {
    phone: { id: number; phone: string; value: string; indicative: string }
    onChange: (phoneId: number, value: string) => void
    errors?: { [p: string]: string[] }
    errorsChange: (field: string, value: string) => void
    fieldId: string
  }) => {
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => onChange(phone.id, e.target.value), [onChange, phone.id])

    return (
      <PhoneNumberForm2
        celType={phone.phone}
        value={{ countryCode: phone.indicative, phone: phone.value }}
        onChange={handleChange}
        errors={errors}
        errorsChange={errorsChange}
        fieldId={fieldId}
      />
    )
  }
)

export const EmergencyContact = memo(({ data, onChangeField, onChange, errors }: TravelFormProps) => {
  const { t } = useTranslation(['traveler'], { useSuspense: false })

  const namePhone = useMemo(
    () => [
      { id: 1, phone: t('emergency-phone'), value: data?.phone1, indicative: data?.indicative1 },
      { id: 2, phone: t('emergency-phone-optional'), value: data?.phone2, indicative: data?.indicative2 }
    ],
    [t, data?.phone1, data?.phone2, data?.indicative1, data?.indicative2]
  )

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      onChangeField?.(name, value)
      onChange(name, value)
    },
    [onChangeField, onChange]
  )

  const handlePhoneChange = useCallback(
    (phoneId: number, value: string) => {
      const fieldName = `phone${phoneId}`
      onChangeField?.(fieldName, value)
      onChange(fieldName, value)
    },
    [onChangeField, onChange]
  )

  return (
    <section className="space-y-4 pb-4">
      <div className="px-4 py-1">
        <h2 className="text-2xl font-extrabold text-[#B91C1C]">{t('emergency-contact-title')}</h2>
      </div>
      <div className="space-y-4 px-4">
        <div className="grid md:grid-cols-2 gap-4">
          <TextField
            label={t('label-first-name')}
            name="firstName"
            value={data.firstName}
            placeholder={t('placeholder-first-name')}
            errors={errors}
            errorKey="firstNameEmergencyContact"
            onChange={handleInputChange}
          />
          <TextField
            label={t('label-last-name')}
            name="lastName"
            value={data.lastName}
            placeholder={t('placeholder-last-name')}
            errors={errors}
            errorKey="lastNameEmergencyContact"
            onChange={handleInputChange}
          />
          {namePhone.map(phone => (
            <PhoneField
              key={phone.id}
              phone={phone}
              onChange={handlePhoneChange}
              errors={errors}
              errorsChange={onChange}
              fieldId={`phone${phone.id}EmergencyContact`}
            />
          ))}
        </div>
      </div>
    </section>
  )
})
