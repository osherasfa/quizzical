import React from 'react';
import Welcome from './components/Welcome';
import Quest from './components/Quest';
import './App.css';

export default function App() {
  const [questions, setQuestions] = React.useState([])
  const [coninute, setConinute] = React.useState(false)
  const [isCheck, setIsCheck] = React.useState(false)

  // Getting questions
  React.useEffect(getQuestions, [])

  /* Getting questions from OTDB site and formatting our object */
  function getQuestions(){
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    .then((res) => res.json())
    .then((data) => {
      const items = data.results
      const formatedData = []
      items.map(item => formatedData.push({question : item.question,
                                           correct_answer: item.correct_answer, 
                                           shuffled_answers: [...item.incorrect_answers, item.correct_answer].sort(() => (Math.random() > .5) ? 1 : -1), // Random
                                           selected: ""}))
      setQuestions(formatedData)
  })
  }

  /* Set our selected answer into "selected" property */
  function handleSelected(selectedIndex, ans){
    setQuestions(prevQuestions => prevQuestions.map((question, index) => (
      index === selectedIndex ? {...question, selected: ans} : question)))
  }

  /* Checking corrected answers */
  function handleCheck(event) {
    event.preventDefault()
    let isAllSelected = true
    questions.map(item => (item.selected === "" && (isAllSelected = false)))  //If the user answer all questions
    if(isAllSelected)
      setIsCheck(true)
  }

  /* Restarting Game */
  function startOver(event){
    event.preventDefault()
    setIsCheck(false)
    getQuestions()
    setConinute(false)
  }

  /* Iterating our questions array and counting corrected answers */
  function checkScore(){
    let score = 0
    questions.map(item => (item.correct_answer === item.selected && (score += 1)))
    return score
  }
  
  return (
    <div className="App">
      <div className='quizzical'>
        {coninute ? 
          <div className='quizzical-container'>
            {questions.map((item, index) => (
              <Quest 
                key={index}
                isCheck={isCheck}
                item={item}
                itemIndex={index}
                setSelected={handleSelected}/>))}
            <div className='quizzical-result'>
              {isCheck && <p>You scored {checkScore()}/{questions.length} correct answers</p>}
              <button className="quiz-btn" onClick={isCheck ? startOver : handleCheck}>{isCheck ? "Play Again" : "Check Answers"}</button>
            </div>
          </div>
        : <Welcome nextPage={() => setConinute(true)}/>}
      </div>
    </div>
  );
}