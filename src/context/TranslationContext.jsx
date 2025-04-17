import React, { createContext, useContext, useEffect, useState } from "react";

const TranslationContext = createContext();

export const useTranslations = () => useContext(TranslationContext);

const supportedLanguages = ["fa", "en", "de"];

export const TranslationProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [selectedLang, setSelectedLang] = useState("fa");

  useEffect(() => {
    const storedData = localStorage.getItem("translationsData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const saveToStorage = (updatedData) => {
    localStorage.setItem("translationsData", JSON.stringify(updatedData));
    setData(updatedData);
  };

  const addKeyword = (key) => {
    if (!key.trim()) return;
    if (data.some((item) => item.key === key.trim())) return;

    const newData = [...data, { key: key.trim(), translations: {} }];
    saveToStorage(newData);
  };

  const deleteKeyword = (key) => {
    const updatedData = data.filter((item) => item.key !== key);
    saveToStorage(updatedData);
  };

  const updateTranslation = (key, lang, value) => {
    const updatedData = data.map((item) =>
      item.key === key
        ? {
            ...item,
            translations: {
              ...item.translations,
              [lang]: value,
            },
          }
        : item
    );
    saveToStorage(updatedData);
  };

  return (
    <TranslationContext.Provider
      value={{
        data,
        supportedLanguages,
        selectedLang,
        setSelectedLang,
        addKeyword,
        deleteKeyword,
        updateTranslation,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};
