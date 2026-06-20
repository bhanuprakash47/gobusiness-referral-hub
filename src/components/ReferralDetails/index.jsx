import { useEffect, useState } from "react"
import {  useParams, Link } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"
import { GoArrowLeft } from "react-icons/go"

import LoadingView from "../LoadingView"
import FailureView from "../FailureView"
import Header from "../Header"

import "./index.css"

const apiStatusList = {
    initial: "INITIAL",
    success: "SUCCESS",
    failure: "FAILURE",
    inProgress: "IN PROGRESS"
}

const ReferralDetails = () => {
    const [apiStatus, setApiStatus] = useState(apiStatusList.initial)
    const [errorMsg, setErrMsg] = useState("")
    const [apiResponse, setApiResponse] = useState({})
    
    const { id } = useParams()
    console.log("e",apiResponse)

    useEffect(() => {
        const fetchAPI = async () => {
            const url = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?id=${id}`
            const token = Cookies.get("jwt_token")
            try {
                setApiStatus(apiStatusList.inProgress)
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                if (response.status === 200) {
                    setApiStatus(apiStatusList.success)
                    const dataObj = response?.data?.data?.referrals
                    setApiResponse(dataObj)
                    
                }
            } catch (err) {
                const status = err?.response?.status
                const message =
                    err?.response?.data?.message ||
                    err?.response?.data?.error ||
                    err?.message ||
                    "Request failed"
                setErrMsg(status ? `${message} (${status})` : message)
                setApiStatus(apiStatusList.failure)
            }
        }
        fetchAPI()
    }, [id])

    const formatDate = (givenDate) => {
        if (!givenDate) return ""
        const date = new Date(givenDate)
        const yyyy = date.getFullYear()
        const mm = String(date.getMonth() + 1).padStart(2, '0')        
        const dd = String(date.getDate()).padStart(2, '0')
        return `${yyyy}/${mm}/${dd}`
    }

    

    const renderSuccessView = () => (
        <div className="card">
            <div className="card-header">
                <h2 className="partner-name">{apiResponse[0].name}</h2>
                <span className="service-badge">{apiResponse[0].serviceName}</span>
            </div>
            
            <div className="details-list">
                <div className="detail-row">
                    <span className="detail-label">REFERRAL ID</span>
                    <span className="detail-value">{apiResponse[0].id}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">NAME</span>
                    <span className="detail-value">{apiResponse[0].name}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">SERVICE NAME</span>
                    <span className="detail-value">{apiResponse[0].serviceName}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">DATE</span>
                    <span className="detail-value">{formatDate(apiResponse[0].date)}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">PROFIT</span>
                    <span className="detail-value">${apiResponse[0].profit}</span>
                </div>
            </div>
        </div>
    )

    const renderViews = () => {
        switch (apiStatus) {
            case apiStatusList.inProgress:
                return <LoadingView />
            case apiStatusList.failure:
                return <FailureView message={errorMsg} />
            case apiStatusList.success:
                return renderSuccessView()
            default:
                return null
        }
    }

    return (
        <div className="referral-details-wrapper">
            <Header />
            <div className="referral-details-container">
                <Link to="/" className="back-link">
                    <GoArrowLeft className="back-icon" />
                    <span className="referral-details-container-link">Back to dashboard</span>
                </Link>
                
                <h1 className="ref-heading">Referral Details</h1>
                <p className="ref-para">Full information for this referral partner.</p>
                
                {renderViews()}
            </div>
        </div>
    )
}

export default ReferralDetails