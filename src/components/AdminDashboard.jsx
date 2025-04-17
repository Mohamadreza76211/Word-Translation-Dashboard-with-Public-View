import React, { useState } from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { useTranslations } from "../context/TranslationContext";
import Alert from "./Alert";
import "./styles/AdminDashboard.scss";

const AdminDashboard = () => {
  const {
    data,
    supportedLanguages,
    addKeyword,
    deleteKeyword,
    updateTranslation,
    moveKeyword,
  } = useTranslations();

  const [newKeyword, setNewKeyword] = useState("");
  const [isEditing, setIsEditing] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleAddKeyword = () => {
    if (!newKeyword.trim()) {
      setErrorMessage("لطفاً ابتدا کلمه را وارد کنید!");
      setAlertType("warning");
      setTimeout(() => {
        setErrorMessage("");
        setAlertType("");
      }, 2000);
      return;
    }

    if (data.some((item) => item.key === newKeyword.trim())) {
      setErrorMessage("کلمه وارد شده تکراری است!");
      setAlertType("warning");
      setTimeout(() => {
        setErrorMessage("");
        setAlertType("");
      }, 2000);
      return;
    }

    addKeyword(newKeyword);
    setNewKeyword("");
    setErrorMessage("با موفقیت اضافه شد!");
    setAlertType("success");
    setTimeout(() => {
      setErrorMessage("");
      setAlertType("");
    }, 2000);
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
  };

  const handleTranslationChangeMulti = (key, lang, value) => {
    updateTranslation(key, lang, value);
  };

  const handleDragStart = (key) => {
    setDraggedItem(key);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetKey) => {
    if (draggedItem && draggedItem !== targetKey) {
      moveKeyword(draggedItem, targetKey);
    }
    setDraggedItem(null);
  };

  const handleCloseAlert = () => {
    setErrorMessage("");
    setAlertType("");
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

      {errorMessage && (
        <Alert
          message={errorMessage}
          type={alertType}
          onClose={handleCloseAlert}
        />
      )}

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
            <tr
              key={key}
              style={{ backgroundColor: "#f9f9f9" }}
              draggable
              onDragStart={() => handleDragStart(key)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(key)}
            >
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
                  onClick={() => deleteKeyword(key)}
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
