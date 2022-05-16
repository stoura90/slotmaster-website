import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useTranslation ,withTranslation} from 'react-i18next';
//language files

//en
import main_en from "./locales/en/main.json";
import main_ru from "./locales/ru/main.json";
import main_es from "./locales/es/main.json";



i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        whitelist: ['ru', 'en', 'es'],
        preload: ['ru', 'en', 'es'],
        lng: localStorage.getItem("i18nextLng")||'en',
        debug: true,

        interpolation: {
            escapeValue: false,
        },
        resources: {
            ru: {
                main: main_ru,
            },
            en: {
                main: main_en,
            },
            es: {
                main: main_es
            }
        },
        ns: ["main"],
        defaultNS: "main"
    });


export  {
    i18n,
    useTranslation,
    withTranslation,
}
