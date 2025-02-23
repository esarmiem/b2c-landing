import { Button } from '@/components/ui/button'
import { Globe2, Headset } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from '../Raw/Link'
import { DropdownHeader } from './DropdownHeader'
import { MenuSheet } from './MenuSheet'

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation(['header'])

  return (
    <header className="sticky top-0 w-full bg-white z-50 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      {/* OLD NAVBAR TRANSPARENTEEE <header className="fixed top-0 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 z-50"></header> */}
      <div className="flex h-14 items-top justify-between">
        <div className="flex items-center">
          <Link href="/" className="font-extrabold text-2xl md:text-3xl text-red-600 hover:text-red-600">
            TRAVELKIT
          </Link>
        </div>
        <div className="flex items-top gap-6">
          <div className="items-center hidden lg:flex bg-red-700 p-3 pt-4 mb-2 rounded-bl-3xl relative overflow-hidden before:absolute before:right-0 before:top-0 before:h-full before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-[900%] before:ease hover:shadow-red-500 transition-all">
            <Headset className="h-4 w-4 mr-2 text-white hover:font-semibold relative z-10" />
            <Link
              href="https://wa.me/573175032200"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white hover:text-white relative z-10"
            >
              {t('label-link-sales')}: +57 317 5032 200
            </Link>
          </div>

          <div className="items-center hidden lg:flex">
            <Link href={'#'} className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Blogs
            </Link>
          </div>

          {/* productos */}
          <DropdownHeader />
          {/* productos */}

          <div className="items-center hidden lg:flex">
            <Link
              href="https://travelkit.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              {t('label-link-agency')}
            </Link>
          </div>

          <div className="gap-2 hidden items-center lg:flex">
            <Button
              variant="travelkit"
              size="sm"
              className={`${i18n.language === 'es' ? 'bg-red-500' : ''} text-white`}
              onClick={() => i18n.changeLanguage('es')}
            >
              <Globe2 className="mr-2 h-4 w-4" />
              esp
            </Button>
            <Button
              variant="travelkit"
              size="sm"
              className={`${i18n.language === 'en' ? 'bg-red-500' : ''} text-white`}
              onClick={() => i18n.changeLanguage('en')}
            >
              <Globe2 className="mr-2 h-4 w-4" />
              eng
            </Button>
          </div>
          <div className="flex items-center">
            <MenuSheet />
          </div>
        </div>
      </div>
    </header>
  )
}
