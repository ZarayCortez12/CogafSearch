import React, { useState, useEffect } from "react";
import { IoSearchCircleSharp, IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import Encontrado from "./Encontrado";
import NoEncontrado from "./NoEncontrado";
import NavBar from "../components/NavBar";
import Preguntas from "../components/Preguntas";

function Buscador() {
  const [inputValue, setInputValue] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const [error, setError] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("bg-while");
  const [questions, setQuestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showQuestions, setShowQuestions] = useState(true); // Estado para controlar la visibilidad de las preguntas

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setShowQuestions(true); // Mostrar las preguntas cuando se escribe en el input
  };

  useEffect(() => {
    handleSearchQuestions();
  }, []);

  const clearInput = () => {
    setInputValue("");
    setSearchResults([]);
  };

  const handleSearch = async (query) => {
    const question = query || inputValue;
    if (question.trim()) {
      try {
        const response = await axios.post(
          "http://localhost:4000/defineQuestion",
          { question }
        );
        setServerResponse(response.data);
        setError("");
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        setError("Error al realizar la solicitud");
        setServerResponse("");
      }
    }
  };

  const handleSearchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:4000/search");
      setQuestions(response.data.question);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleBackgroundChange = () => {
    setBackgroundColor(backgroundColor === "bg-while" ? "bg-black" : "bg-while");
  };

  const handleQuestionClick = (question) => {
    setInputValue(question);
    handleSearch(question);
    setShowQuestions(false); // Ocultar las preguntas cuando se hace clic en una de ellas
  };

  function renderQuestions() {
    const filteredQuestions = questions.filter(question =>
      question.description.toLowerCase().includes(inputValue.toLowerCase())
    );
  
    return filteredQuestions.map((question, index) => (
      <div className="flex items-center p-2 bg-white shadow-lg w-8/12 relative cursor-pointer hover:bg-green-200" 
        key={index}
        onClick={() => handleQuestionClick(question.description)}>
        <h1>{question.description}</h1>
      </div>
    ));
  }

  return (
    <>
      <NavBar onBackgroundChange={handleBackgroundChange} />

      <div className="bg-green-300 flex flex-col items-center justify-center p-20">
        <h1 className="text-3xl mb-10 font-serif font-bold">
          What do you want to consult today?
        </h1>

        <div className="flex items-center border rounded-full p-2 mt-4 bg-white shadow-lg w-9/12 relative">
          <input
            type="text"
            placeholder="Write your question here..."
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
            onClick={() => handleSearch(inputValue)}
          />
        </div>

        {inputValue.length > 0 && showQuestions && ( // Mostrar las preguntas solo si showQuestions es verdadero
          
            renderQuestions()
         
        )}

      </div>

      {error && <NoEncontrado backgroundColor={backgroundColor} />}

      {serverResponse && (
        <Encontrado
          backgroundColor={backgroundColor}
          mensaje={serverResponse.mensaje}
        />
      )}

      {!error && !serverResponse && (
        <Preguntas
          backgroundColor={backgroundColor}
          onQuestionClick={handleQuestionClick}
        />
      )}
    </>
  );
}

export default Buscador;

