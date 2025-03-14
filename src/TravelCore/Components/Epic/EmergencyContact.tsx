import React from 'react'
import { Input } from '@/components/ui/input.tsx'
import { PhoneNumberForm2 } from '@/TravelCore/Components/Epic/PhoneNumberForm2.tsx'
import { useTranslation } from 'react-i18next'
import type { EmergencyContactType } from '@/TravelCore/Utils/interfaces/Order.ts'

interface TravelFormProps {
  onChangeField?: (name: string, value: string) => void
  data: EmergencyContactType
  onChange: (field: string, value: string) => void
  errors?: { [p: string]: string[] }
}

export const EmergencyContact = React.memo(({ data, onChangeField, onChange, errors }: TravelFormProps) => {
  const { t } = useTranslation(['traveler'], { useSuspense: false })
  const namePhone = [
    { id: 1, phone: t('emergency-phone'), value: data?.phone1, indicative: data?.indicative1 },
    { id: 2, phone: t('emergency-phone-optional'), value: data?.phone2, indicative: data?.indicative2 }
  ]

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      onChangeField?.(name, value)
      onChange(name, value)
    },
    [onChangeField, onChange]
  )

  const handlePhoneChange = React.useCallback(
    (phoneId: number, value: any) => {
      const fieldName = value.target.name
      const fieldValue = value.target.value
      onChangeField?.(fieldName + phoneId, fieldValue)
      onChange(fieldName + phoneId, fieldValue)
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
          <div>
            <label
              htmlFor="firstNameEmergencyContact"
              className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.firstNameEmergencyContact && errors?.firstNameEmergencyContact.length > 0 ? 'text-red-500' : ''}`}
            >
              {t('emergency-first-name')}
            </label>
            <Input
              name="firstName"
              placeholder={t('emergency-placeholder-first-name')}
              className={`rounded-3xl border-gray-300 p-6 ${errors?.firstNameEmergencyContact && errors?.firstNameEmergencyContact.length > 0 ? 'border-red-500' : ''}`}
              value={data?.firstName}
              onChange={handleInputChange}
            />
            {errors?.firstNameEmergencyContact && errors.firstNameEmergencyContact.length > 0 && (
              <span className="text-xs text-red-500">{errors.firstNameEmergencyContact}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="lastNameEmergencyContact"
              className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.lastNameEmergencyContact && errors?.lastNameEmergencyContact.length > 0 ? 'text-red-500' : ''}`}
            >
              {t('emergency-last-name')}
            </label>
            <Input
              name="lastName"
              placeholder={t('emergency-placeholder-last-name')}
              className={`rounded-3xl border-gray-300 p-6 ${errors?.lastNameEmergencyContact && errors?.lastNameEmergencyContact.length > 0 ? 'border-red-500' : ''}`}
              value={data?.lastName}
              onChange={handleInputChange}
            />
            {errors?.lastNameEmergencyContact && errors.lastNameEmergencyContact.length > 0 && (
              <span className="text-xs text-red-500">{errors.lastNameEmergencyContact}</span>
            )}
          </div>
          {namePhone.map(phone => (
            <div key={phone.id}>
              <PhoneNumberForm2
                celType={phone.phone}
                value={{ countryCode: phone.indicative, phone: phone.value }}
                onChange={val => handlePhoneChange(phone.id, val)}
                errors={errors}
                errorsChange={onChange}
                fieldId={`phone${phone.id}EmergencyContact`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})
