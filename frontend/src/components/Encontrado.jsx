import React from "react";
import encontrado from "../images/encontrado.jpg";

function Encontrado({ backgroundColor }) {
  // Determina el color del texto basado en el color de fondo
  const textColor = backgroundColor === "bg-while" ? "text-black" : "text-white";

  return (
    <div className={`p-4 flex items-center justify-around m-15  ${backgroundColor}`}>
      <div className="m-10">
        <img src={encontrado} className="w-auto h-96" />
      </div>

      <div className="rounded border-dashed border-4 border-green-300 p-10 w-1/2 h-auto mb-5">
        <h1 className={`text-3xl text-center mb-10 font-serif font-bold ${textColor}`} style={{ textShadow: '0px 2px 4px #98FFD9' }}>Resultado Encontrado</h1>

        <h2 className={`text-2xl text-center mb-10 font-serif ${textColor}`}>
          La plataforma ofrece una variedad de estrategias y herramientas 
          diseñadas para mejorar habilidades cognitivas y emocionales mediante 
          el modelo COGAF. Esto incluye ejercicios prácticos para identificar y
          gestionar emociones, técnicas de reestructuración cognitiva, actividades
          de autoconciencia y recursos educativos sobre el modelo COGAF. También
          proporciona acceso a programas de entrenamiento y herramientas interactivas
          para aplicar estos principios en situaciones reales.
        </h2>
      </div>
    </div>
  );
}

export default Encontrado;
