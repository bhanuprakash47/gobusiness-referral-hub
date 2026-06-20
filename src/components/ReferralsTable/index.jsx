import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"

import LoadingView from "../LoadingView"
import FailureView from "../FailureView"


import "./index.css"

const apiStatusList={
    initial:"INITIAL",
    success:"SUCCESS",
    failure:"FAILURE",
    inProgress:"IN PROGRESS"
}

const ReferralsTable=(props)=>{
    const [tableList,setTableList]=useState(props.referralsList)
    const [searchVal,updateSearchVal]=useState('')
    const [sortOrder,updateSortOrder]=useState("desc")
    const [apiStatus,setApiStatus]=useState(apiStatusList.initial)
    const [errorMsg,setErrMsg]=useState("")

    const [pageNo,setPageNo]=useState(1)
    const [startIndex,setStartIndex]=useState(0)
    const pageSize = 10
    const totalEntries = (tableList || []).length
    const totalPages = Math.max(1, Math.ceil(totalEntries / pageSize))

    const navigate=useNavigate()

      

    useEffect(()=>{
        console.log("useeffect")
        const fetchReferrals=async()=>{
            const token=Cookies.get("jwt_token")
            const apiUrl=`https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?search=${searchVal}&sort=${sortOrder}`
            try{
                setApiStatus(apiStatusList.inProgress)
                const response=await axios.get(apiUrl,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type":"application/json"
                    }
                })
                if(response.status===200){
                    setApiStatus(apiStatusList.success)
                    const datalist=response?.data?.data
                    console.log(datalist)
                    setTableList(datalist.referrals)
                    setStartIndex(0)
                    setPageNo(1)
                }
            }catch(err){
                    const status = err?.response?.status
                    const message =
                        err?.response?.data?.message ||
                        err?.response?.data?.error ||
                        err?.message ||
                        "Request failed"

                    setErrMsg(status ? `${message} (${status})` : message)
                setApiStatus(apiStatusList.failure)
                console.log("error fetching",err)
            }
        }
        fetchReferrals()
    },[searchVal,sortOrder])


    const formatDate=(givenDate)=>{
        const date=new Date(givenDate)

        const yyyy=date.getFullYear()
        const mm = String(date.getMonth() + 1).padStart(2, '0')         
        const dd = String(date.getDate()).padStart(2, '0')

        return `${yyyy}/${mm}/${dd}`
    }

    const onClickPrevBtn = () => {
        if (startIndex > 0) {
            setStartIndex((prev) => Math.max(0, prev - pageSize))
            setPageNo((p) => Math.max(1, p - 1))
        }
    }

    const onClickNextBtn = () => {
        if (startIndex + pageSize < totalEntries) {
            setStartIndex((prev) => prev + pageSize)
            setPageNo((p) => Math.min(totalPages, p + 1))
        }
    }

    const onClickNo = (number) => {
        const idx = (number - 1) * pageSize
        setStartIndex(Math.max(0, Math.min(idx, Math.max(0, totalEntries - pageSize))))
        setPageNo(number)
    }

    const gettableListByPageNo = () => {
        return (tableList || []).slice(startIndex, startIndex + pageSize)
    }


    const LoadingView=()=>{
        return(
            <div className="spinner-container">
                <p className="loading-para">Loading...</p>
                <div className="loading-spinner"></div>
            </div>
        )
    }


    const SuccessView=()=>{
        return(
            <>
                 <table className="table">
                <thead>
                    <tr className="table-header">
                        <th className="table-header-cell">NAME</th>
                        <th className="table-header-cell">SERVICE</th>
                        <th className="table-header-cell">DATE</th>
                        <th className="table-header-cell">PROFIT</th>                    
                    </tr>
                </thead>

                <tbody>
                    {gettableListByPageNo().map((each,index)=>(
                        <tr onClick={()=>{navigate(`/referrals/${each.id}`)}} key={each.id} className={`data-row ${index%2===0?"even":"odd"}`}>
                            <td className="data-row-cell">{each.name}</td>
                            <td className="data-row-cell">{each.serviceName}</td>
                            <td className="data-row-cell">{formatDate(each.date)}</td>
                            <td className="data-row-cell">${`${each.profit}`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
                <div className="table-container-footer">
                    {(() => {
                        const start = totalEntries === 0 ? 0 : startIndex + 1
                        const end = Math.min(startIndex + pageSize, totalEntries)
                        return (
                            <p className="page-entries">Showing {start}-{end} of {totalEntries} entries</p>
                        )
                    })()}
                    <div className="pages-navigations-buttons-container">
                        <button onClick={onClickPrevBtn} type="button" className="nav-buttons" disabled={pageNo===1}>Previous</button>
                        <button onClick={()=>{onClickNo(1)}} type="button" className={`pageNo-button ${pageNo===1? 'active':''}`}>1</button>
                        <button onClick={()=>{onClickNo(2)}} type="button" className={`pageNo-button ${pageNo===2? 'active':''}`}>2</button>
                        <button onClick={()=>{onClickNo(3)}} type="button" className={`pageNo-button ${pageNo===3? 'active':''}`}>3</button>
                        <button onClick={()=>{onClickNo(4)}} type="button" className={`pageNo-button ${pageNo===4? 'active':''}`}>4</button>
                        <button onClick={()=>{onClickNo(5)}} type="button" className={`pageNo-button ${pageNo===5? 'active':''}`}>5</button>
                        <button onClick={onClickNextBtn} type="button" className="nav-buttons" disabled={pageNo===totalPages || totalEntries===0}>Next</button>
                    </div>
                </div>
            </>
        )
    }
    
    return(
        <div className="table-container">
            <h1 className="table-heading">All referrals</h1>
            <div className="table-container-header">
                <div className="search-container">
                    <p className="para">Search</p>
                    <input 
                        type="text"
                        placeholder="Name or service..."
                        value={searchVal}
                        className="input-element"
                        onChange={(event)=>{updateSearchVal(event.target.value)}}
                    />
                </div>
                <div className="sort-container">
                    <p className="para">Sort by date</p>
                    <select 
                        className="select-container" 
                        value={sortOrder}
                        onChange={(event) => updateSortOrder(event.target.value)}
                    >
                        <option value="desc">Newest First</option>
                        <option value="asc">Oldest First</option>
                    </select>
                </div>
            </div>
            {(() => {
                switch (apiStatus) {
                    case apiStatusList.inProgress:
                        return <LoadingView/>
                    case apiStatusList.failure:
                        return <FailureView message={errorMsg}/>
                    case apiStatusList.success:
                        return <SuccessView/>
                    default:
                        return null
                }
            })()}

                
        </div>

    )

}

export default ReferralsTable