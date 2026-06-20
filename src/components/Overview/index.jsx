import { FaLink, FaHourglassHalf, FaUsers, FaPercent } from "react-icons/fa"
import { LuDollarSign, LuArrowLeftRight } from "react-icons/lu"
import { PiCurrencyCircleDollarFill } from "react-icons/pi"
import { BsCreditCardFill } from "react-icons/bs"

import "./index.css"

const Overview=(props)=>{
    const {overviewDetails}=props 
    const iconsList = [
        LuDollarSign,
        BsCreditCardFill,
        FaLink,
        FaHourglassHalf,
        FaPercent,
        PiCurrencyCircleDollarFill,
        FaUsers,
        LuArrowLeftRight,
    ]              
    
    return(
        <div className="dashboard-section-container">
            <h1 className="dashboard-section-heading">Overview</h1>
            <ul className="list">
                {overviewDetails.map((each,index) => {
                    const Icon=iconsList[index]
                    return(
                        <li key={each.id} className="overview-element">
                            <div className="icon-container">
                                {Icon&&<Icon size={21}/>}
                            </div>
                            <h1 className="overview-label-value">{each.value}</h1>
                            <p className="overview-label">{each.label}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Overview