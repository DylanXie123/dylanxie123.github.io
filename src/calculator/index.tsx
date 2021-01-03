import React from 'react';
import './model/expression';
import { ExpContext, expStore } from './model/expression';
import { ControllerContext, controller } from './model/controller';
import MathKeyboard from './components/MathKeyboard';
import MathBox from './components/MathBox'
import ResultBox from './components/ResultBox'
import './style.css'

export default function Calculator() {
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
