import React from "react";
import { useTranslations } from "../context/TranslationContext";

const LanguageSelector = () => {
  const { selectedLang, setSelectedLang, supportedLanguages } =
    useTranslations();

  return (
    <select
      value={selectedLang}
      onChange={(e) => setSelectedLang(e.target.value)}
      style={{
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        marginBottom: "20px",
      }}
    >
      {supportedLanguages.map((lang) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
