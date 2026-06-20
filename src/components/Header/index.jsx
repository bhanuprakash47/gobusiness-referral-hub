import {Link,useNavigate } from "react-router-dom";
import Cookies  from "js-cookie";

import "./index.css"

const Header=()=>{            
    const navigate=useNavigate()

    
    const handleLogout=()=>{
        Cookies.remove("jwt_token")
        navigate("/login",{replace:true})
    }

    return(
        <div className="header-container" aria-label="Go to dashboard home">
            <div>
                <Link to="/" aria-label="Primary"  className="header-heading">
                    Go Business
                </Link>
            </div>            
            <div className="buttons-container">
                <button type="button" className="try-for-free-button">Try for free</button>
                <button type="button" className="logout-button" onClick={handleLogout}>Log out</button>
            </div>
        </div>
    )
}

export default Header