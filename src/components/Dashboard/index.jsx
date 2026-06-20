import { useState,useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"

import Header from "../Header"
import Overview from "../Overview"
import ServiceSummary from "../ServiceSummary"
import Referral from "../Referral"
import ReferralsTable from "../ReferralsTable"


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

    const SuccessView=()=>{
        let overviewDetails=apiResponse.metrics 
        console.log("over",overviewDetails)
        let serviceSummary=apiResponse.serviceSummary
        console.log("serviceSummary",serviceSummary)
        let referral=apiResponse.referral
        let  referralsList=apiResponse.referrals 
        console.log("referralData",referralsList)


        return(
            <>
                <Overview overviewDetails={overviewDetails}/>
                <ServiceSummary serviceSummary={serviceSummary}/>
                <Referral referral={referral}/>
                <ReferralsTable referralsList={referralsList}/> 
            </>
        )
    }


    return(
        <div className="dashboard-container">
            <Header/>
            <div className="dashboard-elements">
                <h1 className="dashboard-heading">Referral Dashboard</h1>
                <p className="dashboard-para">Track your referrals, earnings, and partner activity in one<br/> place.</p>
                {(() => {
                    switch (apiStatus) {
                        case apiStatusList.inProgress:
                            return <LoadingView/>
                        // case apiStatusList.failure:
                        //     return <FailureView/>
                        case apiStatusList.success:
                            return <SuccessView/>
                        default:
                            return null
                    }
                })()}
            </div>
        </div>
    )
}

export default Dashboard