import React from "react";

export default function Quest(props) {
    const { item } = props
    const { isCheck, setSelected, itemIndex } = props

    /* Checking selected answers status */
    function answerStatus(ans){
        return (isCheck && ans === item.selected) // is can check and if selected 
                    ? (ans === item.correct_answer)  // if user is right
                        ? "right"  
                        : "wrong" 
                    : (ans === item.selected) && "selected" // if user clicked
    }

    return(
        <div className="question-container">
            <h1 className="question">{item.question}</h1>
            <div className="answers-container">
                {item.shuffled_answers.map((ans, index) => (
                    <div 
                        key={index} 
                        className={"answer " + answerStatus(ans)} 
                        onClick={isCheck ? undefined : (() => (setSelected(itemIndex, ans)))}>
                        {ans}
                    </div>))}             
            </div>
            <div className="quiz-line"/>
        </div> 
    );
}