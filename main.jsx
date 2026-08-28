import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { inject } from "@vercel/analytics";
import DiagnosticFR from "./DiagnosticFR.jsx";
import DiagnosticEN from "./DiagnosticEN.jsx";

inject();

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Epilogue:wght@400;500;600;700&display=swap');
`;

const COLORS = {
  cream: "#F5F1EA",
  burgundy: "#591B34",
  burgundySoft: "#7C3555",
  turquoise: "#1C9C93",
  greige: "#C9BFAF",
};

function LanguageSelect({ onSelect }) {
  return (
    <div
      style={{
        fontFamily: "'Epilogue', sans-serif",
        background: COLORS.cream,
        minHeight: "100vh",
        color: COLORS.burgundy,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <style>{FONTS}</style>
      <div style={{ width: "100%", maxWidth: 400, textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: 28,
            margin: "0 0 12px",
          }}
        >
          Choisis ta langue
          <br />
          <span style={{ fontStyle: "italic", color: COLORS.burgundySoft }}>Choose your language</span>
        </h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 28 }}>
          <button
            onClick={() => onSelect("fr")}
            style={{
              padding: "16px 24px",
              borderRadius: 999,
              border: "none",
              background: COLORS.burgundy,
              color: COLORS.cream,
              fontFamily: "'Epilogue', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            🇫🇷 Français
          </button>
          <button
            onClick={() => onSelect("en")}
            style={{
              padding: "16px 24px",
              borderRadius: 999,
              border: `1.5px solid ${COLORS.burgundy}`,
              background: "transparent",
              color: COLORS.burgundy,
              fontFamily: "'Epilogue', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            🇬🇧 English
          </button>
        </div>
      </div>
    </div>
  );
}

// Si l'URL commence par /en (ex: lien envoyé à une audience anglophone),
// on saute directement à la version anglaise. Sinon, on affiche un choix.
function App() {
  const forcedLang = window.location.pathname.startsWith("/en") ? "en" : null;
  const [lang, setLang] = useState(forcedLang);

  if (lang === "en") return <DiagnosticEN />;
  if (lang === "fr") return <DiagnosticFR />;
  return <LanguageSelect onSelect={setLang} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
