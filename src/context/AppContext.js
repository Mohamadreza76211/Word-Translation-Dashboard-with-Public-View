import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedLang, setSelectedLang] = useState("fa");
  const [translationsData, setTranslationsData] = useState([]);

  // بارگذاری داده‌ها از localStorage هنگام بارگذاری صفحه
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("translationsData"));
    if (storedData) {
      setTranslationsData(storedData);
    }
  }, []);

  // ذخیره داده‌های جدید در localStorage
  useEffect(() => {
    localStorage.setItem("translationsData", JSON.stringify(translationsData));
  }, [translationsData]);

  return (
    <AppContext.Provider
      value={{
        selectedLang,
        setSelectedLang,
        translationsData,
        setTranslationsData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
