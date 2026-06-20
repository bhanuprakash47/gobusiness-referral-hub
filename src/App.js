import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Login from "./components/Login"
import Dashboard from "./components/Dashboard";
import ReferralDetails from "./components/ReferralDetails"
import NotFound from "./components/NotFound"

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
      <Route 
        path="/referrals/:id"
        element={
          <ProtectedRoute>
            <ReferralDetails/>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
 )
}

export default App