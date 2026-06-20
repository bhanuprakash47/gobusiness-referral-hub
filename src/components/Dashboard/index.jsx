import { useState,useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"

import Header from "../Header"
import Overview from "../Overview"
import ServiceSummary from "../ServiceSummary"
import Referral from "../Referral"
import ReferralsTable from "../ReferralsTable"


import LoadingView from "../LoadingView"
import FailureView from "../FailureView"
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
    const [errMsg,setErrMsg]=useState("")

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
                const status = err?.response?.status
                const message =
                    err?.response?.data?.message ||
                    err?.response?.data?.error ||
                    err?.message ||
                    "Request failed"

                setErrMsg(status ? `${message} (${status})` : message)
                setApiStatus(apiStatusList.failure)
                console.log("error",err)
            }
        }
        fetchReferrals()
    },[])


    

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

    
    
    
    const Footer = () => {
        return (
            <div className="footer-container" aria-label="Footer">
                <a href="/" className="footer-brand">
                    Go Business
                </a>

                <nav className="footer-nav" aria-label="Footer">
                    <a href="#about" className="footer-link">About</a>
                    <a href="#contact" className="footer-link">Contact</a>
                    <a href="#privacy" className="footer-link">Privacy</a>
                    <a href="#terms" className="footer-link">Terms</a>
                </nav>
    

                <p className="footer-copyright">© 2024 Go Business</p>
            </div>
        )
    }


    return(
        <div className="divEl">
            <div className="dashboard-container">
                <Header/>
                <div className="dashboard-elements">
                    <h1 className="dashboard-heading">Referral Dashboard</h1>
                    <p className="dashboard-para">Track your referrals, earnings, and partner activity in one<br/> place.</p>
                    {(() => {
                        switch (apiStatus) {
                            case apiStatusList.inProgress:
                                return <LoadingView/>
                            case apiStatusList.failure:
                                return <FailureView message={errMsg}/>
                            case apiStatusList.success:
                                return <SuccessView/>
                            default:
                                return null
                        }
                    })()}
                </div>
            </div>
            <Footer width={100}/>
        </div>
    )
}

export default Dashboard