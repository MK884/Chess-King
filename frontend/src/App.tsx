import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GamePage, LandingPage } from "./pages";

export default function App() {
  return (
    <div className="h-screen bg-[#1c1c1c]">
    <BrowserRouter>
      <Routes> 
         <Route element={<LandingPage />} path="/" />
         <Route element={<GamePage />} path="/home" />
      </Routes>
    </BrowserRouter>
    </div>
  )
}