import './App.css';
import React from 'react';
import Welcome from './components/Welcome';
import Questions from './components/Questions';

export default function App() {
  const [coninute, setConinute] = React.useState(false)
  return (
    <div className="App">
      <div className='quizzical'>
        {coninute ? <Questions/> :<Welcome nextPage={() => setConinute(true)}/>}
      </div>
    </div>
  );
}