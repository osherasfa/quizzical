import React from "react";

export default function Welcome(props) {
    return(
        <div className="welcome-container">
            <h1 className='welcome-title'>Quizzical</h1>
            <p className="welcome-description">Test Of Knowledge</p>
            <button className="welcome-btn" onClick={props.nextPage}>Start quiz</button>
        </div>
    );
}