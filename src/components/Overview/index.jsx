import { FaLink, FaHourglassHalf, FaUsers, FaPercent } from "react-icons/fa"
import { LuDollarSign, LuArrowLeftRight } from "react-icons/lu"
import { PiCurrencyCircleDollarFill } from "react-icons/pi"
import { BsCreditCardFill } from "react-icons/bs"


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
            {overviewDetails.map((each,index) => {
                const Icon=iconsList[index]
                return(
                    <div key={each.id} className="overview-element">
                        <div className="icon-container">
                            {Icon&&<Icon size={28}/>}
                        </div>
                        <h1 className="overview-label">{index}{each.label}</h1>
                        <p className="overview-label-value">{each.value}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Overview