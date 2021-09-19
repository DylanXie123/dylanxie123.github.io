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
    <ControllerContext.Provider value={controller} >
      <ExpContext.Provider value={expStore}>
        <GridContainer>
          <MathBox />
          <div style={{ gridColumn: '1/9' }}><ResultBox /></div>
          <div style={{ gridColumn: '9/-1' }}><HistoryBox /></div>
        </GridContainer>
        <div style={{ position: 'fixed', bottom: 10, width: '100%' }}>
          <MathKeyboard />
        </div>
      </ExpContext.Provider>
    </ControllerContext.Provider>
  );
}

const GridContainer = (props: { children: React.ReactNode }) => {
  return (
    <div style={{ width: '90%', margin: 'auto', flex: '1 0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)' }}>
        {props.children}
      </div>
    </div>
  )
}
