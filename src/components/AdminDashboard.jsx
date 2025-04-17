import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import "./styles/AdminDashboard.scss";

const supportedLanguages = ["fa", "en", "de"];

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [isEditing, setIsEditing] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("translationsData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const handleAddKeyword = () => {
    if (!newKeyword.trim()) return;
    if (data.some((item) => item.key === newKeyword.trim())) {
      alert("این کلید از قبل وجود دارد.");
      return;
    }

    const newEntry = {
      key: newKeyword.trim(),
      translations: {},
    };
    const newData = [...data, newEntry];
    setData(newData);
    setNewKeyword("");
    localStorage.setItem("translationsData", JSON.stringify(newData));
  };

  const handleDeleteKeyword = (key) => {
    const updatedData = data.filter((item) => item.key !== key);
    setData(updatedData);
    localStorage.setItem("translationsData", JSON.stringify(updatedData));
  };

  const handleEditClick = (key, lang) => {
    setIsEditing((prev) => ({ ...prev, [`${key}_${lang}`]: true }));
  };

  const handleConfirmClickMulti = (key) => {
    const updatedEditing = {};
    supportedLanguages.forEach((lang) => {
      updatedEditing[`${key}_${lang}`] = false;
    });
    setIsEditing((prev) => ({ ...prev, ...updatedEditing }));
    localStorage.setItem("translationsData", JSON.stringify(data));
  };

  const handleTranslationChangeMulti = (key, lang, value) => {
    const newData = data.map((item) =>
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
    setData(newData);
  };

  return (
    <div className="container">
      <h2>داشبورد مدیریت ترجمه‌ها</h2>

      <div className="input-wrapper">
        <input
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          placeholder="کلید جدید را وارد کنید (مثلاً: apple)"
        />
        <button onClick={handleAddKeyword}>افزودن کلید</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>کلمه</th>
            {supportedLanguages.map((lang) => (
              <th key={lang}>ترجمه ({lang})</th>
            ))}
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ key, translations }) => (
            <tr key={key} style={{ backgroundColor: "#f9f9f9" }}>
              <td>{key}</td>
              {supportedLanguages.map((lang) => (
                <td key={lang}>
                  {isEditing[`${key}_${lang}`] ? (
                    <input
                      value={translations[lang] || ""}
                      placeholder={`مثلاً: apple (${lang})`}
                      onChange={(e) =>
                        handleTranslationChangeMulti(key, lang, e.target.value)
                      }
                    />
                  ) : (
                    translations[lang] || <span>ترجمه موجود نیست</span>
                  )}
                </td>
              ))}
              <td>
                {supportedLanguages.some(
                  (lang) => isEditing[`${key}_${lang}`]
                ) ? (
                  <button
                    onClick={() => handleConfirmClickMulti(key)}
                    className="confirm-btn"
                  >
                    <FaCheck /> تایید
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      supportedLanguages.forEach((lang) =>
                        handleEditClick(key, lang)
                      )
                    }
                    className="edit-btn"
                  >
                    <FaEdit /> ویرایش
                  </button>
                )}
                <button
                  onClick={() => handleDeleteKeyword(key)}
                  className="delete-btn"
                >
                  <FaTrash /> حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
