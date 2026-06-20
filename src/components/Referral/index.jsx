import "./index.css"

const Referral=(props)=>{
    const {referral}=props

    return(
        <div className="dashboard-section-container" aria-label="Share referral">
            <h1 className="dashboard-section-heading">Refer friends and earn more</h1>
            <div className="referral-items">
                <div className="referral-item">
                    <h1 className="referral-item-title">YOUR REFERRAL LINK</h1>
                        <div className="item-container">
                            <div className="bg">
                                <p className="item-container-value">{referral.link}</p>
                            </div>
                            <button type="button" className="copy-button">Copy</button>
                        </div>
                </div>
                <div className="referral-item">
                    <h1 className="referral-item-title">YOUR REFERRAL CODE</h1>
                        <div className="item-container">
                            <div className="bg">
                                <p className="item-container-value">{referral.code}</p>
                            </div>
                            <button type="button" className="copy-button">Copy</button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Referral