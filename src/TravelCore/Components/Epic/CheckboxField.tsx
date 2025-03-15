import { Input } from '@/components/ui/input.tsx'
import { type ChangeEvent, memo } from 'react'

export const CheckboxField = memo(
  ({
    label,
    id,
    checked,
    onChange
  }: {
    label: string
    id: string
    checked: boolean
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
  }) => {
    return (
      <div className="flex items-center space-x-2">
        <Input type="checkbox" id={id} checked={checked} onChange={onChange} className="h-3 w-3 rounded border-gray-300" />
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      </div>
    )
  }
)
