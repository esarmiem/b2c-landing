//import Loader from '@/TravelCore/Components/Raw/Loader'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
// import { Check, HandHeart, Plus, UserRoundCog, Package2 } from 'lucide-react'
import { UserRoundCog } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TravellerQuotation } from '@/TravelCore/Utils/interfaces/Order'
import { useNavigate } from 'react-router-dom'

interface ModalUpgradesProps {
  isOpen: boolean
  onClose: () => void
  // isLoading: boolean
  // productUpgrades: Upgrade[]
  // hasUpgrades: boolean
  numberTravellers: number
  // currentTraveler: number
  setCurrentTraveler: (traveler: number) => void
  // currentTravellerData: TravellerQuotation | undefined
  allTravellers: TravellerQuotation[] | undefined
  // toggleUpgrade: (id_raider: string, name_raider: string) => void
  totalTravelersPerPlan: string
  // totalTravelerUpgrades: string
  // totalTravelerPlanWithUpgrades: string
  totalAllTravelers: string
  setIsGoTraveler: (value: boolean) => void
}

const ModalUpgrades = ({
  isOpen,
  onClose,
  // isLoading,
  // productUpgrades,
  // hasUpgrades,
  numberTravellers,
  // currentTraveler,
  setCurrentTraveler,
  // currentTravellerData,
  allTravellers,
  // toggleUpgrade,
  totalTravelersPerPlan,
  // totalTravelerUpgrades,
  // totalTravelerPlanWithUpgrades,
  totalAllTravelers,
  setIsGoTraveler
}: ModalUpgradesProps) => {
  const { t } = useTranslation(['products'])
  const { i18n } = useTranslation()
  const spanish = i18n.language.startsWith('es')
  const navigate = useNavigate()

  const handleContinue = () => {
    setIsGoTraveler(true)
    navigate('/traveler')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-lg p-6 rounded-xl">
        <DialogHeader>
          <div className="grid items-center justify-between w-full space-y-2">
            {/*<DialogTitle className="text-2xl font-bold">{t('label-upgrades')}</DialogTitle>*/}
            <DialogTitle className="text-2xl font-bold">{t('summary')}</DialogTitle>
            <DialogDescription className="text-gray-600">{t('travelers_attended')}</DialogDescription>
            <div className={`flex flex-wrap items-center gap-2 ${numberTravellers === 1 ? 'hidden' : ''}`}>
              {allTravellers?.map((traveller, index) => (
                <button
                  key={traveller.id}
                  type="button"
                  onClick={() => setCurrentTraveler(index + 1)}
                  className={'flex items-center p-1 rounded-lg hover:bg-gray-200 hover:text-gray-700 bg-red-500 text-white'}
                  // className={`flex items-center p-1 rounded-lg hover:bg-gray-200 hover:text-gray-700 ${
                  //   currentTraveler === index + 1 ? 'bg-red-500 text-white' : ''
                  // }`}
                >
                  <UserRoundCog className="w-4 h-4" />
                  <span className="text-xs font-medium ml-1">
                    {t('label-traveler')} {index + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
          {/*<DialogDescription className="text-gray-600">{t('label-select-additional-benefits')}</DialogDescription>*/}
        </DialogHeader>

        {/*<div className="space-y-3 max-h-60 overflow-y-auto">*/}
        {/*  {isLoading && (*/}
        {/*    <div*/}
        {/*      className={`space-y-3 ${isLoading ? 'w-full max-h-60 flex items-center justify-center overflow-hidden' : 'max-h-60 overflow-y-auto'}`}*/}
        {/*    >*/}
        {/*      <Loader />*/}
        {/*    </div>*/}
        {/*  )}*/}

        {/*  {!isLoading && !hasUpgrades && (*/}
        {/*    <div className="w-full flex flex-col items-center justify-center py-6 text-center">*/}
        {/*      <Package2 className="w-12 h-12 text-gray-400 mb-2" />*/}
        {/*      <p className="text-lg font-medium text-gray-700">{t('label-no-upgrades-available')}</p>*/}
        {/*      <p className="text-sm text-gray-500 mt-1">{t('label-no-upgrades-description')}</p>*/}
        {/*    </div>*/}
        {/*  )}*/}

        {/*  {!isLoading &&*/}
        {/*    hasUpgrades &&*/}
        {/*    productUpgrades?.map((upgrade: Upgrade) => (*/}
        {/*      <button*/}
        {/*        type="button"*/}
        {/*        key={upgrade.id_raider}*/}
        {/*        className={`w-full flex items-center justify-between p-3 rounded-lg border transition ${*/}
        {/*          currentTravellerData?.upgrades.some(u => u.id === upgrade.id_raider)*/}
        {/*            ? 'bg-green-100 border-green-500'*/}
        {/*            : 'bg-gray-100 hover:bg-gray-200'*/}
        {/*        }`}*/}
        {/*        onClick={() => toggleUpgrade(upgrade.id_raider, upgrade.name_raider)}*/}
        {/*      >*/}
        {/*        <div className="flex items-center text-start gap-3 w-full">*/}
        {/*          <span className="text-xl">*/}
        {/*            <HandHeart />*/}
        {/*          </span>*/}
        {/*          <div className="w-full">*/}
        {/*            <p className="font-medium text-sm">{t(upgrade.name_raider)}</p>*/}
        {/*            <p className="text-xs text-gray-500">*/}
        {/*              {upgrade.cost_raider} {t('label-cop-per-person')}*/}
        {/*            </p>*/}
        {/*          </div>*/}
        {/*          <span className="text-xl">*/}
        {/*            {currentTravellerData?.upgrades.some(u => u.id === upgrade.id_raider) ? (*/}
        {/*              <Check className="text-green-600" />*/}
        {/*            ) : (*/}
        {/*              <Plus className="text-gray-600" />*/}
        {/*            )}*/}
        {/*          </span>*/}
        {/*        </div>*/}
        {/*      </button>*/}
        {/*    ))}*/}
        {/*</div>*/}

        <div className="mt-4 border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <p className="text-sm font-medium">{t('label-product-value-per-traveler')}</p>
            <p className="font-bold text-red-950">
              {totalTravelersPerPlan}
              {spanish ? 'COP' : 'USD'}
            </p>
          </div>
          {/*<div className="flex justify-between">*/}
          {/*  <p className="text-sm font-bold text-red-500">{t('label-upgrades')}</p>*/}
          {/*  <p className="font-bold text-red-500">*/}
          {/*    {totalTravelerUpgrades}*/}
          {/*    {spanish ? 'COP' : 'USD'}*/}
          {/*  </p>*/}
          {/*</div>*/}
          {/*<div className={`flex justify-between ${numberTravellers === 1 ? 'hidden' : ''}`}>*/}
          {/*  <p className="text-sm font-medium">{t('label-product-value-per-traveler-upgrades')}</p>*/}
          {/*  <p className="font-bold text-red-950">*/}
          {/*    {totalTravelerPlanWithUpgrades}*/}
          {/*    {spanish ? 'COP' : 'USD'}*/}
          {/*  </p>*/}
          {/*</div>*/}
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <p>{t('label-total')}</p>
            <p className="text-red-950">
              {totalAllTravelers}
              {spanish ? 'COP' : 'USD'}
            </p>
          </div>
        </div>

        <div className="w-full rounded-full">
          <button
            type="button"
            className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600"
            onClick={handleContinue}
          >
            {t('button-continue')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalUpgrades
