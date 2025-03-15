import { memo } from 'react'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select.tsx'
import { useTranslation } from 'react-i18next'

export const SelectField = memo(
  ({
    label,
    name,
    value,
    placeholder,
    options,
    errors,
    onValueChange,
    isCities
  }: {
    label: string
    name: string
    value: string
    placeholder: string
    options: React.ReactNode
    errors?: { [p: string]: string[] }
    onValueChange: (value: string) => void
    isCities?: boolean
  }) => {
    const { t } = useTranslation(['invoice'])
    const hasError = errors?.[name] && errors[name].length > 0

    return (
      <div>
        <label htmlFor={name} className={`block font-semibold text-gray-500 text-sm mb-1 ${hasError ? 'text-red-500' : ''}`}>
          {label}
        </label>
        <Select name={name} value={value || ''} onValueChange={onValueChange}>
          <SelectTrigger className={`rounded-3xl border-gray-300 p-6 ${hasError ? 'border-red-500' : ''}`}>
            <SelectValue placeholder={<span className="text-gray-500">{placeholder}</span>} />
          </SelectTrigger>
          <SelectContent>{options}</SelectContent>
        </Select>
        {hasError && <span className="text-xs text-red-500">{errors[name]}</span>}
        {isCities && <span className="text-xs text-red-500">{t('no-cities')}</span>}
      </div>
    )
  }
)
