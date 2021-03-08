import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useTranslation ,withTranslation} from 'react-i18next';
//language files
//en
import en from "./locales/en/translation.json";
import verification_ka from "./locales/ka/verification.json";
//ka
import ka from "./locales/ka/translation.json";
import verification_en from "./locales/en/verification.json";
//ru
import ru from "./locales/ru/translation.json";
import verification_ru from "./locales/ru/verification.json";

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        lng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translations: en,
                verification:verification_en
            },
            ka: {
                translations: ka,
                verification:verification_ka
            },
            ru: {
                translations: ru,
                verification:verification_ru
            }
        },
        ns: ["translations","verification"],
        defaultNS: "translations"
    });


export  {
    i18n,
    useTranslation,
    withTranslation,
}
