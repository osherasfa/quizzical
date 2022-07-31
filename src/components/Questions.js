import React from "react";

export default function Questions(props) {
    const { questions } = props
    const [checkedList, setCheckedList] = React.useState(Array(questions.length).fill(-1))
    console.log(checkedList)

    function handleClick(value, index){
        setCheckedList(prevCheckedList => Object.values({...prevCheckedList, [index]: value}))
    }
    
    function createAnswers(incorrect_answers, correct_answer, parentIndex){
        const randomizeAnswers = []
        const randomIndex = Math.floor(Math.random() * 4)
        let incorrectCouner = 0
        
        for (let i = 0; i < incorrect_answers.length + 1; i++) {
            if(randomIndex === i)
                randomizeAnswers.push(<div onClick={() => handleClick(i, parentIndex)}
                className={"answer " + (checkedList[parentIndex] === i ? "checked": "") }
                key={i}>{correct_answer}</div>)
            else{
                randomizeAnswers.push(<div onClick={() => handleClick(i, parentIndex)}
                className={"answer " + (checkedList[parentIndex] === i ? "checked": "") }
                key={i}>{incorrect_answers[incorrectCouner]}</div>)
                incorrectCouner += 1
            }
        }
        return randomizeAnswers
    }

    const questionsElements = questions.map((quest, index) => { 
        return <div className="quiz-container" key={index}>
            <h1 className="question">{quest.question}</h1>

            <div className="answers-container">
                {createAnswers(quest.incorrect_answers, quest.correct_answer, index)}                
            </div>

            <div className="quiz-line"/>
        </div> 
    })
    
    return(
        <React.Fragment>
            {questionsElements}
            <button className="quiz-btn">Check Answers</button>
        </React.Fragment>
    );
}