import { useState,useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"

import Header from "../Header"

import "./index.css"

const apiStatusList={
    initial:"INITIAL",
    success:"SUCCESS",
    failure:"FAILURE",
    inProgress:"IN PROGRESS"
}




const Dashboard=()=>{
    const [apiResponse,setApIResponse]=useState({})
    const [apiStatus,setApiStatus]=useState(apiStatusList.initial)

    useEffect(()=>{
        const fetchReferrals=async()=>{
            const apiUrl="https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals"
            const token=Cookies.get("jwt_token")
            try{
                setApiStatus(apiStatusList.inProgress)
                const response= await axios.get(apiUrl,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                if (response.status===200){
                    setApiStatus(apiStatusList.success)
                    console.log(response)
                    const referralsData=response?.data?.data
                    console.log(referralsData,"reff")
                    setApIResponse(referralsData)

                }
             
            }
            catch(err){
                setApiStatus(apiStatusList.failure)
                console.log("error",err)
            }
        }
        fetchReferrals()
    },[])


    const LoadingView=()=>{
        return(
            <div className="spinner-container">
                <p className="loading-para">Loading...</p>
                <div className="loading-spinner"></div>
            </div>
        )
    }


    return(
        <>
            <Header/>
            {(() => {
                switch (apiStatus) {
                    case apiStatusList.inProgress:
                        return <LoadingView/>
                    // case apiStatusList.failure:
                    //     return <FailureView/>
                    // case apiStatusList.success:
                    //     return 
                    default:
                        return null
                }
            })()}
        </>
    )
}

export default Dashboard