import React, { useEffect, useState } from "react";

const PublicView = ({ selectedLang }) => {
  const [translationsData, setTranslationsData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("translationsData"));
    if (storedData) {
      setTranslationsData(storedData);
    } else {
      setTranslationsData([]);
    }
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "24px" }}>
      <h2 style={{ marginBottom: "16px" }}>🌐 ترجمه‌ها</h2>

      {translationsData.map(({ key, translations }) => (
        <div
          key={key}
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            padding: "12px 16px",
            marginBottom: "12px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: "16px" }}>{key}</div>
          <div style={{ marginTop: "6px", color: "#333" }}>
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
