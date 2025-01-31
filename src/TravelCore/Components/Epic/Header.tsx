import { Link } from "../Raw/Link";
import { Menu, Headset, Languages } from "lucide-react";
import { DropdownHeader } from "./DropdownHeader";
import { useTranslation } from "react-i18next";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "default";
  size?: "icon" | "default";
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  className = "",
  children,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium";
  const variantClasses =
    variant === "ghost" ? "hover:bg-gray-100 text-gray-700" : "";
  const sizeClasses = size === "icon" ? "h-10 w-10" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation(["header"])
  return (
    <header className="fixed top-0 w-full bg-white z-50">
      {/* OLD NAVBAR TRANSPARENTEEE <header className="fixed top-0 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 z-50"></header> */}
      <div className="flex h-14 items-center justify-between px-4 md:px-20">
        <Link href="/" className="font-extrabold text-xl text-red-700">
          TRAVELKIT
        </Link>
        <div className="flex items-center gap-6">
          <div className="items-center hidden md:flex ">
            <Headset className="h-4 w-4 mr-2  text-gray-600 hover:text-gray-900"/>
            <Link
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              {t('label-link-sales')}: +57 317 5032 200
            </Link>
          </div>

          <div className="items-center hidden md:flex">
            <Link
                href={'#'}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Blogs
            </Link>
          </div>

          {/* productos */}
          <DropdownHeader />
          {/* productos */}

          <div className="items-center hidden md:flex">
            <Link
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              {t('label-link-agency')}
            </Link>
          </div>
          {/* TODO: Quitar el cambio de idioma de este lugar, solo lo puse para pruebas mientras el sidebar se desarrolla */}
          <div className="items-center hidden md:flex">
            <Link
                onClick={() => i18n.changeLanguage(i18n.language == 'es' ? 'en' : 'es')}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <Languages className="h-4 w-4 mr-2  text-gray-600 hover:text-gray-900"/>
            </Link>
          </div>

          <Button variant="ghost" size="icon" className="">
            <Menu className="h-5 w-5"/>
          </Button>
        </div>
      </div>
    </header>
  );
};
