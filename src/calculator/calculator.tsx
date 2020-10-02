import { observer } from 'mobx-react';
import React from 'react';
import { addStyles, EditableMathField, StaticMathField } from 'react-mathquill';
import './expression';
import Expression, { ExpContext, expStore } from './expression';
import Plot from './plot';

addStyles()

export default function Calculator() {
  return (
    <ExpContext.Provider value={expStore}>
      <MathField />
      <ResultBox />
      <Plot />
    </ExpContext.Provider>
  );
}

const mathStyle: React.CSSProperties = {
  width: "100%",
  height: "50px",
};

function MathField() {
  return (
    <ExpContext.Consumer>
      {exp => (
        <EditableMathField
          latex={''}
          onChange={mf => exp.update(mf.latex())}
          style = {mathStyle}
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
      <li>{'Result: ' + exp.eval}</li>
      <li>
        <span>Text:</span>
        <StaticMathField >{exp.text}</StaticMathField>
      </li>
      <li>{'Var: ' + exp.variables.concat()}</li>
    </ul>
  ));