import {
  LogIn,
  ShieldPlus,
  Phone,
  AlertTriangle,
  Building2,
  Globe2,
  Mail,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "../Raw/Link";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";

export const MenuSheet = () => {
  const { t, i18n } = useTranslation(["header"]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="sr-only">Open menu</span>
          <Menu className="h-5 w-5 font-medium" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] bg-[#111] text-white p-0 overflow-y-auto border-l-0"
      >
        <div className="flex flex-col min-h-[100dvh]">
          <div className="p-6">
            <h2 className="text-red-700 text-center text-2xl font-extrabold mb-6">
              TRAVELKIT
            </h2>

            <div className="space-y-4">
              <h3 className="text-gray-400">
                {t("label-title-sidebar-agency")}
              </h3>
              <Link
                href="https://travelkit.online/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start pl-0 text-white hover:text-red-600 hover:bg-transparent"
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  {t("label-button-sidebar-agency")}
                </Button>
              </Link>
            </div>
          </div>

          <Separator className="bg-gray-800" />

          <div className="p-6">
            <h3 className="text-gray-400 mb-4">{t("label-link-products")}</h3>
            <div className="space-y-4">
              <Link
                href="https://wc.mitravelkit.com/asistencia-al-viajero/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start pl-0 text-white hover:text-red-600 hover:bg-transparent"
                >
                  <ShieldPlus className="mr-2 h-5 w-5" />
                  {t("label-link-assist")}
                </Button>
              </Link>
              <Link
                href="#"
                target=""
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start pl-0 text-white hover:text-red-600 hover:bg-transparent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-card-sd mr-2"
                  >
                    <path d="M6 22a2 2 0 0 1-2-2V6l4-4h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2Z" />
                    <path d="M8 10V7.5" />
                    <path d="M12 6v4" />
                    <path d="M16 6v4" />
                  </svg>
                  {t("label-link-comms")}
                </Button>
              </Link>
              <Link
                href="https://api.whatsapp.com/send?phone=18632042766"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start pl-0 text-white hover:text-red-600 hover:bg-transparent"
                >
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  {t("label-link-emergency")}
                </Button>
              </Link>
              <Link
                href="https://travelregistration.online/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start pl-0 text-white hover:text-red-600 hover:bg-transparent"
                >
                  <Building2 className="mr-2 h-5 w-5" />
                  {t("label-link-vip-rooms")}
                </Button>
              </Link>
            </div>
          </div>

          <Separator className="bg-gray-800" />

          <div className="p-6">
            <h3 className="text-gray-400 mb-4">
              {t("label-title-sidebar-lang")}
            </h3>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className={`${
                  i18n.language === "es" ? "bg-red-700" : ""
                } text-white`}
                onClick={() => i18n.changeLanguage("es")}
              >
                <Globe2 className="mr-2 h-4 w-4" />
                esp
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`${
                  i18n.language === "en" ? "bg-red-700" : ""
                } text-white`}
                onClick={() => i18n.changeLanguage("en")}
              >
                <Globe2 className="mr-2 h-4 w-4" />
                eng
              </Button>
            </div>
          </div>

          <Separator className="bg-gray-800" />

          <div className="p-6">
            <h3 className="text-gray-400 mb-4">
              {t("label-title-sidebar-contact")}
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">
                  {t("label-title-sidebar-sales")}:
                </p>
                <Link
                  href="https://wa.me/573175032200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-600 flex items-center gap-2 mt-1"
                >
                  <Phone className="h-4 w-4" />
                  +57 317 503 2200
                </Link>
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  {t("label-title-sidebar-services")}:
                </p>
                <Link
                  href="https://wa.me/573152888484"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-600 flex items-center gap-2 mt-1"
                >
                  <Phone className="h-4 w-4" />
                  +57 315 288 8484
                </Link>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-800" />

          <div className="p-6">
            <h3 className="text-gray-400 mb-4">
              {t("label-title-sidebar-questions")}
            </h3>
            <Link
              href="mailto:info@mitravelkit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-600 flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Info@Mitravelkit.com
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};