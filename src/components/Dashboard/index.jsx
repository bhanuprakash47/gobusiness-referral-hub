import { useState,useEffect, use } from "react"
import axios from "axios"
import Cookies from "js-cookie"

import Header from "../Header"

const apiStatusList={
    initial:"INITIAL",
    success:"SUCCESS",
    failure:"FAILURE",
    inProgress:"IN_PROGRESS"
}


const Dashboard=()=>{
    const [apiResponse,setApIResponse]=useState([])
    const [apiStatus,setApiStatus]=useState(apiStatusList.initial)




    return(
        <Header/>
    )
}

export default Dashboard