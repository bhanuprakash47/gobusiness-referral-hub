import "./index.css"

const FailureView=(props)=>{
    const {message}=props
    return(
        <div role="alert" className="failure-view-container">
            <h1 className="message">{message}</h1>
        </div>
    )
}

export default FailureView