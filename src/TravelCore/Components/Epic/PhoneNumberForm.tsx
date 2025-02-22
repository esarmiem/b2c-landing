import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useTranslation } from "react-i18next";

interface PhoneNumberFormProps {
    celType: string;
    value?: { countryCode: string; phone: string };
  onChange?: () => void;
}

export const PhoneNumberForm = React.memo(
    ({ celType, value = { countryCode: "", phone: "" }, onChange }: PhoneNumberFormProps) => {

      const { t } = useTranslation(["traveler"], { useSuspense: false });
      return (
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">{celType ? celType : t("label-phone")}</label>
            <div className="flex border border-gray-300 rounded-3xl">
              <Select name="countryCode" value={value.countryCode} onValueChange={(val) => onChange({ target:{ name:"countryCode", value: val}})}>
                <SelectTrigger className="w-[80px] p-6 border-none focus:outline-none focus:ring-0">
                  <SelectValue placeholder="🇨🇴" />
                </SelectTrigger>
                <SelectContent className="w-[80px] max-w-[80px] !important">
                  <SelectItem className="w-[80px]" value="co">
                    🇨🇴
                  </SelectItem>
                  <SelectItem className="w-[80px]" value="pe">
                    🇵🇪
                  </SelectItem>
                  <SelectItem className="w-[80px]" value="ec">
                    🇪🇨
                  </SelectItem>
                </SelectContent>
              </Select>

              <Input
                  name="phone"
                  className="flex-1 ml-2 p-6 border-none focus:outline-none focus:ring-0"
                  placeholder={t("phone-number-placeholder")}
                  value={value.phone}
                  onChange={onChange}
              />
            </div>
          </div>
      );
    }
);