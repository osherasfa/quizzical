import './App.css';
import React from 'react';
import Welcome from './components/Welcome';
import Questions from './components/Questions';

export default function App() {
  const [questions, setQuestions] = React.useState([])
  const [coninute, setConinute] = React.useState(false)

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    .then((res) => res.json())
    .then((data) => setQuestions(data.results))
}, [])

  return (
    <div className="App">
      <div className='quizzical'>
        {coninute ? <Questions questions={questions}/> :<Welcome nextPage={() => setConinute(true)}/>}
      </div>
    </div>
  );
}