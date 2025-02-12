import {useTranslation} from "react-i18next"
import {Users} from "lucide-react";

export function HeaderTraveler({traveler}: {traveler: any}) {
  const {t} = useTranslation(["header"])

  return (
    <header className="mb-6">
      <section className={"flex items-center gap-1 justify-start"}>
        <Users className="w-4 h-4 text-gray-800 mx-4"/>
        <div className="flex flex-col w-full">
          <h1 className="text-2xl sm:text-3xl font-stretch-75 font-medium">{traveler.length > 1 ? t("label-title-travelers-page") : t("label-title-traveler-page")}</h1>
          <p className="text-sm text-gray-800 hidden sm:block">
            {t("label-description-traveler-page")}{" "}
            <a href="#" className="text-blue-600 hover:underline">{t("label-link-privacy-policy")}</a>
          </p>
        </div>
      </section>
    </header>
  )
}