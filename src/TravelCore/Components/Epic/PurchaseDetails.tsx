import { Card, CardContent } from "@/components/ui/card.tsx";
import { ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next"; // Importar useTranslation

export function PurchaseDetails({ button }: { button: JSX.Element }) {
  const { t } = useTranslation(["traveler"]); // Obtener la función de traducción

  const paymentMethods = '../../../../Assets/payment-methods.webp';

  return (
    <section className="space-y-4">
      <Card>
        <CardContent className="p-0">
          <div className="bg-red-900 text-white p-4 flex items-center gap-1 rounded-t-xl">
            <div className="w-12 h-12 m-3 rounded-full bg-red-800 flex items-center justify-center">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <div className="flex flex-col p-0">
              <h1 className="font-medium text-xl">{t("label-purchase-details")}</h1>
              <p className="text-sm mt-1">{t("label-trip-details")}</p>
            </div>
          </div>

          <div className="p-4 space-y-4 mb-4">
            <div className="space-y-2 md:mb-16 sm:mb-8">
              <div className="flex justify-between border-b border-gray-200">
                <span className="text-sm text-gray-600">{t("label-number-of-travelers")}</span>
                <span className="text-sm font-semibold">2</span>
              </div>
              <div className="flex justify-between border-b border-gray-200">
                <span className="text-sm text-gray-600">{t("label-product-value-cop")}</span>
                <span className="text-sm font-semibold">$7,426,241.52 COP</span>
              </div>
              <div className="flex justify-between border-b border-gray-200">
                <span className="text-sm text-gray-600">{t("label-product-value-usd")}</span>
                <span className="text-sm font-semibold text-red-700">$136 USD</span>
              </div>
              <div className="flex justify-between border-b border-gray-200">
                <span className="text-sm text-gray-600">{t("label-price-per-traveler-cop")}</span>
                <span className="text-sm font-semibold">$73,929.76 COP</span>
              </div>
              <div className="flex justify-between border-b border-gray-200">
                <span className="text-sm text-gray-600">{t("label-price-per-traveler-usd")}</span>
                <span className="text-sm font-semibold text-red-700">$162 USD</span>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="font-bold text-red-700">{t("label-upgrades-summary")}</h1>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t("label-total-upgrades")}</span>
                <span className="text-sm text-gray-600">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t("label-total-usd")}</span>
                <span className="text-sm text-gray-600">$524 USD</span>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">{t("label-total")}</span>
                <span className="font-semibold">$1'426.241,52 COP</span>
              </div>
            </div>
          </div>

          <div className="p-4">
            {button}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center items-center p-4">
        <img
          src={paymentMethods}
          alt="payment methods"
          className="w-full h-auto max-w-[1020px]"
        />
      </div>
    </section>
  );
}