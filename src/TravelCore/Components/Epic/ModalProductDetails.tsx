import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Product {
    name: string;
    price: string;
    originalPrice: string;
    subtitle: string;
    typeOfProduct: string;
}

interface ModalProductDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
}

const ModalProductDetails: React.FC<ModalProductDetailsProps> = ({ isOpen, onClose, product }) => {
    if (!product) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-6 rounded-xl text-center">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-center">{product.name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-3">
                    <p className="text-lg  font-semibold">{product.subtitle}</p>
                    <p className="text-lg font-bold">Precio Total:</p>
                    <p className="text-4xl font-bold text-stone-800">{product.price}</p>
                    <p className="text-neutral-400 line-through">{product.originalPrice}</p>
                    <div className="bg-red-700 text-white py-2 text-center text-sm mt-3 rounded-full mx-auto px-4 inline-block" >
                        {product.typeOfProduct}
                    </div>
                </div>

                {/* Aquí se mapean los datos de los beneficios */}
                <ul className="mt-2 text-sm text-start text-gray-700 max-h-40 overflow-y-auto border rounded-lg">
                    {[
                        "Asistencia médica por accidente: Hasta USD 35,000",
                        "Cobertura de enfermedades no preexistentes, incluyendo COVID-19",
                        "Asistencia médica para enfermedades preexistentes: Hasta USD 500",
                        "Atención médica telefónica incluida",
                        "Cobertura en múltiples países",
                        "Atención 24/7 en tu idioma",
                        "Gastos de hospitalización cubiertos",
                        "Medicamentos recetados incluidos",
                        "Evacuación médica de emergencia",
                        "Repatriación sanitaria en caso necesario",
                    ].map((detail, idx) => (
                        <li key={idx} className="flex items-start align-middle border-b p-3 mt-0">
                            ✅ {detail}
                        </li>
                    ))}
                </ul>

            </DialogContent>
        </Dialog>
    );
};

export default ModalProductDetails;
