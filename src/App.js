import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Login from "./components/Login"
import Dashboard from "./components/Dashboard";

import Cookies from "js-cookie";


const ProtectedRoute=({children})=>{
  const token=Cookies.get("jwt_token")
  return token?children:<Navigate to="/login" replace/>
}

const App=()=>{
 return (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route 
        path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
           </ProtectedRoute>
          }
      />

    </Routes>
  </BrowserRouter>
 )
}

export default App