import React, {useEffect, useState} from "react";
import { Plus, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import {formatCurrency} from "@/TravelCore/Utils/format.ts";
import {Plan} from "@/TravelCore/Utils/interfaces/Order.ts"
import { getProductUpdates } from "@/TravelCore/Services/Apis/Order"

interface ModalUpgradesProps {
  isOpen: boolean
  onClose: () => void
  product: Plan
}

const upgrades = [
  { id: 1, title: "label-device-protection", price: 381191, icon: "🛡️" },
  { id: 2, title: "label-sports-coverage", price: 280367, icon: "⚽" },
  { id: 3, title: "label-multi-cause-cancellation", price: 155276, icon: "❌" },
  { id: 4, title: "label-pet-medical-assistance", price: 381191, icon: "🐶" },
];

const ModalUpgrades: React.FC<ModalUpgradesProps> = ({ isOpen, onClose, product }) => {
  const { t } = useTranslation(["products"]); 
  const [selectedUpgrades, setSelectedUpgrades] = useState<number[]>([]);
  const { i18n } = useTranslation();
  const [productUpgrades, setProductUpgrades] = useState(null);

  if (!product) return null;

  const toggleUpgrade = (id: number) => {
    setSelectedUpgrades((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalUpgradesCost = selectedUpgrades.reduce(
    (total, id) => total + (upgrades.find((u) => u.id === id)?.price || 0),
    0
  );

  const totalPrice = product.price + totalUpgradesCost;

  useEffect(() => {
    // Datos que enviarás en el cuerpo de la petición GET
    const body = {
      key1: 'value1',
      key2: 'value2',
    };

    // Configuración de la petición
    const requestOptions = {
      method: 'GET', // Método GET
      headers: {
        'Content-Type': 'application/json', // Especifica el tipo de contenido
      },
      body: JSON.stringify(body), // Convierte el cuerpo a JSON
    };

    // Realizar la petición
    fetch('https://dtravelassist.com/apirest_v1/information', requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error en la petición');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Respuesta:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  }, []);

  console.log("upgrades: ", productUpgrades)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-lg p-6 rounded-xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle className="text-2xl font-bold">{t("label-upgrades")}</DialogTitle>
          </div>
          <DialogDescription className="text-gray-600">
            {t("label-select-additional-benefits")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {upgrades.map((upgrade) => (
            <button
              key={upgrade.id}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition ${
                selectedUpgrades.includes(upgrade.id)
                  ? "bg-green-100 border-green-500"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => toggleUpgrade(upgrade.id)}
            >
              <div className="flex items-center text-start gap-3">
                <span className="text-xl">{upgrade.icon}</span>
                <div>
                  <p className="font-medium">{t(upgrade.title)}</p>
                  <p className="text-xs text-gray-500">
                    {upgrade.price.toLocaleString()} {t("label-cop-per-person")}
                  </p>
                </div>
              </div>
              {selectedUpgrades.includes(upgrade.id) ? (
                <Check className="text-green-600" />
              ) : (
                <Plus className="text-gray-600" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-4 border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <p className="text-sm font-medium">{t("label-number-of-travelers")}</p>
            <p className="font-bold text-red-950">2</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-medium">{t("label-product-value-per-traveler")}</p>
            <p className="font-bold text-red-950">{formatCurrency(product.price.toString(), i18n.language === "es" ? "COP" : "USD")} {i18n.language === "es" ? "COP" : "USD"}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-bold text-red-500">{t("label-total-upgrades")}</p>
            <p className="font-bold text-red-500">{formatCurrency(totalUpgradesCost.toString(), i18n.language === "es" ? "COP" : "USD")} {i18n.language === "es" ? "COP" : "USD"}</p>
          </div>
          <div className="flex justify-between text-lg font-bold">
          <p>{t("label-total")}</p>
            <p className="text-red-950">{formatCurrency(totalPrice.toString(), i18n.language === "es" ? "COP" : "USD")} {i18n.language === "es" ? "COP" : "USD"}</p>
          </div>
        </div>

        <a href="/traveler" className="w-full rounded-full">
          <button className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600">
            {t("button-continue")}
          </button>
        </a>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpgrades;