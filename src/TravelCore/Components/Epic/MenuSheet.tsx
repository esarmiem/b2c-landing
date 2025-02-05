
import { LogIn, Shield, Phone, MessageSquare, AlertTriangle, Building2, Globe2, Mail, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {useTranslation} from "react-i18next";

export const MenuSheet= () => {
  const { t, i18n } = useTranslation(["header"])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="sr-only">Open menu</span>
          <Menu className="h-5 w-5 font-medium" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-[#111] text-white p-0 overflow-y-auto border-l-0">
        <div className="flex flex-col min-h-[100dvh]">
          <div className="p-6">
            <h2 className="text-red-600 text-center text-2xl font-extrabold mb-6">TRAVELKIT</h2>

            <div className="space-y-4">
              <h3 className="text-gray-400">{t('label-title-sidebar-agency')}</h3>
              <Button
                variant="ghost"
                className="w-full justify-start pl-0 text-white hover:text-red-600 hover:bg-transparent"
              >
                <LogIn className="mr-2 h-5 w-5" />
                {t('label-button-sidebar-agency')}
              </Button>
            </div>
          </div>

          <Separator className="bg-gray-800" />

          <div className="p-6">
            <h3 className="text-gray-400 mb-4">{t('label-link-products')}</h3>
            <div className="space-y-4">
              <Button
                variant="ghost"
                className="w-full justify-start pl-0 text-white hover:text-red-600 hover:bg-transparent"
              >
                <Shield className="mr-2 h-5 w-5" />
                {t('label-link-assist')}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start pl-0 text-white hover:text-red-600 hover:bg-transparent"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                {t('label-link-comms')}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start pl-0 text-white hover:text-red-600 hover:bg-transparent"
              >
                <AlertTriangle className="mr-2 h-5 w-5" />
                {t('label-link-emergency')}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start pl-0 text-white hover:text-red-600 hover:bg-transparent"
              >
                <Building2 className="mr-2 h-5 w-5" />
                {t('label-link-vip-rooms')}
              </Button>
            </div>
          </div>

          <Separator className="bg-gray-800" />

          <div className="p-6">
            <h3 className="text-gray-400 mb-4">{t('label-title-sidebar-lang')}</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className={`${i18n.language === 'es' ? 'bg-red-800' : ''} text-white`}
                      onClick={() => i18n.changeLanguage('es')}>
                <Globe2 className="mr-2 h-4 w-4" />
                esp
              </Button>
              <Button variant="ghost" size="sm" className={`${i18n.language === 'en' ? 'bg-red-800' : ''} text-white`}
                      onClick={() => i18n.changeLanguage('en')}>
                <Globe2 className="mr-2 h-4 w-4" />
                eng
              </Button>
            </div>
          </div>

          <Separator className="bg-gray-800" />

          <div className="p-6">
            <h3 className="text-gray-400 mb-4">{t('label-title-sidebar-contact')}</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">{t('label-title-sidebar-sales')}:</p>
                <a href="tel:+573175032200" className="text-white hover:text-red-600 flex items-center gap-2 mt-1">
                  <Phone className="h-4 w-4" />
                  +57 317 503 2200
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-400">{t('label-title-sidebar-services')}:</p>
                <a href="tel:+573152888484" className="text-white hover:text-red-600 flex items-center gap-2 mt-1">
                  <Phone className="h-4 w-4" />
                  +57 315 288 8484
                </a>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-800" />

          <div className="p-6">
            <h3 className="text-gray-400 mb-4">{t('label-title-sidebar-questions')}</h3>
            <a href="mailto:Info@Mitravelkit" className="text-white hover:text-red-600 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Info@Mitravelkit
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

