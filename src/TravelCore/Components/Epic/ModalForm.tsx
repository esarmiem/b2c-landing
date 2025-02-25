import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, Loader2 } from "lucide-react";
//import { useTranslation } from "react-i18next";
import useData from "@/TravelCore/Hooks/useData.ts";
import {useState}  from "react";

interface ModalProps {
  isOpen: boolean,
  toggleModal: () => void,
  onClick: () => void
}

export const ModalForm = ({ isOpen, toggleModal, onClick }: ModalProps) => {
  const {setData} = useData() || {};
  const [modalForm, setModalForm] = useState({"phone": "", "email":""})
  const [loadingSave, setLoadingSave] = useState(false)

  const handleChange = (e: any) => {
    setModalForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  }

  const handleSave = () => {
    setData?.((prevData) => ({
      ...prevData,
      payloadOrder: {
        ...prevData?.payloadOrder,
        telefono: modalForm.phone,
        email: modalForm.email
      }
    }));
    setLoadingSave(true)
    setTimeout(() => {
      toggleModal()
      onClick()
      setLoadingSave(true)
    }, 2000);
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>

          {/*<DialogDescription className="flex items-center gap-2 text-md md:text-xl font-medium text-gray-700">
            <Loader2 className="h-5 w-5 animate-spin text-red-600" />
            {t("label-title-loader")}
          </DialogDescription>*/}

        </DialogHeader>
        <div className="grid gap-4 py-4">
          <h1 className="md:text-2xl text-xl font-semibold text-center text-gray-600">¡Último paso!</h1>
          <h3 className="md:text-lg text-sm text-center text-gray-500">¡Tus beneficios exclusivos están casi listos! 🌟</h3>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              name="phone"
              id="phone"
              type="tel"
              placeholder="+1 234 567 890"
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="example@example.com"
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
              onClick={handleSave}
              className="bg-red-600 hover:bg-black rounded-full h-auto px-6 font-medium ml-auto"
              disabled={loadingSave}
          >
            {loadingSave && <Loader2 className="h-5 w-5 animate-spin text-white-600"/>}
            <div className="flex items-center gap-2 font-extrabold">
              Enviar y ver mis ofertas
            </div>
            <ChevronRight />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};