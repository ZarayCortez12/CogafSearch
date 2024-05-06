import React from "react";
import { IoAddCircle } from "react-icons/io5";
import preguntas from "../images/preguntas.png";
import { useAuth } from "../context/SearchContext.jsx";

function Preguntas({ backgroundColor }) {
  // Determina el color del texto basado en el color de fondo
  const textColor = backgroundColor === "bg-while" ? "text-black" : "text-white";

  const { search } = useAuth();

  const handleClick = async (palabras) => {
    try {
      // Supongamos que deseas enviar las palabras como parte de los datos a enviar al backend
      const data = {
        palabras: palabras
      };

      const response = await search(data);
      console.log('Respuesta del backend:', response);
    } catch (error) {
      console.error('Error al enviar la petición:', error);
    }
  };


  return (
    <div className={`p-4 flex items-center justify-around m-15 pt-10 ${backgroundColor}`}>
      <div className="rounded border-dashed border-4  border-green-300 p-10 w-1/2 h-auto mb-5">
        <h1 className={`text-3xl text-center mb-10 font-serif font-bold ${textColor}`}>Preguntas sugeridas</h1>
        <div className="flex flex-col">
          <div className="flex items-center space-x-2 mb-5">
            <IoAddCircle className="text-green-300"/><button onClick={() => handleClick('tristeza')}>¿Qué características presenta una persona cuando se siente triste?</button>
          </div>
          <div className="flex items-center space-x-2 mb-5">
            <IoAddCircle className="text-green-300"/><h1 className={`text-xl ${textColor}`}>¿Qué mecánicas debe seguir un juego serio si desea promover la atención?</h1>
          </div>
          <div className="flex items-center space-x-2 mb-5">
            <IoAddCircle className="text-green-300"/><h1 className={`text-xl ${textColor}`}>¿Por que debería implementar en mi trabajo sesiones de meditación?</h1>
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




