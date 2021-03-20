import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useTranslation ,withTranslation} from 'react-i18next';
//language files

//ka
import main_ka from "./locales/ka/main.json";



i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'ka',
        lng: 'ka',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            ka: {
                main: main_ka,
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
