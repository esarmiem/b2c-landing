import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from "react-i18next"; 

export const WhatsAppButton = () => {
  const { t } = useTranslation(["home"]); 
  const phoneNumber = '57573175032200';
  const message = t("whatsapp-message"); 

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 flex items-center gap-2 shadow-lg hover:bg-green-600 transition-colors z-50"
    >
      <FaWhatsapp className="w-5 h-5" />
      <span className="font-medium hidden md:flex">
        {t("whatsapp-button-text")} 
      </span>
    </a>
  );
};