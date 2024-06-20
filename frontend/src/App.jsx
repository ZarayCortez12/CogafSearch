import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";

import FunctionCognitive from "./components/FunctionCognitive.jsx"
import Mechanic from "./components/Mechanic.jsx"
import Characteristics  from "./components/Characteristics.jsx"



function App() {

  return (
    
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<HomePage/>}></Route>
              <Route path="/functioncognitive" element={<FunctionCognitive/>}></Route>
              <Route path="/mechanic" element={<Mechanic/>}></Route>
              <Route path="/characteristics" element={<Characteristics/>}></Route>
          </Routes>    
      </BrowserRouter>
  
   
  );
}

export default App;