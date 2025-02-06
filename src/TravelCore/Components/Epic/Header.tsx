import { Link } from "../Raw/Link";
import { Headset, Globe2 } from "lucide-react";
import { DropdownHeader } from "./DropdownHeader";
import { MenuSheet } from "./MenuSheet";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button"


export const Header: React.FC = () => {
  const { t, i18n } = useTranslation(["header"]);
  return (
    <header className="fixed top-0 w-full bg-white z-50">
      {/* OLD NAVBAR TRANSPARENTEEE <header className="fixed top-0 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 z-50"></header> */}
      <div className="flex h-14 items-center justify-between px-4 md:px-20 ">
        <Link
          href="/"
          className="font-extrabold text-2xl md:text-3xl text-red-600 hover:text-red-600"
        >
          TRAVELKIT
        </Link>
        <div className="flex items-center gap-6">
          <div className="items-center hidden lg:flex">
            <Headset className="h-4 w-4 mr-2  text-gray-600 hover:text-gray-900" />
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              {t("label-link-sales")}: +57 317 5032 200
            </Link>
          </div>  

          <div className="items-center hidden lg:flex">
            <Link
              href={"#"}
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Blogs
            </Link>
          </div>

          {/* productos */}
          <DropdownHeader />
          {/* productos */}

          <div className="items-center hidden lg:flex">
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              {t("label-link-agency")}
            </Link>
          </div>

          <div className="gap-2 hidden lg:flex">
              <Button variant="travelkit" size="sm" className={`${i18n.language === 'es' ? 'bg-red-800' : ''} text-white`}
                      onClick={() => i18n.changeLanguage('es')}>
                <Globe2 className="mr-2 h-4 w-4" />
                esp
              </Button>
              <Button variant="travelkit" size="sm" className={`${i18n.language === 'en' ? 'bg-red-800' : ''} text-white`}
                      onClick={() => i18n.changeLanguage('en')}>
                <Globe2 className="mr-2 h-4 w-4" />
                eng
              </Button>
            </div>

          <MenuSheet />
        </div>
      </div>
    </header>
  );
};
