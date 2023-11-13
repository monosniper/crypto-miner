import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import eng from "./languages/eng.json";
import rus from "./languages/rus.json";

export default i18n.use(initReactI18next).init({
  resources: {
    eng: {
      translation: JSON.parse(JSON.stringify(eng)),
    },
    rus: {
      translation: JSON.parse(JSON.stringify(rus)),
    },
  },
  lng: localStorage.getItem("language") || "rus",

  interpolation: {
    escapeValue: false,
  },
});
