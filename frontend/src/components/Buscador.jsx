import React, {  useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function Buscador() {
  


  return (
    <>
      <div className="bg-green-300 flex flex-col items-center justify-center p-20 w-screen h-screen">
    <h1 className="text-5xl mb-10 font-serif font-bold">
        What do you want to consult today?
    </h1>

    <div className="flex justify-center items-center space-x-6 mt-4">
        <Link to="/functioncognitive">
        <button className="bg-green-500 hover:bg-green-400 text-white rounded-full px-8 py-4 transform hover:-translate-y-1 transition duration-300 text-xl">
            FUNCTION COGNITIVE
        </button>
        </Link>

        <Link to="/mechanic">
        <button className="bg-green-500 hover:bg-green-400 text-white rounded-full px-8 py-4 transform hover:-translate-y-1 transition duration-300 text-xl">
            MECHANIC
        </button>
        </Link>
        <Link to="/characteristics">
        <button className="bg-green-500 hover:bg-green-400 text-white rounded-full px-8 py-4 transform hover:-translate-y-1 transition duration-300 text-xl">
            CHARACTERISTICS
        </button>
        </Link>
        
        
    </div>
</div>


    </>
  );
}

export default Buscador;
