import './App.css';
import React from 'react';
import Welcome from './components/Welcome';
import Quest from './components/Quest';
// questions => [question:"", correct_answer: "", shuffled_answers: "", selected: ""]*5

export default function App() {
  const [questions, setQuestions] = React.useState([])
  const [coninute, setConinute] = React.useState(false)
  const [isCheck, setCheck] = React.useState(false)

  function getQuestions(){
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    .then((res) => res.json())
    .then((data) => {
      const items = data.results
      const formatedData = []
      items.map(item => formatedData.push({question : item.question,
                                           correct_answer: item.correct_answer, 
                                           shuffled_answers: getShuffle(item.incorrect_answers, item.correct_answer), 
                                           selected: ""}))
      setQuestions(formatedData)
  })
  }

  React.useEffect(getQuestions, [])

  function getShuffle(incorrect_answers, correct_answer)
  {return [...incorrect_answers, correct_answer].sort()}

  function handleSelected(selectedIndex, ans){
    setQuestions(prevQuestions => prevQuestions.map((question, index) => (
      index === selectedIndex ? {...question, selected: ans} : question)))
  }

  function handleCheck(event) {
    event.preventDefault()
    let isAllSelected = true
    questions.map(item => (item.selected === "" && (isAllSelected = false)))
    if(isAllSelected)
      setCheck(true)
  }

  function startOver(event){
    event.preventDefault()
    setCheck(false)
    getQuestions()
    setConinute(false)
  }

  function checkScore(){
    let score = 0
    questions.map(item => (item.correct_answer === item.selected && (score += 1)))
    return score
  }
  
  return (
    <div className="App">
      <div className='quizzical'>
        {coninute ? 
        <form>
          {questions.map((item, index) => (
            <Quest 
              key={index}
              isCheck={isCheck}
              item={item}
              itemIndex={index}
              setSelected={handleSelected}/>
          ))}
          <div className='results'>
            {isCheck && <p>You scored {checkScore()}/{questions.length} correct answers</p>}
            <button className="quiz-btn" onClick={isCheck ? startOver : handleCheck}>{isCheck ? "Play Again" : "Check Answers"}</button>
          </div>
        </form>
          : <Welcome nextPage={() => setConinute(true)}/>}
      </div>
    </div>
  );
}