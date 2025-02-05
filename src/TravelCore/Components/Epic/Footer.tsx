import { Link } from '../Raw/Link';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';
import {useTranslation} from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation(["footer"])
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-left sm:text-center">
            <h3 className="font-extrabold text-white text-xl mb-4">TRAVELKIT</h3>
            <p className="text-sm mb-4">{t("label-title-social")}</p>
            <div className="flex justify-start sm:justify-center gap-6">
              <Link href="#" className="hover:text-white transition-colors duration-200">
                <Facebook className="h-7 w-7 sm:h-5 sm:w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors duration-200">
                <Twitter className="h-7 w-7 sm:h-5 sm:w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors duration-200">
                <Instagram className="h-7 w-7 sm:h-5 sm:w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors duration-200">
                <Youtube className="h-7 w-7 sm:h-5 sm:w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors duration-200">
                <Linkedin className="h-7 w-7 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>

          <div className="text-left sm:text-center">
            <h4 className="font-semibold text-white text-lg mb-4">{t("label-title-products")}</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-white transition-colors duration-200">{t("label-link-assistance")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-200">{t("label-link-comms")}</Link></li>
            </ul>
          </div>

          <div className="text-left sm:text-center">
            <h4 className="font-semibold text-white text-lg mb-4">{t("label-title-company")}</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-white transition-colors duration-200">{t("label-link-about")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-200">{t("label-link-faqs")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-200">{t("label-link-contact")}</Link></li>
            </ul>
          </div>

          <div className="text-left sm:text-center">
            <h4 className="font-semibold text-white text-lg mb-4">{t("label-title-legal")}</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-white transition-colors duration-200">{t("label-link-privacy")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-200">{t("label-link-terms")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-200">{t("label-link-cookies")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-200">{t("label-link-conditions")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>{t("label-text-trademark", {Year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
};