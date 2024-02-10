// import logo from './logo.svg';
import IDCard from './components/IDCard';
import './App.css';
import { useState } from 'react';
import MainContainerWithNav from './components/MainContainer';

function App() {
  const [seed, setSeed] = useState("abc"); //by default, seed is abc as specified in the question

  return (<MainContainerWithNav setSeed={setSeed}>
    <IDCard page={1} result={1} seed={seed} />
  </MainContainerWithNav>);
}

export default App;
