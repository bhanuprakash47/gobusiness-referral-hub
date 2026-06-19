import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login"

const App=()=>{
 return (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  </BrowserRouter>
 )
}

export default App