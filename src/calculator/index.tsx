import React, { useEffect } from 'react';
import './model/expression';
import Expression, { ExpContext } from './model/expression';
import Controller, { ControllerContext } from './model/controller';
import MathKeyboard from './components/MathKeyboard';
import MathBox from './components/MathBox';
import ResultBox from './components/ResultBox';
import HistoryBox from './components/History';

export default function Calculator() {
  const controller = new Controller();
  const expStore = new Expression();

  useEffect(() => { expStore.initHistory() });

  return (
    <ControllerContext.Provider value={controller}>
      <ExpContext.Provider value={expStore}>
        <MathBox />
        <ResultBox />
        <HistoryBox />
        <MathKeyboard />
      </ExpContext.Provider>
    </ControllerContext.Provider>
  );
}
