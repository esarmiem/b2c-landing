import { useState, useRef, useEffect } from 'react';
import { Link } from "../Raw/Link";
import { ShieldPlus } from "lucide-react";
import { useTranslation } from "react-i18next";

export const DropdownHeader: React.FC = () => {
  const { t } = useTranslation(["header"])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    // Define el tipo de la función antes de su uso
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative items-center text-left hidden lg:flex">
      <div>
        <button 
          type="button" 
          className="inline-flex w-full justify-center gap-x-0.3 text-sm font-medium text-gray-600 hover:text-gray-900" 
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          {t('label-link-products')}
          <svg 
            className={`-mr-1 size-5 text-gray-600 hover:text-gray-900 transform transition-transform ${
              isDropdownOpen ? 'rotate-180' : ''
            }`} 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            aria-hidden="true" 
            data-slot="icon"
          >
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isDropdownOpen && (
        <div 
          className="absolute right-0 z-10 mt-40 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden" 
          role="menu" 
          aria-orientation="vertical" 
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <div className="items-center flex px-4 py-2 text-sm">
              <ShieldPlus className="h-4 w-4 mr-2" />
              <Link 
                href="https://wc.mitravelkit.com/asistencia-al-viajero/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                {t('label-link-assist')}
              </Link>
            </div>

            <div className="items-center flex px-4 py-2 text-sm">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="lucide lucide-card-sd"
              >
                <path d="M6 22a2 2 0 0 1-2-2V6l4-4h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2Z" />
                <path d="M8 10V7.5" />
                <path d="M12 6v4" />
                <path d="M16 6v4" />
              </svg>
              <Link 
                href="#"
                target=""
                rel="noopener noreferrer" 
                className="text-sm font-medium ml-2 text-gray-600 hover:text-gray-900"
              >
                {t('label-link-comms')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownHeader;