import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home"
import React from "react"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App