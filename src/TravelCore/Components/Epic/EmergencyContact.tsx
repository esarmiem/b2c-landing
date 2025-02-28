import React from "react";
import { Input } from "@/components/ui/input.tsx";
import { PhoneNumberForm } from "@/TravelCore/Components/Epic/PhoneNumberForm.tsx";
import { useTranslation } from "react-i18next";
import type {EmergencyContactType} from "@/TravelCore/Utils/interfaces/Order.ts";

interface TravelFormProps {
  onChangeField?: (name: string, value: string) => void;
  data: EmergencyContactType;
}

export const EmergencyContact = React.memo(
    ({ data, onChangeField }: TravelFormProps) => {
      const { t } = useTranslation(["traveler"], { useSuspense: false });

      const namePhone = React.useMemo(
          () => [
            { id: 1, phone: t("emergency-phone"), value: data?.phone1, indicative: data?.indicative1 },
            { id: 2, phone: t("emergency-phone-optional"), value: data?.phone2, indicative: data?.indicative2 },
          ],
          [t, data.phone1, data.phone2] // Dependencias
      );

      const handleInputChange = React.useCallback(
          (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            onChangeField?.(name, value);
          },
          [onChangeField]
      );

      const handlePhoneChange = React.useCallback(
          (phoneId: number, value: any) => {
              const fieldName = value.target.name
              const fieldValue = value.target.value
              onChangeField?.(fieldName+phoneId, fieldValue);
          },
          [onChangeField]
      );
console.log("data", data, namePhone)
      return (
          <section className="space-y-4 pb-4">
            <div className="px-4 py-1">
              <h2 className="text-2xl font-extrabold text-[#B91C1C]">
                {t("emergency-contact-title")}
              </h2>
            </div>

            <div className="space-y-4 px-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-500 text-sm mb-1">
                    {t("emergency-first-name")}
                  </label>
                  <Input
                      name="firstName"
                      placeholder={t("emergency-placeholder-first-name")}
                      className="rounded-3xl border-gray-300 p-6"
                      value={data?.firstName}
                      onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-500 text-sm mb-1">
                    {t("emergency-last-name")}
                  </label>
                  <Input
                      name="lastName"
                      placeholder={t("emergency-placeholder-last-name")}
                      className="rounded-3xl border-gray-300 p-6"
                      value={data?.lastName}
                      onChange={handleInputChange}
                  />
                </div>
                {namePhone.map((phone) => (
                    <div key={phone.id}>
                      <PhoneNumberForm
                          celType={phone.phone}
                          value={{ countryCode: phone.indicative, phone: phone.value }}
                          onChange={(val) => handlePhoneChange(phone.id, val)}
                      />
                    </div>
                ))}
              </div>
            </div>
          </section>
      );
    }
);