import { FC } from 'react';
import { useTranslation } from 'react-i18next'; 

interface StepProps {
  number: number;
  text: string;
  isActive?: boolean;
  showDivider?: boolean;
}

const Step: FC<StepProps> = ({ number, text, isActive = false, showDivider = false }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <div
          className={`${
            isActive
              ? 'bg-red-600 text-white'
              : 'border-2 border-gray-300 text-gray-500'
          } rounded-full w-6 h-6 flex items-center justify-center text-sm`}
        >
          {number}
        </div>
        <span
          className={`ml-2 ${
            isActive ? 'text-red-600 font-medium' : 'text-gray-500'
          } text-sm md:text-base`}
        >
          {text}
        </span>
      </div>
      {showDivider && (
        <div className="h-[2px] w-4 md:w-32 mx-2 md:mx-4 border-t-2 border-dashed border-gray-300" />
      )}
    </div>
  );
};

export const Breadcrumb: FC = () => {
  const { t } = useTranslation(["products"]); 

  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-5xl mx-auto py-4 md:py-9">
        <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap md:flex-nowrap">
          <Step
            number={1}
            text={t("label-step-1")}
            isActive={true}
            showDivider={true}
          />
          <Step 
            number={2} 
            text={t("label-step-2")}
            showDivider={true} 
          />
          <Step 
            number={3} 
            text={t("label-step-3")}
          />
        </div>
      </div>
    </div>
  );
};