import React from 'react'

function ErrorHandling(props) {
    return (
        <div className="error-notice">
            <span>{props.message}</span>
            <button onClick={props.clearError}>x</button>
        </div>
    )
}

export default ErrorHandling
