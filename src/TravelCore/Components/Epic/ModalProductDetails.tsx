import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useTranslation } from 'react-i18next'

interface Product {
  name: string
  price: string
  originalPrice: string
  subtitle: string
  details: string[]
  typeOfProduct: string
}

interface ModalProductDetailsProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}

const ModalProductDetails = ({ isOpen, onClose, product }: ModalProductDetailsProps) => {
  const { t } = useTranslation(['products'])
  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6 rounded-xl text-center">
        <DialogHeader>
          <DialogTitle className="text-lg text-red-500 font-bold text-center">{product.name}</DialogTitle>
          <p className="text-center text-3xl  font-semibold">{product.subtitle}</p>
        </DialogHeader>

        <div className="py-2">
          <p className="text-2xl font-normal">{t('label-benefits')}:</p>
        </div>
        <ul className="mt-2 text-sm text-start text-gray-700 max-h-80 overflow-y-auto border rounded-lg">
          {product.details.map((detail, idx) => (
            <li key={idx} className="flex items-start align-middle border-b p-3">
              ✅ {detail}
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}

export default ModalProductDetails
