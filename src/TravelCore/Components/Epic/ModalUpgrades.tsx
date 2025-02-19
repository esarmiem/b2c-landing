import { getProductUpdates } from '@/TravelCore/Services/Apis/Order'
import { formatCurrency } from '@/TravelCore/Utils/format.ts'
import type { Upgrades } from '@/TravelCore/Utils/interfaces/Order.ts'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Check, HandHeart, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Plan {
  description: string
  id: number
  name: string
  price: number
}

interface ModalUpgradesProps {
  isOpen: boolean
  onClose: () => void
  product: Plan
}

const ModalUpgrades = ({ isOpen, onClose, product }: ModalUpgradesProps) => {
  const { t } = useTranslation(['products'])
  const { i18n } = useTranslation()
  const [selectedUpgrades, setSelectedUpgrades] = useState<number[]>([])
  const [productUpgrades, setProductUpgrades] = useState<Upgrades[]>([])

  if (!product) return null
  const toggleUpgrade = (id_raider: number) => {
    setSelectedUpgrades(prev => (prev.includes(id_raider) ? prev.filter(item => item !== id_raider) : [...prev, id_raider]))
  }

  const totalUpgradesCost = selectedUpgrades.reduce((total, id) => {
    const upgrade = productUpgrades.find(u => Number(u.id_raider) === id)
    const floatNumber = upgrade?.cost_raider.replace('.', '')
    return total + (upgrade ? Number.parseFloat(floatNumber) : 0)
  }, 0)

  const totalPrice = product.price + totalUpgradesCost

  useEffect(() => {
    const updateProduct = async () => {
      const response = await getProductUpdates({
        id_plan: product?.id as unknown as string,
        language: i18n.language === 'es' ? 'spa' : i18n.language === 'en' ? 'eng' : ''
      })
      setProductUpgrades(response)
    }
    updateProduct()
  }, [product, i18n.language])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-lg p-6 rounded-xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle className="text-2xl font-bold">{t('label-upgrades')}</DialogTitle>
          </div>
          <DialogDescription className="text-gray-600">{t('label-select-additional-benefits')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {productUpgrades.map(upgrade => (
            <button
              type="button"
              key={upgrade.id_raider}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition ${
                selectedUpgrades.includes(Number(upgrade.id_raider)) ? 'bg-green-100 border-green-500' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => toggleUpgrade(Number(upgrade.id_raider))}
            >
              <div className="flex items-center text-start gap-3 w-full">
                <span className="text-xl">{<HandHeart />}</span>
                <div className="w-full">
                  <p className="font-medium text-sm">{t(upgrade.name_raider)}</p>
                  <p className="text-xs text-gray-500">
                    {upgrade.cost_raider.toLocaleString()} {t('label-cop-per-person')}
                  </p>
                </div>
                <span className="text-xl">
                  {selectedUpgrades.includes(Number(upgrade.id_raider)) ? (
                    <Check className="text-green-600" />
                  ) : (
                    <Plus className="text-gray-600" />
                  )}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <p className="text-sm font-medium">{t('label-number-of-travelers')}</p>
            <p className="font-bold text-red-950">2</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-medium">{t('label-product-value-per-traveler')}</p>
            <p className="font-bold text-red-950">
              {formatCurrency(product.price.toString(), i18n.language === 'es' ? 'COP' : 'USD')} {i18n.language === 'es' ? 'COP' : 'USD'}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-bold text-red-500">{t('label-total-upgrades')}</p>
            <p className="font-bold text-red-500">
              {formatCurrency(totalUpgradesCost.toString(), i18n.language === 'es' ? 'COP' : 'USD')}{' '}
              {i18n.language === 'es' ? 'COP' : 'USD'}
            </p>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <p>{t('label-total')}</p>
            <p className="text-red-950">
              {formatCurrency(totalPrice.toString(), i18n.language === 'es' ? 'COP' : 'USD')} {i18n.language === 'es' ? 'COP' : 'USD'}
            </p>
          </div>
        </div>

        <a href="/traveler" className="w-full rounded-full">
          <button type="button" className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600">
            {t('button-continue')}
          </button>
        </a>
      </DialogContent>
    </Dialog>
  )
}

export default ModalUpgrades
