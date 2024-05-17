import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";



function App() {

  return (
    
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<HomePage/>}></Route>
          </Routes>    
      </BrowserRouter>
  
   
  );
}

export default App;