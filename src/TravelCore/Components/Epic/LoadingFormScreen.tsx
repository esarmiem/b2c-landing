import { Loader2, ChevronRight } from "lucide-react";
import LoadingGif from "../../../../Assets/loadinganimation.gif";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const countries = [
  { code: "US", flag: "🇺🇸", prefix: "+1" },
  { code: "ES", flag: "🇪🇸", prefix: "+34" },
  { code: "MX", flag: "🇲🇽", prefix: "+52" },
  { code: "COL", flag: "🇨🇴", prefix: "+57" },
  // Add more countries as needed
];

interface LoadingFormScreenProps {
  onContinue: () => void;
}

export const LoadingFormScreen: React.FC<LoadingFormScreenProps> = ({ onContinue }) => {
  const { t } = useTranslation(["home"]);

  return (
    <div className="fixed inset-0 min-h-screen bg-gray-100 grid place-items-center md:place-items-center">
  {/* Centered title outside the grid */}
  <div className="flex justify-center pt-8">
    <div className="flex items-center gap-2 pt-8 md:pt-12 text-lg md:text-xl font-medium text-gray-700">
      <Loader2 className="h-5 w-5 animate-spin text-red-600" />
      <span>{t("label-title-loader")}</span>
    </div>
  </div>

  {/* Main container with responsive grid */}
  <div className="container mx-auto px-4 py-8">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-8">
      {/* Left side - GIF */}
      <div className="flex flex-col items-center md:items-start md:w-1/2 mb-2 md:mb-0">
        <img
          src={LoadingGif}
          alt="Loading"
          className="w-[180px] h-[180px] md:w-[400px] md:h-[400px]"
        />
      </div>

      {/* Right side - Form */}
      <div className="md:w-1/2">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-md text-gray-500 mb-6">
            {t("label-text-loader")}
          </p>

          <div className="space-y-4">
            {/* Phone Input with Country Select */}
            <div className="flex gap-2">
              <Select defaultValue="US">
                <SelectTrigger className="w-[100px] bg-white rounded-full">
                  <SelectValue placeholder="🏳️" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <span className="flex items-center gap-2">
                        {country.flag} {country.prefix}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex-1">
                <Input
                  type="tel"
                  placeholder={t("label-placeholder-loader-phone")}
                  className="w-full bg-white rounded-full"
                />
              </div>
            </div>

            {/* Email Input */}
            <Input
              type="email"
              placeholder={t("label-placeholder-loader-email")}
              className="bg-white rounded-full"
            />

            {/* Continue Button */}
            <Button 
              className="bg-red-600 hover:bg-black rounded-full w-full h-auto"
              onClick={onContinue}
            >
              {t("label-button-loader-continue")}
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};