import { type ChangeEvent, memo } from 'react'
import { PhoneNumberForm2 } from '@/TravelCore/Components/Epic/PhoneNumberForm2.tsx'

export const PhoneFieldWrapper = memo(
  ({
    label,
    value,
    onChange,
    errors,
    errorsChange,
    fieldId
  }: {
    label: string
    value: { phone: string; countryCode: string }
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    errors?: { [p: string]: string[] }
    errorsChange: (field: string, value: string) => void
    fieldId: string
  }) => {
    return (
      <PhoneNumberForm2 celType={label} value={value} onChange={onChange} errors={errors} errorsChange={errorsChange} fieldId={fieldId} />
    )
  }
)
