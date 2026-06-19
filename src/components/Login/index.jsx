import {useState,useEffect } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import Cookies from "js-cookie"

import "./index.css"

const Login=()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [errMsg,setErrMsg]=useState("")

    const navigate=useNavigate()
 

    useEffect(()=>{
        const token=Cookies.get("jwt_token")
            if (token){
                return navigate("/")
            }
    },[navigate])
    

    const loginURL="https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin"
    
    const handleLoginSubmit=async(event)=>{ 
        event.preventDefault()   
        setErrMsg("")        
        try{
            const response= await axios.post(loginURL,{email,password})
            
            const token = response?.data?.data?.token
            if (token) {
                Cookies.set("jwt_token", token, {expires: 7})
                navigate("/", {replace: true})
                return
            }
           
            setErrMsg("Login failed. Token not received.")

        }catch(err){
            
            const message=err.response?.data?.message||"Login failed. Please try again"
            setErrMsg(message)
        }
    }

    return(
        <div className="bg-container">
            <div className="login-card">
                <h1 className="title">Go Business</h1>
                <p className="description">Sign in to open your referral dashboard.</p>
                <form className="login-form" onSubmit={handleLoginSubmit}>
                    <div className="input-container">
                        <label htmlFor="email" className="label">Email</label>
                        <input 
                            type="email"
                            id="email"
                            className="input-el"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(event)=>{setEmail(event.target.value)}}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password" className="label">Password</label>
                        <input 
                            type="password"
                            id="password"
                            className="input-el"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(event)=>{setPassword(event.target.value)}}
                        />
                    </div>
                    <button type="submit" className="login-button">Sign in</button>
                    {errMsg&&<p className="error-msg">{errMsg}</p>}
                </form>
            </div>
        </div>
    )
}

export default Login