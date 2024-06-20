import React from "react";
import { IoAddCircle } from "react-icons/io5";
import preguntas from "../images/preguntas.png";

function Preguntas({ backgroundColor, onQuestionClick }) {
  const textColor = backgroundColor === "bg-while" ? "text-black" : "text-white";

  const questions = [
    "What game mechanics are key to inhibitory control?",
    "What mechanics should a serious game follow if it wants to promote attention?",
    "I am a teacher, how can I strengthen the decision-making capacity of my student",
    "What events make a person want to isolate themselves from others?"

  ];

  return (
    <div className={`p-4 flex items-center justify-around m-15 pt-10 ${backgroundColor}`}>
      <div className="rounded border-dashed border-4 border-green-300 p-10 w-1/2 h-auto mb-5">
        <h1 className={`text-3xl text-center mb-10 font-serif font-bold ${textColor}`}>Suggested questions</h1>
        <div className="flex flex-col">
          {questions.map((question, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 mb-5 cursor-pointer"
              onClick={() => onQuestionClick(question)}
            >
              <IoAddCircle className="text-green-300" />
              <h1 className={`text-xl ${textColor}`}>{question}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="m-10">
        <img src={preguntas} className="w-96 h-96 rounded" alt="Questions" />
      </div>
    </div>
  );
}

export default Preguntas;




