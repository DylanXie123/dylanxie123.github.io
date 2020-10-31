import { observer } from 'mobx-react';
import React, { useContext } from 'react';
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
      {/* <Plot /> */}
    </ExpContext.Provider>
  );
}

function MathField() {
  const exp = useContext(ExpContext);
  
  const config = combineConfig(
    { initialLatex: '' }
  )
  config.virtualKeyboardMode =  'onfocus';
  config.onContentDidChange = (mf) => exp.update(mf.getValue("latex-expanded"));

  return (
    <MathfieldComponent
      latex={''}
      mathfieldConfig={config}
    />
  );
}

function ResultBox() {
  const exp = useContext(ExpContext);
  return (
    <ResultBoxView exp={exp} />
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
    </ul>
  ));