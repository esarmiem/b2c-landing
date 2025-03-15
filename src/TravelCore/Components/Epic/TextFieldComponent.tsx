import { memo } from 'react'
import { Input } from '@/components/ui/input.tsx'

export const TextField = memo(
  ({
    label,
    id,
    name,
    value,
    placeholder,
    type = 'text',
    disabled = false,
    errors,
    onChange
  }: {
    label: string
    id: string
    name: string
    value: string
    placeholder?: string
    type?: string
    disabled?: boolean
    errors?: { [p: string]: string[] }
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  }) => {
    const hasError = errors?.[name] && errors[name].length > 0

    return (
      <div>
        <label htmlFor={id} className={`block font-semibold text-gray-500 text-sm mb-1 ${hasError ? 'text-red-500' : ''}`}>
          {label}
        </label>
        <Input
          id={id}
          name={name}
          value={value || ''}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`rounded-3xl border-gray-300 p-6 ${hasError ? 'border-red-500' : ''}`}
          onChange={onChange}
        />
        {hasError && <span className="text-xs text-red-500">{errors[name]}</span>}
      </div>
    )
  }
)
