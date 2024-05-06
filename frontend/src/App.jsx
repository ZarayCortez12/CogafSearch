import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/homePage";
import { AuthProvider } from "./context/SearchContext";


function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<HomePage/>}></Route>
          </Routes>    
      </BrowserRouter>
  </AuthProvider>
   
  );
}

export default App;