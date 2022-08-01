import React from "react";

export default function Quest(props) {
    const { item } = props

    function answerStatus(ans){
        if(props.isCheck && ans === item.selected){
            if(ans === item.correct_answer)
                return "right"
            else
                return "wrong"
        }
        else
            if(ans === item.selected)
                return "selected"
    }

    return(
        <div className="quest-container">
            <h1 className="question">{item.question}</h1>
            <div className="answers-container">
                {item.shuffled_answers.map((ans, index) => (
                <div 
                    key={index} 
                    className={"answer " + answerStatus(ans)} 
                    onClick={props.isCheck ? undefined : (() => (props.setSelected(props.itemIndex, ans)))}>
                    {ans}
                </div>
                ))}             
            </div>
            <div className="quiz-line"/>
        </div> 
    );
}