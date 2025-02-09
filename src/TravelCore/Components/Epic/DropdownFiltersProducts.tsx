import React, { useState, useRef, useEffect } from 'react';
import { List, } from "lucide-react";

export const DropdownFiltersProducts: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
    <div ref={dropdownRef} className="relative text-left hidden md:flex">
      <div>
        <button 
          type="button" 
          className="px-4 py-1 rounded-md inline-flex w-full justify-center gap-x-1 text-sm font-medium text-gray-600 hover:text-gray-900 border" 
          onClick={toggleDropdown}
        >
          Filtros
          <svg 
            className={`-mr-1 size-5 text-gray-600 hover:text-gray-900 transform transition-transform ${
              isDropdownOpen ? 'rotate-180' : ''
            }`} 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            aria-hidden="true" 
            data-slot="icon"
          >
            <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      {isDropdownOpen && (
        <div
         className="absolute right-0 z-10 mt-10 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden" 
          role="menu"
        >
          <div className="py-1" role="none">
            <div className="items-center flex px-4 py-2 text-sm">
              <List className="w-2 h-2" />
              Ordernar 1
            </div>

            <div className="items-center flex px-4 py-2 text-sm">
            <List className="w-2 h-2" />
              Ordenar 2
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default DropdownFiltersProducts;