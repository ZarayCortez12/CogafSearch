import React, { useState } from "react";
import { RiSearchEyeLine } from "react-icons/ri";
import { IoSunny, IoMoon } from "react-icons/io5";

function NavBar({ onBackgroundChange }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleBackgroundChange = () => {
    onBackgroundChange();
  };

  return (
    <div className={`flex bg-green-300 text-white justify-between p-10 text-3xl font-bold border-b-2 border-gray-400`}>
      <div className="flex items-center">
        <h1>CogafSe</h1>
        <RiSearchEyeLine />
        <h1>rch</h1>
      </div>
      <div className="flex items-center">
        <button onClick={handleBackgroundChange}><IoSunny className={`${darkMode ? "block" : "hidden"}`} onClick={toggleDarkMode} />
        <IoMoon className={`${darkMode ? "hidden" : "block"}`} onClick={toggleDarkMode} /></button>
      </div>
    </div>
  );
}

export default NavBar;
