import "./index.css"

const ServiceSummary=(props)=>{
    const {serviceSummary}=props 


    return(
        <div className="dashboard-section-container" aria-label="Service summary">
            <h1 className="dashboard-section-heading">Service summary</h1>
                <div className="summary-items">
                    <div className="service-summary-item">
                        <h1 className="service-summary-item-para">SERVICE</h1>
                        <p className="service-summary-item-value b">{serviceSummary.service}</p>
                    </div>
                    <div className="service-summary-item">
                        <h1 className="service-summary-item-para">YOUR REFERRALS</h1>
                        <p className="service-summary-item-value">{serviceSummary.yourReferrals}</p>
                    </div>
                    <div className="service-summary-item">
                        <h1 className="service-summary-item-para">ACTIVE REFERRALS</h1>
                        <p className="service-summary-item-value">{serviceSummary.activeReferrals}</p>
                    </div>
                    <div className="service-summary-item">
                        <h1 className="service-summary-item-para">TOTAL REF. EARNINGS</h1>
                        <p className="service-summary-item-value">{serviceSummary.totalRefEarnings}</p>
                    </div>
                </div>
        </div>
    )
}

export default ServiceSummary