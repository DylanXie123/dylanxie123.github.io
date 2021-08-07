import React from 'react';
import './model/expression';
import Expression, { ExpContext } from './model/expression';
import Controller, { ControllerContext } from './model/controller';
import MathKeyboard from './components/MathKeyboard';
import MathBox from './components/MathBox'
import ResultBox from './components/ResultBox'

export default function Calculator() {
  const controller = new Controller();
  const expStore = new Expression();
  
  return (
    <ControllerContext.Provider value={controller}>
      <ExpContext.Provider value={expStore}>
        <MathBox />
        <ResultBox />
      </ExpContext.Provider>
      <MathKeyboard />
    </ControllerContext.Provider>
  );
}
