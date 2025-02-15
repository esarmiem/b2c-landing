import { Input } from "@/components/ui/input.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { PhoneNumberForm } from "@/TravelCore/Components/Epic/PhoneNumberForm.tsx";
import { useState } from "react";
import { useTranslation } from "react-i18next"; 

export function BillingForm() {
  const { t } = useTranslation(["invoice"]); 
  const [usePassengerInfo, setUsePassengerInfo] = useState(false);

  return (
    <>
      <section className="p-4">
        <h2 className="mb-4 font-bold text-lg">
          {t("billing-select-passenger-title")} 
        </h2>
        <div className="flex items-center space-x-2">
          <Input
            type="checkbox"
            id="usePassengerInfo"
            checked={usePassengerInfo}
            onChange={(e) => setUsePassengerInfo(e.target.checked)}
            className="h-3 w-3 rounded border-gray-300"
          />
          <label htmlFor="usePassengerInfo" className="text-sm font-medium text-gray-700">
            {t("billing-use-passenger-info")} 
          </label>
        </div>
      </section>

      <section className="space-y-4 p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">
              {t("billing-first-name")} 
            </label>
            <Input
              placeholder={t("billing-placeholder-first-name")} 
              className="rounded-3xl border-gray-300 p-6"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">
              {t("billing-last-name")} 
            </label>
            <Input
              placeholder={t("billing-placeholder-last-name")} 
              className="rounded-3xl border-gray-300 p-6"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">
              {t("billing-document-type")} 
            </label>
            <Select>
              <SelectTrigger className="rounded-3xl border-gray-300 p-6">
                <SelectValue placeholder={t("billing-placeholder-select-document-type")} /> 
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cc">{t("billing-option-cc")}</SelectItem> 
                <SelectItem value="ce">{t("billing-option-ce")}</SelectItem> 
                <SelectItem value="passport">{t("billing-option-passport")}</SelectItem> 
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">
              {t("billing-document-number")} 
            </label>
            <Input
              placeholder={t("billing-placeholder-document-number")} 
              className="rounded-3xl border-gray-300 p-6"
            />
          </div>
          <PhoneNumberForm celType="Teléfono" />
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">
              {t("billing-email")} 
            </label>
            <Input
              type="email"
              placeholder={t("billing-placeholder-email")} 
              className="rounded-3xl border-gray-300 p-6"
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div className="space-y-2">
            <label className="block font-semibold text-gray-500 text-sm mb-1">
              {t("billing-country")} 
            </label>
            <Input
              type="text"
              className="w-full rounded-3xl border border-gray-300 text-base p-6"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-semibold text-gray-500 text-sm mb-1">
              {t("billing-city")} 
            </label>
            <Select>
              <SelectTrigger className="rounded-3xl border-gray-300 p-6">
                <SelectValue placeholder={t("billing-placeholder-city")} /> 
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bogota">{t("billing-option-bogota")}</SelectItem> 
                <SelectItem value="medellin">{t("billing-option-medellin")}</SelectItem> 
                <SelectItem value="cali">{t("billing-option-cali")}</SelectItem> 
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block font-semibold text-gray-500 text-sm mb-1">
              {t("billing-address")} 
            </label>
            <Input
              type="text"
              id="address"
              name="address"
              placeholder={t("billing-placeholder-address")} 
              required
              className="w-full rounded-3xl border border-gray-300 text-base p-6"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-semibold text-gray-500 text-sm mb-1">
              {t("billing-additional-info")} 
            </label>
            <Input
              type="text"
              id="additional"
              name="additional"
              placeholder={t("billing-placeholder-additional-info")} 
              className="w-full rounded-3xl border border-gray-300 text-base p-6"
            />
          </div>
        </div>
      </section>
    </>
  );
}