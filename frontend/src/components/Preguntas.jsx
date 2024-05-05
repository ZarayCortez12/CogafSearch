import React from "react";
import { IoAddCircle } from "react-icons/io5";
import preguntas from "../images/preguntas.png";

function Preguntas({ backgroundColor }) {
  // Determina el color del texto basado en el color de fondo
  const textColor = backgroundColor === "bg-while" ? "text-black" : "text-white";

  return (
    <div className={`p-4 flex items-center justify-around m-15 pt-10 ${backgroundColor}`}>
      <div className="rounded border-dashed border-4  border-green-300 p-10 w-1/2 h-auto mb-5">
        <h1 className={`text-3xl text-center mb-10 font-serif font-bold ${textColor}`}>Preguntas sugeridas</h1>
        <div className="flex flex-col">
          <div className="flex items-center space-x-2 mb-5">
            <IoAddCircle className="text-green-300"/><h1 className={`text-xl ${textColor}`}>¿Qué estrategias y 
              herramientas se pueden encontrar en la plataforma para aplicar 
              el modelo COGAF en la mejora de habilidades cognitivas y emocionales?</h1>
          </div>
          <div className="flex items-center space-x-2 mb-5">
            <IoAddCircle className="text-green-300"/><h1 className={`text-xl ${textColor}`}>¿Cómo se puede integrar el 
              modelo COGAF en el diseño y desarrollo de juegos serios y programas de
               entrenamiento emocional para maximizar su efectividad en el aprendizaje?</h1>
          </div>
          <div className="flex items-center space-x-2 mb-5">
            <IoAddCircle className="text-green-300"/><h1 className={`text-xl ${textColor}`}>¿Cuáles son las mejores prácticas
               y recomendaciones para aplicar el modelo COGAF en diferentes contextos, como 
               entornos educativos, terapéuticos o de desarrollo personal?</h1>
          </div>
        </div>
      </div>
      <div className="m-10 ">
        <img src={preguntas} className="w-96 h-96 rounded" />
      </div>
    </div>
  );
}

export default Preguntas;




