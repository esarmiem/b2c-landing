import { useTranslation } from 'react-i18next'

export const useMessageTranslations = () => {
  const { t } = useTranslation(['home'])

  const msg = {
    required: t('validation.required'),
    requiredAge: t('validation.requiredAge'),
    email: t('validation.email'),
    phone: t('validation.phone'),
    password: t('validation.password'),
    url: t('validation.url'),
    numbers: t('validation.numbers'),
    lettersOnly: t('validation.lettersOnly'),
    minLength: (min: number): string => `${t('validation.minLength')} ${min} ${t('validation.characters')}`,
    maxLength: (max: number): string => `${t('validation.maxLength')} ${max} ${t('validation.characters')}`,
    match: t('validation.match'),
    range: (min: number, max: number): string => `${t('validation.range')} ${min} ${t('validation.and')} ${max}`,
    dateRange: {
      invalid: t('validation.dateRange.invalid'),
      past: t('validation.dateRange.past'),
      format: t('validation.dateRange.format')
    }
  }

  return msg
}
