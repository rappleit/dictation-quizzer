import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import WordList from './components/WordList';
import Quizzer from './components/Quizzer';

function App() {

  const [wordList, setWordList] = useState([])

  return (
    <div className="App">
      <WordList {...{wordList, setWordList}}/>
      <Quizzer {...{wordList, setWordList}}/>
    </div>
  );
}

export default App;
