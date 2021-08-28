import React, { useEffect } from 'react';
import './model/expression';
import Expression, { ExpContext } from './model/expression';
import Controller, { ControllerContext } from './model/controller';
import MathKeyboard from './components/MathKeyboard';
import MathBox from './components/MathBox';
import ResultBox from './components/ResultBox';
import HistoryBox from './components/History';
import GridContainer from './components/GridContainer';

export default function Calculator() {
  const controller = new Controller();
  const expStore = new Expression();

  useEffect(() => { expStore.initHistory() });

  return (
    <ControllerContext.Provider value={controller} >
      <ExpContext.Provider value={expStore}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <GridContainer>
            <MathBox />
            <div style={{ gridColumn: '1/9' }}><ResultBox /></div>
            <div style={{ gridColumn: '9/-1' }}><HistoryBox /></div>
          </GridContainer>
          <MathKeyboard />
        </div>
      </ExpContext.Provider>
    </ControllerContext.Provider>
  );
}
