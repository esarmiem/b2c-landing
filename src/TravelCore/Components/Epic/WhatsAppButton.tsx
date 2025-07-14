import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from "react-i18next"; 
import { Link } from "../Raw/Link"; 

export const WhatsAppButton = () => {
  const { t } = useTranslation(["home"]); 
  const phoneNumber = '573180388933';
  const message = t("whatsapp-message"); 

  const handleClick = (e: { preventDefault: () => void; currentTarget: any; clientX: number; clientY: number; }) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.classList.add('ripple-effect');

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove(); // Eliminar el efecto de ripple después de 500ms
      window.open(button.href, '_blank', 'noopener,noreferrer'); // Abrir enlace en una nueva pestaña
    }, 500);
  };

  return (
    <Link
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 flex items-center gap-2 shadow-lg hover:bg-green-600 transition-all transform hover:-translate-y-1 z-50"
      onClick={handleClick}
    >
      <FaWhatsapp className="w-5 h-5" />
      <span className="font-medium hidden md:flex">
        {t("whatsapp-button-text")} 
      </span>
    </Link>
  );
};