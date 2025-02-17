import { SquareUser } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { PhoneNumberForm } from "@/TravelCore/Components/Epic/PhoneNumberForm.tsx";
import { useTranslation } from "react-i18next";
import {MouseEvent} from "react";

interface TravelFormProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}
export function TravelerForm({ traveler }: { traveler: { id: number, age: string, phone: string } }) {
  const { t } = useTranslation(["traveler"]); 

  return (
    <section key={traveler.id} className="space-y-4">
      <div className="bg-[#B91C1C] text-white px-8 py-2 text-sm flex items-center gap-2 rounded-t-xl">
        <SquareUser className="w-6 h-6" />
        <h1 className="font-semibold text-xl">
          {t("label-traveler")} {traveler.id} - {traveler.age} 
        </h1>
      </div>

      <div className="space-y-4 p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">{t("label-first-name")}</label>
            <Input placeholder={t("placeholder-first-name")} className="rounded-3xl border-gray-300 p-6" />
          </div>
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">{t("label-last-name")}</label>
            <Input placeholder={t("placeholder-last-name")} className="rounded-3xl border-gray-300 p-6" />
          </div>
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">{t("label-document-type")}</label>
            <Select>
              <SelectTrigger className="rounded-3xl border-gray-300 p-6">
                <SelectValue placeholder={t("placeholder-select-document-type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cc">{t("option-cc")}</SelectItem>
                <SelectItem value="ce">{t("option-ce")}</SelectItem>
                <SelectItem value="passport">{t("option-passport")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">{t("label-document-number")}</label>
            <Input placeholder={t("placeholder-document-number")} className="rounded-3xl border-gray-300 p-6" />
          </div>
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">{t("label-birthdate")}</label>
            <Input type="date" className="rounded-3xl border-gray-300 p-6" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-500 text-sm mb-1">{t("label-age")}</label>
              <Input disabled value={traveler.age} className="rounded-3xl border-gray-300 p-6" />
            </div>
            <div>
              <label className="block font-semibold text-gray-500 text-sm mb-1">{t("label-gender")}</label>
              <Select>
                <SelectTrigger className="rounded-3xl border-gray-300 p-6">
                  <SelectValue placeholder={t("placeholder-select-gender")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m">{t("option-male")}</SelectItem>
                  <SelectItem value="f">{t("option-female")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">{t("label-nationality")}</label>
            <Select>
              <SelectTrigger className="rounded-3xl border-gray-300 p-6">
                <SelectValue placeholder={t("placeholder-select-nationality")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="co">{t("option-colombia")}</SelectItem>
                <SelectItem value="pe">{t("option-peru")}</SelectItem>
                <SelectItem value="ec">{t("option-ecuador")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">{t("label-residence-country")}</label>
            <Select>
              <SelectTrigger className="rounded-3xl border-gray-300 p-6">
                <SelectValue placeholder={t("placeholder-select-residence-country")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="co">{t("option-colombia")}</SelectItem>
                <SelectItem value="pe">{t("option-peru")}</SelectItem>
                <SelectItem value="ec">{t("option-ecuador")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <PhoneNumberForm celType={traveler.phone} />
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">{t("label-email")}</label>
            <Input type="email" placeholder={t("placeholder-email")} className="rounded-3xl border-gray-300 p-6" />
          </div>
        </div>
      </div>
    </section>
  );
}