import { observer } from 'mobx-react';
import React from 'react';
import { addStyles, EditableMathField } from 'react-mathquill';
import './expression';
import Expression, { ExpContext, expStore } from './expression';
import Plot from './plot';

addStyles()

export default function Calculator() {
  return (
    <ExpContext.Provider value={expStore}>
      <MathField />
      <ResultBox />
      {/* <Plot /> */}
    </ExpContext.Provider>
  );
}

function MathField() {
  return (
    <ExpContext.Consumer>
      {exp => (
        <EditableMathField
          latex={''}
          onChange={mf => exp.update(mf.latex())}
        />
      )}
    </ExpContext.Consumer>
  );
}

function ResultBox() {
  return (
    <ExpContext.Consumer >{
      exp => <ResultBoxView exp={exp} />
    }</ExpContext.Consumer>
  );
}

const ResultBoxView = observer((
  { exp }: { exp: Expression }) => (
    <ul>
      <li>{'Latex: ' + exp.latex}</li>
      <li>{'Result: ' + exp.result}</li>
      <li>{'Var: ' + exp.variables.concat()}</li>
    </ul>
  ));