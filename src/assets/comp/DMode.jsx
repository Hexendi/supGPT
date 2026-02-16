import React from "react";
import { useDarkMode } from "@react-hooks-hub/use-dark-mode";
import  { useEffect } from "react"; 

import { MdOutlineWbSunny } from "react-icons/md";

export default function DarkM() {
 
  const { darkMode, switchMode } = useDarkMode({ 
    persistence: true, 
    defaultMode: 'ligth' 
  });

  useEffect(() => {
    const img = document.getElementById('logo');
    if (darkMode) {
      document.body.classList.add("dark");

        img.style.filter = "brightness(0) grayscale(1%)";
     
    

    } else {
      document.body.classList.remove("dark");
      img.style.filter = "brightness(100) grayscale(100%)";
    }
  }, [darkMode]); 
  return (
    <div>
     <MdOutlineWbSunny 
        onClick={() => switchMode(darkMode ? 'light' : 'dark')} 
       />
      
    </div>
  );
}