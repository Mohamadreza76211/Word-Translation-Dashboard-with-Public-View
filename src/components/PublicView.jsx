import React from "react";
import { useTranslations } from "../context/TranslationContext";

const PublicView = () => {
  const { data, selectedLang } = useTranslations();

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "24px" }}>
      <h2 style={{ marginBottom: "16px" }}>🌐 ترجمه‌ها</h2>

      {data.map(({ key, translations }) => (
        <div
          key={key}
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "12px 16px",
            marginBottom: "12px",
          }}
        >
          <strong>{key}</strong>
          <div>
            {translations[selectedLang] || (
              <span style={{ color: "red" }}>ترجمه موجود نیست</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PublicView;
