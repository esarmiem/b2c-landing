import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useTranslation } from "react-i18next";

interface PhoneNumberFormProps {
  celType: string;
  value?: { countryCode: string; phoneNumber: string };
  onChange?: (value: { countryCode: string; phoneNumber: string }) => void;
}

export const PhoneNumberForm = React.memo(
    ({ celType, value = { countryCode: "co", phoneNumber: "" }, onChange }: PhoneNumberFormProps) => {
      const { t } = useTranslation(["traveler"], { useSuspense: false });

      const handleCountryCodeChange = React.useCallback(
          (countryCode: string) => {
            onChange?.({ ...value, countryCode });
          },
          [value, onChange]
      );

      const handlePhoneNumberChange = React.useCallback(
          (e: React.ChangeEvent<HTMLInputElement>) => {
            const phoneNumber = e.target.value;
            onChange?.({ ...value, phoneNumber });
          },
          [value, onChange]
      );

      return (
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">{celType}</label>
            <div className="flex border border-gray-300 rounded-3xl">
              <Select name="phone" value={value.countryCode} onValueChange={handleCountryCodeChange}>
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
                  className="flex-1 ml-2 p-6 border-none focus:outline-none focus:ring-0"
                  placeholder={t("phone-number-placeholder")}
                  value={value.phoneNumber}
                  onChange={handlePhoneNumberChange}
              />
            </div>
          </div>
      );
    }
);