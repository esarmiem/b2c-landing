import { Link } from "../Raw/Link";
import { Menu, ShieldPlus } from "lucide-react";

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
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 z-50 border-b">
      <div className="flex h-14 items-center justify-between px-4 md:px-20">
        <Link href="/" className="font-extrabold text-xl text-red-700">
          TRAVELKIT
        </Link>
        <div className="flex items-center gap-4">
          <div className="items-center hidden md:flex">
            <ShieldPlus className="h-4 w-4 mr-2" />
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Asistencia Internacional
            </Link>
          </div>

          <div className="items-center hidden md:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-card-sd"
            >
              <path d="M6 22a2 2 0 0 1-2-2V6l4-4h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2Z" />
              <path d="M8 10V7.5" />
              <path d="M12 6v4" />
              <path d="M16 6v4" />
            </svg>
            <Link
              href="#"
              className="text-sm font-medium ml-2 text-gray-600 hover:text-gray-900"
            >
              Comunicación Internacional
            </Link>
          </div>

          <Button variant="ghost" size="icon" className="">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
