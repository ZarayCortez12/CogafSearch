import React from "react";
import noEncontrado from "../images/noEncontrado.jpg";

function NoEncontrado({ backgroundColor }) {
  // Determina el color del texto basado en el color de fondo
  const textColor = backgroundColor === "bg-while" ? "text-black" : "text-white";

  return (
    <div className={`p-10 flex justify-center m-15 ${backgroundColor}`}>
      <div className="rounded border-dashed border-4 border-green-300 p-10 mb-5 w-full">
        <h1 className={`text-3xl text-center mb-10 font-serif font-bold ${textColor}`} style={{ textShadow: '0px 2px 4px #98FFD9' }}>We have not found results for your question</h1>

        <div className="flex justify-center"> {/* Contenedor para centrar verticalmente */}
          <img src={noEncontrado} className="w-96 h-96" />
        </div>
      </div>
    </div>
  );
}

export default NoEncontrado;
