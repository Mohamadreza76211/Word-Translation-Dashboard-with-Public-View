import React, { createContext, useContext, useEffect, useState } from "react";

const TranslationContext = createContext();

export const useTranslations = () => useContext(TranslationContext);

// کلمات پیش‌فرض
const defaultKeywords = [
  { key: "apple", translations: { fa: "سیب", en: "Apple", de: "Apfel" } },
  { key: "banana", translations: { fa: "موز", en: "Banana", de: "Banane" } },
  { key: "car", translations: { fa: "ماشین", en: "Car", de: "Auto" } },
  { key: "dog", translations: { fa: "سگ", en: "Dog", de: "Hund" } },
  { key: "book", translations: { fa: "کتاب", en: "Book", de: "Buch" } },
];

const supportedLanguages = ["fa", "en", "de"];

export const TranslationProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [selectedLang, setSelectedLang] = useState("fa");

  useEffect(() => {
    const storedData = localStorage.getItem("translationsData");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      setData(defaultKeywords);
      localStorage.setItem("translationsData", JSON.stringify(defaultKeywords));
    }
  }, []);

  const saveToStorage = (updatedData) => {
    localStorage.setItem("translationsData", JSON.stringify(updatedData));
    setData(updatedData);
  };

  const moveKeyword = (draggedKey, targetKey) => {
    const draggedIndex = data.findIndex((item) => item.key === draggedKey);
    const targetIndex = data.findIndex((item) => item.key === targetKey);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const updatedData = [...data];
    const [draggedItem] = updatedData.splice(draggedIndex, 1);
    updatedData.splice(targetIndex, 0, draggedItem);

    saveToStorage(updatedData);
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
        moveKeyword,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};
