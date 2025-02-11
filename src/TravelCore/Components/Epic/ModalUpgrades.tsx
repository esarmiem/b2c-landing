import React, { useState } from "react";
import { Plus, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ModalUpgradesProps {
  isOpen: boolean;
  onClose: () => void;
  product: { name: string; price: number } | null;
}

const upgrades = [
  { id: 1, title: "Protección de dispositivos hasta USD 2.000", price: 381191, icon: "🛡️" },
  { id: 2, title: "Deportes hasta USD 20.000", price: 280367, icon: "⚽" },
  { id: 3, title: "Extra cancelación multi causa hasta USD 2.000", price: 155276, icon: "❌" },
  { id: 4, title: "Asistencia médica para mascotas hasta USD 2.000", price: 381191, icon: "🐶" },
];

const ModalUpgrades: React.FC<ModalUpgradesProps> = ({ isOpen, onClose, product }) => {
  const [selectedUpgrades, setSelectedUpgrades] = useState<number[]>([]);

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-lg p-6 rounded-xl"  >
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle className="text-2xl font-bold">Upgrades</DialogTitle>
          </div>
          <DialogDescription className="text-gray-600">
            Selecciona los beneficios adicionales que desea agregar
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
                  <p className="font-medium">{upgrade.title}</p>
                  <p className="text-xs text-gray-500">
                    {upgrade.price.toLocaleString()} COP por persona
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
            <p className="text-sm font-medium">Número de viajeros:</p>
            <p className="font-bold text-red-950">2</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-medium">Valor producto por viajero:</p>
            <p className="font-bold text-red-950">{product.price.toLocaleString()} COP</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-bold text-red-500">Total Upgrades:</p>
            <p className="font-bold text-red-500">{totalUpgradesCost.toLocaleString()} COP</p>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <p>TOTAL:</p>
            <p className="text-red-950">{totalPrice.toLocaleString()} COP</p>
          </div>
        </div>

        <button className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600">
          Continuar
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpgrades;
