import { Input } from "@/components/ui/input.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { PhoneNumberForm } from "@/TravelCore/Components/Epic/PhoneNumberForm.tsx";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useMasters from "@/TravelCore/Hooks/useMasters";
import { CitiesItems } from "@/TravelCore/Utils/interfaces/Cities.ts";
import { DocumentTypeItems } from "@/TravelCore/Utils/interfaces/Document.ts";
import { PaxForm } from "@/TravelCore/Utils/interfaces/Order.ts";

interface BillingFormProps {
    onChangeField?: (index: number, name: string, value: string) => void;
    data: PaxForm[]; // `data` es un array de PaxForm
}

export function BillingForm({ onChangeField, data }: BillingFormProps) {
    const { t } = useTranslation(["invoice"]);
    const [usePassengerInfo, setUsePassengerInfo] = useState(false);
    const master = useMasters();

    // Asegúrate de que `cities` y `documentType` no sean `undefined`
    const cities = (master?.cities?.data as unknown as CitiesItems[]) || [];
    const documentType = (master?.documents.data?.items as DocumentTypeItems[]) || [];

    // Filtra las ciudades y tipos de documento activos
    const activeCities = cities.filter(city => city.estaActivo);
    const activeDocumentType = documentType.filter(type => type.estaActivo);

    // Opciones para los selects
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

    // Maneja cambios en los inputs
    const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChangeField?.(0, name, value); // Usa el índice 0 (o el que corresponda)
    }, [onChangeField]);

    // Maneja cambios en los selects
    const handleSelectChange = React.useCallback((name: string, value: string) => {
        onChangeField?.(0, name, value); // Usa el índice 0 (o el que corresponda)
    }, [onChangeField]);

    // Asegúrate de que `data` tenga al menos un elemento
    const currentData = data[0] || {};

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
                            name="firstName"
                            value={currentData.firstName || ""}
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
                            value={currentData.lastName || ""}
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
                            value={currentData.documentType || ""}
                            onValueChange={(value) => handleSelectChange("documentType", value)}
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
                            value={currentData.documentNumber || ""}
                            placeholder={t("billing-placeholder-document-number")}
                            className="rounded-3xl border-gray-300 p-6"
                            onChange={handleInputChange}
                        />
                    </div>
                    <PhoneNumberForm
                        celType="Teléfono"
                        value={{ phone: currentData.phone || "", countryCode: currentData.countryCode || "" }}
                        onChange={(name, value) => {
                            if (onChangeField) {
                                onChangeField(0, name, value); // Asegúrate de pasar el índice, name y value.
                            }
                        }}
                    />
                    <div>
                        <label className="block font-semibold text-gray-500 text-sm mb-1">
                            {t("billing-email")}
                        </label>
                        <Input
                            name="email"
                            value={currentData.email || ""}
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
                            value={currentData.billingCountry || ""}
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
                            value={currentData.billingCity || ""}
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
                            value={currentData.address || ""}
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
                            value={currentData.additional || ""}
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