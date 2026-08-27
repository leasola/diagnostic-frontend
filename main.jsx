import React from "react";
import ReactDOM from "react-dom/client";
import DiagnosticFR from "./DiagnosticFR.jsx";
import DiagnosticEN from "./DiagnosticEN.jsx";

// La version anglaise s'affiche sur toute URL commençant par /en
// (ex: ton-site.vercel.app/en) — sinon c'est la version française.
function App() {
  const isEnglish = window.location.pathname.startsWith("/en");
  return isEnglish ? <DiagnosticEN /> : <DiagnosticFR />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
