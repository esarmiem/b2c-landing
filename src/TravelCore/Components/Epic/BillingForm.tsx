import { Input } from "@/components/ui/input.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { PhoneNumberForm } from "@/TravelCore/Components/Epic/PhoneNumberForm.tsx";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useMasters from "@/TravelCore/Hooks/useMasters";
import {CitiesItems} from "@/TravelCore/Utils/interfaces/Cities.ts";
import {DocumentTypeItems} from "@/TravelCore/Utils/interfaces/Document.ts";
import {Billing} from "@/TravelCore/Utils/interfaces/Order.ts";

interface BillingFormProps {
  onCheck?: (value: boolean) => void;
  onChangeField?: (name: string, value: string) => void;
  data: Billing;
}

export function BillingForm({ onCheck, onChangeField, data }: BillingFormProps) {
  const { t } = useTranslation(["invoice"]); 
  const [usePassengerInfo, setUsePassengerInfo] = useState(false);
  const master = useMasters();
  const cities = (master?.cities?.data?.items ?? []) as CitiesItems[];
  const documentType = (master?.documents?.data?.items ?? []) as DocumentTypeItems[];

  const activeCities = cities.filter(city => city.estaActivo);
  const activeDocumentType = documentType.filter(type => type.estaActivo);

  const citiesOptions = activeCities.map(city => (
      <SelectItem key={city.idCiudad} value={city.idCiudad.toString()}>
        {city.descripcion}
      </SelectItem>
  ));

  const documentTypeOptions = activeDocumentType.map(type => (
      <SelectItem key={type.idTipoDocumento} value={type.abreviacion}>
        {type.abreviacion} - {type.nombre}
      </SelectItem>
  ));

  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChangeField?.(name, value);
  }, [onChangeField]);

  const handleSelectChange = React.useCallback((name: string, value: string) => {
    onChangeField?.(name, value);
  }, [onChangeField]);

  const handleCheckChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUsePassengerInfo(event.target.checked)
    onCheck?.(event.target.checked);
  }, [onCheck]);

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
            onChange={handleCheckChange}
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
                            name="firstName"
                            value={data.firstName || ""}
                            placeholder={t("billing-placeholder-first-name")}
                            className="rounded-3xl border-gray-300 p-6"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-500 text-sm mb-1">
                            {t("billing-last-name")}
                        </label>
                        <Input
                            name="lastName"
                            value={data.lastName || ""}
                            placeholder={t("billing-placeholder-last-name")}
                            className="rounded-3xl border-gray-300 p-6"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-500 text-sm mb-1">
                            {t("billing-document-type")}
                        </label>
                        <Select
                            name="documentType"
                            value={data.documentType || ""}
                            onValueChange={(value: string) => handleSelectChange("documentType", value)}
                        >
                            <SelectTrigger className="rounded-3xl border-gray-300 p-6">
                                <SelectValue placeholder={t("billing-placeholder-select-document-type")} />
                            </SelectTrigger>
                            <SelectContent>
                                {documentTypeOptions}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-500 text-sm mb-1">
                            {t("billing-document-number")}
                        </label>
                        <Input
                            name="documentNumber"
                            value={data.documentNumber || ""}
                            placeholder={t("billing-placeholder-document-number")}
                            className="rounded-3xl border-gray-300 p-6"
                            onChange={handleInputChange}
                        />
                    </div>
                    <PhoneNumberForm celType="Teléfono" value={{phone: data.phone, countryCode: data.countryCode }} onChange={handleInputChange}/>

                    <div>
                        <label className="block font-semibold text-gray-500 text-sm mb-1">
                            {t("billing-email")}
                        </label>
                        <Input
                            name="email"
                            value={data.email || ""}
                            type="email"
                            placeholder={t("billing-placeholder-email")}
                            className="rounded-3xl border-gray-300 p-6"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <label className="block font-semibold text-gray-500 text-sm mb-1">
                            {t("billing-country")}
                        </label>
                        <Input
                            name="billingCountry"
                            value={data.billingCountry || ""}
                            type="text"
                            className="w-full rounded-3xl border border-gray-300 text-base p-6"
                            onChange={handleInputChange}
                        />
                    </div>

          <div className="space-y-2">
            <label className="block font-semibold text-gray-500 text-sm mb-1">
              {t("billing-city")}
            </label>
            <Select
                name="billingCity"
                value={data.billingCity || ""}
                onValueChange={(value) => handleSelectChange("billingCity", value)}
            >
              <SelectTrigger className="rounded-3xl border-gray-300 p-6">
                <SelectValue placeholder={t("billing-placeholder-city")} />
              </SelectTrigger>
              <SelectContent>
                {citiesOptions}
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
              value={data.address || ""}
              placeholder={t("billing-placeholder-address")}
              required
              className="w-full rounded-3xl border border-gray-300 text-base p-6"
              onChange={handleInputChange}
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
              value={data.additional || ""}
              placeholder={t("billing-placeholder-additional-info")}
              className="w-full rounded-3xl border border-gray-300 text-base p-6"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </section>
    </>
  );
}