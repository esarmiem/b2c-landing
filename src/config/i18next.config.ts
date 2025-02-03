import i18n from "i18next";
import Backend from "i18next-http-backend"
import {initReactI18next} from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"


i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next).init({
    fallbackLng: 'es',
    interpolation: {
        escapeValue: false,
    },
    detection: {
        order: ["localStorage", "cookie", "navigator", "htmlTag"],
        caches: ["localStorage", "cookie"], // Guarda el idioma en localStorage y cookies
    }
})