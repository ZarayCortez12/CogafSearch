import React, { useState, useEffect } from "react";
import { IoSearchCircleSharp, IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import Encontrado from "./Encontrado";
import NoEncontrado from "./NoEncontrado";
import NavBar from "./NavBar";
import PreguntasFC from "./PreguntasFC";

function FunctionCognitive() {
  const [inputValue, setInputValue] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const [error, setError] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("bg-while");
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(true); // Estado para controlar la visibilidad de las preguntas
  const [selectedOption, setSelectedOption] = useState(""); // Estado para manejar el valor seleccionado del select

  const [test, setTest] = useState([]);
  const [capability, setCapability] = useState([]);
  const [emotion,setEmotion] = useState([]);
  const [edad,setEdad] = useState([]);
  const [task,setTask] =useState([]);


  const handleChange = (e) => {
    setInputValue(e.target.value);
    setShowQuestions(true); // Mostrar las preguntas cuando se escribe en el input
  };

  useEffect(() => {
    handleSearchQuestions();
  }, []);

  const clearInput = () => {
    setInputValue("");
  };

  const handleSearch = async (query, option) => {
    //agregar lo del selectd
    const question = query || inputValue;
    if (
      (question.trim() && !question.toLowerCase().includes("what cognitive functions are present in x skill?")) ||
      (question.trim() && question.toLowerCase().includes("what cognitive functions are present in x skill?") && option) ||
      (question.trim() && !question.toLowerCase().includes("what fc evaluates x cognitive test?")) ||
      (question.trim() && question.toLowerCase().includes("what fc evaluates x cognitive test?") && option) ||
      (question.trim() && !question.toLowerCase().includes("what psychological tasks are included in x cognitive test?")) ||
      (question.trim() && question.toLowerCase().includes("what psychological tasks are included in x cognitive test?") && option) ||
      (question.trim() && !question.toLowerCase().includes("what fcs are related to x emotion?")) ||
      (question.trim() && question.toLowerCase().includes("what fcs are related to x emotion?") && option) ||
      (question.trim() && !question.toLowerCase().includes("what psychological tasks allow me to measure memory in people between x (age range)?")) ||
      (question.trim() && question.toLowerCase().includes("what psychological tasks allow me to measure memory in people between x (age range)?") && option) ||
      (question.trim() && !question.toLowerCase().includes("how can you x (psychological task) of a person?")) ||
      (question.trim() && question.toLowerCase().includes("how can you x (psychological task) of a person?") && option) ||
      (question.trim() && !question.toLowerCase().includes("what is the application method of the x test?")) ||
      (question.trim() && question.toLowerCase().includes("what is the application method of the x test?") && option) 
    ) {
      //pregunta con x
      try {
        let response;
        if(option != null){
          response = await axios.post(
            "http://localhost:4000/optionQuestion",
            { question, option }
          );
        } else {
          response = await axios.post(
            "http://localhost:4000/defineQuestion",
            { question }  
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
      const test = await axios.get(
        "http://localhost:4000/select/tests"
      );
      setTest(test.data.testNames);

      const emotion = await axios.get(
        "http://localhost:4000/select/emotions"
      );
      setEmotion(emotion.data.emotions);

      const task = await axios.get(
        "http://localhost:4000/select/tasks"
      );
      setTask(task.data.taskNames);

      const capability = await axios.get(
        "http://localhost:4000/select/capabilities"
      );
      setCapability(capability.data.capabilityNames);
      
      const age = await axios.get(
        "http://localhost:4000/select/age-rank"
      );
      setEdad(age.data.ageRanks);
      

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
    if (!question.toLowerCase().includes("what cognitive functions are present in x skill?") &&  //
    !question.toLowerCase().includes("what fc evaluates x cognitive test?") && //
    !question.toLowerCase().includes("what psychological tasks are included in x cognitive test?") && //
    !question.toLowerCase().includes("what fcs are related to x emotion?") && //
    !question.toLowerCase().includes("what psychological tasks allow me to measure memory in people between x (age range)?") &&
    !question.toLowerCase().includes("how can you x (psychological task) of a person?") &&
    !question.toLowerCase().includes("what is the application method of the x test?")) { //
      //preguntas con x
      // Solo llamar a handleSearch si no es la pregunta específica
      handleSearch(question);
    }

    setShowQuestions(false); // Ocultar las preguntas cuando se hace clic en una de ellas
  };

  function renderQuestions() {
    const filteredQuestions = questions.filter(
      (question) =>
        question.type === "FC" &&
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
    if (inputValue.toLowerCase().includes("what fc evaluates x cognitive test?") ||
     inputValue.toLowerCase().includes("what psychological tasks are included in x cognitive test?") ||
     inputValue.toLowerCase().includes("what is the application method of the x test?")) {
      return (
        <select
          className="ml-4 outline-none p-2 border rounded w-48"
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            handleSearch(inputValue,e.target.value);
          }}
        >
          <option value="">Tests </option>
          {test.map((test, index) => (
            <option key={index} value={test}>{test}</option>
          ))}
        </select>
      );
    }

    if (inputValue.toLowerCase().includes("what cognitive functions are present in x skill?") ) {
     return (
       <select
         className="ml-4 outline-none p-2 border rounded w-48"
         value={selectedOption}
         onChange={(e) => {
           setSelectedOption(e.target.value);
           handleSearch(inputValue,e.target.value);
         }}
       >
         <option value="">Capability </option>
         {capability.map((capability, index) => (
           <option key={index} value={capability}>{capability}</option>
         ))}
       </select>
     );
   }

   if (inputValue
    .toLowerCase()
    .includes("what fcs are related to x emotion?")
) {
  return (
    <select
      className="ml-4 outline-none p-2 border rounded w-48"
      value={selectedOption}
      onChange={(e) => {
        const selected = e.target.value;
        setSelectedOption(selected);
        handleSearch(inputValue,e.target.value);
      }}
    >
      <option value="">Emotions </option>
      {emotion.map((emotions, index) => (
        <option key={index} value={emotions}>
          {emotions}
        </option>
      ))}
    </select>
  );
}

if (inputValue
  .toLowerCase()
  .includes("what psychological tasks allow me to measure memory in people between x (age range)?")
) {
return (
  <select
    className="ml-4 outline-none p-2 border rounded w-48"
    value={selectedOption}
    onChange={(e) => {
      const selected = e.target.value;
      setSelectedOption(selected);
      handleSearch(inputValue,e.target.value);
    }}
  >
    <option value="">Age </option>
    {edad.map((edad, index) => (
      <option key={index} value={edad}>
        {edad}
      </option>
    ))}
  </select>
);
}

if (inputValue
  .toLowerCase()
  .includes("how can you x (psychological task) of a person?")
) {
return (
  <select
    className="ml-4 outline-none p-2 border rounded w-48"
    value={selectedOption}
    onChange={(e) => {
      const selected = e.target.value;
      setSelectedOption(selected);
      handleSearch(inputValue,e.target.value);
    }}
  >
    <option value="">Task </option>
    {task.map((task, index) => (
      <option key={index} value={task}>
        {task}
      </option>
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
        <PreguntasFC
          backgroundColor={backgroundColor}
          onQuestionClick={handleQuestionClick}
        />
      )}
    </>
  );
}

export default FunctionCognitive;
