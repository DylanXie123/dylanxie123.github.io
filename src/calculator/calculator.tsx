import { observer } from 'mobx-react';
import React from 'react';
import './expression';
import Expression, { ExpContext, expStore } from './expression';
import Plot from './plot';
import { MathfieldComponent } from "react-mathlive";
import { combineConfig } from 'react-mathlive/dist/MathfieldComponent';

export default function Calculator() {
  return (
    <ExpContext.Provider value={expStore}>
      <MathField />
      <ResultBox />
      <Plot />
    </ExpContext.Provider>
  );
}

function MathField() {
  const config = combineConfig(
    { initialLatex: '' }
  )
  config.virtualKeyboardMode = 'auto';
  return (
    <ExpContext.Consumer>
      {exp => (
        <MathfieldComponent
          latex={'1+2'}
          onChange={mf => exp.update(mf)}
          mathfieldConfig={config}
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

const config = combineConfig(
  { initialLatex: '' }
)
config.readOnly = true;

const ResultBoxView = observer((
  { exp }: { exp: Expression }) => (
    <ul>
      <li>{'Latex: ' + exp.latex}</li>
      <li>{'Result: ' + exp.eval}</li>
      <li>
        <span>Text:</span>
        <MathfieldComponent
          latex={exp.text}
          mathfieldConfig={config}
        />
      </li>
      <li>{'Var: ' + exp.variables.concat()}</li>
    </ul>
  ));