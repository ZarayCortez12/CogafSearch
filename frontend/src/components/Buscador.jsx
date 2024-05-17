import React, { useState } from "react";
import { IoSearchCircleSharp, IoCloseOutline } from "react-icons/io5";
import axios from "axios";

function Buscador() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue("");
  };

  const handleSearch = async () => {
    if (inputValue.trim()) {
      try {
        const response = await axios.post(
          "http://localhost:4000/defineQuestion",
          { question: inputValue }
        );
        console.log("Mensaje del servidor:", response.data);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    }
  };

  return (
    <div className="bg-green-300 flex flex-col items-center justify-center p-20">
      <h1 className="text-3xl mb-10 font-serif font-bold">
        ¿Qué quieres consultar hoy?
      </h1>

      <div className="flex items-center border rounded-full p-2 mt-4 bg-white shadow-lg w-9/12 relative">
        <input
          type="text"
          placeholder="Escribe aquí tu pregunta..."
          className="flex-grow outline-none pl-6 w-full"
          value={inputValue}
          onChange={handleChange}
        />
        {inputValue.length > 0 && (
          <IoCloseOutline
            className="text-green-300 text-3xl ml-2 cursor-pointer"
            onClick={clearInput}
          />
        )}
        <IoSearchCircleSharp
          className="text-green-300 text-3xl ml-2 cursor-pointer"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}

export default Buscador;
