import React from 'react';
import logo from './logo.svg';

import './App.css';
import Board from './components/board/Board';
import NumperPad from './components/numberpad/NumberPad';

function App() {
  return (
    <>
      <div className="app">
        <Board></Board>
        <NumperPad></NumperPad>
      </div>
    </>
  );
}

export default App;
