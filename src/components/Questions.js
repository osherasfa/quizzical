import React from "react";

export default function Questions() {
    const [questions, setQuestions] = React.useState([
        {question:"blah blah?", rightAnswer:"blah!", answers: ["lol", "hehe:)", "blah!", "oh.."]},
        {question:"what's my name?", rightAnswer:"Osher", answers: ["Diago", "Osher", "Eyal", "Fredi"]}])
    
    const questionsElements = questions.map(quest => { 
        return <div className="quiz-container">
            <h1 className="question">{quest.question}</h1>
            {quest.answers.map((answer, index) =>{
                return <React.Fragment>
                    <input
                    className="quiz-answer"
                    type="radio"
                    id={answer}
                    name={quest.question}
                    value={answer}
                    checked={true}
                    onChange={()=>{}}
                    />
                    <label htmlFor={answer}>{answer}</label>
                </React.Fragment>
            })}
            <br />
        </div> 
    })
    
    return(
        <form>
            {questionsElements}
        </form>
    );
}