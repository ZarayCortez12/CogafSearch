import React, { useState, useEffect } from "react";
import { IoSearchCircleSharp, IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import Encontrado from "./Encontrado";
import NoEncontrado from "./NoEncontrado";
import NavBar from "./NavBar";
import Preguntas from "./Preguntas";

function Mechanic() {
  const [inputValue, setInputValue] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const [error, setError] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("bg-while");
  const [questions, setQuestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showQuestions, setShowQuestions] = useState(true); // Estado para controlar la visibilidad de las preguntas
  const [selectedOption, setSelectedOption] = useState(""); // Estado para manejar el valor seleccionado del select

  const [activities, setActivities] = useState([]);

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

  const handleSearch = async (query, option) => { //agregar lo del selectd
    const question = query || inputValue;
    if (question.trim() && !inputValue.toLowerCase().includes("what are the mechanics corresponding to x complementary activity?")) {
      try {
        if(option != null){
          const response = await axios.post(
            "http://localhost:4000/defineQuestion",
            { question,option}
          );
        }
        else{
          const response = await axios.post(
            "http://localhost:4000/defineQuestion",
            { question }  //Avisar a andres
          );
        }
        
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
     const actividades = await axios.get("http://localhost:4000/select/activities");
     setActivities(actividades.data.activityNames);
      const response = await axios.get("http://localhost:4000/search");
      setQuestions(response.data.question);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleBackgroundChange = () => {
    setBackgroundColor(
      backgroundColor === "bg-while" ? "bg-black" : "bg-while"
    );
  };

  const handleQuestionClick = (question) => {
    setInputValue(question);
  
    // Verificar si se trata de la pregunta específica manejada por el select
    if (!question.toLowerCase().includes("what are the mechanics corresponding to x complementary activity?")) {
      // Solo llamar a handleSearch si no es la pregunta específica
      handleSearch(question);
    }
  
    setShowQuestions(false); // Ocultar las preguntas cuando se hace clic en una de ellas
  };
  

  function renderQuestions() {
    const filteredQuestions = questions.filter(
      (question) =>
        question.type === "M" &&
        question.description.toLowerCase().includes(inputValue.toLowerCase())
    );

    return filteredQuestions.map((question, index) => (
      <div
        className="flex items-center p-2 bg-white shadow-lg w-8/12 relative cursor-pointer hover:bg-green-200"
        key={index}
        onClick={() => handleQuestionClick(question.description)}
      >
        <h1>{question.description}</h1>
      </div>
    ));
  }

  // Renderizar el select si la pregunta específica está presente en inputValue
  const renderSelect = () => {
    if (inputValue.toLowerCase().includes("what are the mechanics corresponding to x complementary activity?")) {
      return (
        <select
          className="ml-4 outline-none p-2 border rounded"
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            handleSearch(inputValue,selectedOption);
          }}
        >
          <option value="">the complementary activity</option>
          {activities.map((activity, index) => (
            <option key={index} value={activity}>{activity}</option>
          ))}
        </select>
      );
    }
    return null;
  };

  return (
    <>
      <NavBar onBackgroundChange={handleBackgroundChange} />

      <div className="bg-green-300 flex flex-col items-center justify-center p-20">
        <h1 className="text-3xl mb-10 font-serif font-bold">
          What do you want to consult today?
        </h1>

        <div className="flex items-center mt-4 w-9/12">
          <div className="flex items-center border rounded-full p-2 bg-white shadow-lg w-full relative">
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

          {renderSelect != null && renderSelect()}

        {/* Llamar a la función renderSelect para mostrar el select */}
          
        </div>
        {inputValue.length > 0 && showQuestions && (
  <div className="mt-0 w-full flex flex-col items-center justify-center">
    {renderQuestions()}
  </div>
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

export default Mechanic;
