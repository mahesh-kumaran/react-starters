import React from "react";
import "./App.css";
import LanguageList from "./components/languageLists";

function App() {
  const styledLanguage = {
    margin: "auto",
    width: "99%",
    padding: "10px",
  };
  return (
    <div style={styledLanguage}>
      <LanguageList />
    </div>
  );
}

export default App;
