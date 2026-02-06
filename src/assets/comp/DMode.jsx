import React from "react";
import { useDarkMode } from "@react-hooks-hub/use-dark-mode";
import  { useEffect } from "react"; 

export default function DarkM() {
 
  const { darkMode, switchMode } = useDarkMode({ 
    persistence: true, 
    defaultMode: 'dark' 
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]); 
  return (
    <div>
      <button 
        onClick={() => switchMode(darkMode ? 'light' : 'dark')} 
        style={{ padding: "10px" }}>
        mode
      </button>
    </div>
  );
}