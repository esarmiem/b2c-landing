import React, {memo, useState} from "react";
import { SquareUser } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { PhoneNumberForm } from "@/TravelCore/Components/Epic/PhoneNumberForm.tsx";
import { useTranslation } from "react-i18next";
import { PaxForm } from "@/TravelCore/Utils/interfaces/Order.ts";
import useMasters from "@/TravelCore/Hooks/useMasters";
import {CountriesItems} from "@/TravelCore/Utils/interfaces/countries.ts";
import {DocumentTypeItems} from "@/TravelCore/Utils/interfaces/Document.ts";
import {calculateAndCompareAge} from "@/TravelCore/Utils/dates.ts"


interface TravelFormProps {
  onChangeField?: (index: number, name: string, value: string) => void;
  traveler: { id: number; age: string; phone: string };
  dataTraveler: PaxForm;
}

export const TravelerForm = memo(({ traveler, onChangeField, dataTraveler }: TravelFormProps) => {
  const { t } = useTranslation(["traveler"]);
  const [ageError, setAgeError] = useState<string>("")
  const master = useMasters();
  const countries = master?.countries.data?.items as CountriesItems[];
  const documentType = master?.documents.data?.items as DocumentTypeItems[];
  const activeCountries = countries
  .filter(country => country.estaActivo)
  .slice() // Crear una copia superficial para no modificar el array original
  .sort((a, b) => a.descripcion.localeCompare(b.descripcion)); // Ordenar alfabéticamente
  const activeDocumentType = documentType.filter(type => type.estaActivo);
  const countryOptions = activeCountries.map(country => (
      <SelectItem key={country.idPais} value={country.idPais.toString()}>
        {country.codigoISO} - {country.descripcion}
      </SelectItem>
  ));
  const documentTypeOptions = activeDocumentType.map(type => (
      <SelectItem key={type.idTipoDocumento} value={type.abreviacion}>
        {type.abreviacion} - {type.nombre}
      </SelectItem>
  ));

  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(name === 'birthdate') {
      if (!calculateAndCompareAge(value,parseInt(traveler.age))) {
        setAgeError("La fecha de nacimiento debe coincidir con la edad del pasajero.")
      } else {
        setAgeError("")
      }
    }
        onChangeField?.(traveler.id, name, value);
    }, [traveler.id, onChangeField]);

  const handleSelectChange = React.useCallback((name: string, value: string) => {
    onChangeField?.(traveler.id, name, value);
      }, [traveler.id, onChangeField]);

  return (
      <section key={traveler.id} className="space-y-4">
        <div className="bg-[#B91C1C] text-white px-8 py-2 text-sm flex items-center gap-2 rounded-t-xl">
          <SquareUser className="w-6 h-6" />
          <h1 className="font-semibold text-xl">
            {t("label-traveler")} {traveler.id + 1} - {traveler.age} {t("label-years")}
          </h1>
        </div>

        <div className="space-y-4 p-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-500 text-sm mb-1">{t("label-first-name")}</label>
              <Input
                  name="firstName"
                  value={dataTraveler?.firstName || ""}
                  placeholder={t("placeholder-first-name")}
                  className="rounded-3xl border-gray-300 p-6"
                  onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-500 text-sm mb-1">{t("label-last-name")}</label>
              <Input
                  name="lastName"
                  value={dataTraveler?.lastName || ""}
                  placeholder={t("placeholder-last-name")}
                  className="rounded-3xl border-gray-300 p-6"
                  onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-500 text-sm mb-1">{t("label-document-type")}</label>
              <Select
                  name="documentType"
                  value={dataTraveler?.documentType || ""}
                  onValueChange={(value) => handleSelectChange("documentType", value)}
              >
                <SelectTrigger className="rounded-3xl border-gray-300 p-6">
                  <SelectValue placeholder={t("placeholder-select-document-type")} />
                </SelectTrigger>
                <SelectContent>
                  {documentTypeOptions}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block font-semibold text-gray-500 text-sm mb-1">{t("label-document-number")}</label>
              <Input
                  name="documentNumber"
                  value={dataTraveler?.documentNumber || ""}
                  placeholder={t("placeholder-document-number")}
                  className="rounded-3xl border-gray-300 p-6"
                  onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-500 text-sm mb-1">{t("label-birthdate")}</label>
              <Input
                  name="birthdate"
                  value={dataTraveler?.birthdate || ""}
                  type="date"
                  className="rounded-3xl border-gray-300 p-6"
                  onChange={handleInputChange}
              />
              <span className="text-xs text-red-500">{ageError}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-500 text-sm mb-1">{t("label-age")}</label>
                <Input
                    name="age"
                    value={traveler?.age}
                    disabled
                    className="rounded-3xl border-gray-300 p-6"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-500 text-sm mb-1">{t("label-gender")}</label>
                <Select
                    name="gender"
                    value={dataTraveler?.gender || ""}
                    onValueChange={(value) => handleSelectChange("gender", value)}
                >
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
              <Select
                  name="nationality"
                  value={dataTraveler?.nationality.toString() || ""}
                  onValueChange={(value) => handleSelectChange("nationality", value)}
              >
                <SelectTrigger className="rounded-3xl border-gray-300 p-6">
                  <SelectValue placeholder={t("placeholder-select-nationality")} />
                </SelectTrigger>
                <SelectContent>
                  {countryOptions}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block font-semibold text-gray-500 text-sm mb-1">{t("label-residence-country")}</label>
              <Select
                  name="residenceCountry"
                  value={dataTraveler?.residenceCountry.toString() || ""}
                  onValueChange={(value) => handleSelectChange("residenceCountry", value)}
              >
                <SelectTrigger className="rounded-3xl border-gray-300 p-6">
                  <SelectValue placeholder={t("placeholder-select-residence-country")} />
                </SelectTrigger>
                <SelectContent>
                  {countryOptions}
                </SelectContent>
              </Select>
            </div>
            <PhoneNumberForm celType={traveler?.phone} value={{phone: dataTraveler?.phone, countryCode: dataTraveler?.countryCode }} onChange={handleInputChange} />
            <div>
              <label className="block font-semibold text-gray-500 text-sm mb-1">{t("label-email")}</label>
              <Input
                  name="email"
                  value={dataTraveler?.email || ""}
                  type="email"
                  placeholder={t("placeholder-email")}
                  className="rounded-3xl border-gray-300 p-6"
                  onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </section>
  );
});