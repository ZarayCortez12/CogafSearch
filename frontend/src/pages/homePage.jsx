import React, { useState } from "react";

import NavBar from "../components/NavBar";
import Buscador from "../components/Buscador";
import Preguntas from "../components/Preguntas";
import NoEncontrado from "../components/NoEncontrado";
import Encontrado from "../components/Encontrado";

function homePage() {
  const [backgroundColor, setBackgroundColor] = useState("bg-while");

  const handleBackgroundChange = () => {
    setBackgroundColor(backgroundColor === "bg-while" ? "bg-black" : "bg-while");
  };

  return (
    <>
      <NavBar onBackgroundChange={handleBackgroundChange} />
      <Buscador />
      <Preguntas backgroundColor={backgroundColor} />
      {/*  <NoEncontrado backgroundColor={backgroundColor} />
      <Encontrado backgroundColor={backgroundColor} />   */}
      
    </>
  );
}

export default homePage;