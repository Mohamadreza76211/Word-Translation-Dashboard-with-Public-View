import React, { useState } from "react";
import AdminDashboard from "./components/AdminDashboard";
import PublicView from "./components/PublicView";
import LanguageSelector from "./components/LanguageSelector";

const App = () => {
  const [selectedLang, setSelectedLang] = useState("fa");
  const [view, setView] = useState("admin");

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f2f2f2",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <LanguageSelector
          selectedLang={selectedLang}
          onChange={setSelectedLang}
        />
        <button
          onClick={() => setView(view === "admin" ? "public" : "admin")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#009688",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {view === "admin" ? "نمایش عمومی" : "پنل مدیریت"}
        </button>
      </div>

      {view === "admin" ? (
        <AdminDashboard selectedLang={selectedLang} />
      ) : (
        <PublicView selectedLang={selectedLang} />
      )}
    </div>
  );
};

export default App;
