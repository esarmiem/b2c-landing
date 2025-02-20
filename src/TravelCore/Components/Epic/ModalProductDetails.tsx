import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Product {
    name: string;
    price: string;
    originalPrice: string;
    subtitle: string;
    details: string[];
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
                    <p className="text-center text-base  font-semibold">{product.subtitle}</p>
                </DialogHeader> 

                {/* Aquí se mapean los datos de los beneficios */}
                <ul className="mt-2 text-sm text-start text-gray-700 max-h-80 overflow-y-auto border rounded-lg">
                    {product.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start align-middle border-b p-3">
                            ✅ {detail}
                        </li>
                    ))}
                </ul>

            </DialogContent>
        </Dialog>
    );
};

export default ModalProductDetails;
