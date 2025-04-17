import React from "react";

const LanguageSelector = ({ selectedLang, onChange }) => {
  const supportedLanguages = ["fa", "en", "de"];

  return (
    <select
      value={selectedLang}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #ccc",
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
