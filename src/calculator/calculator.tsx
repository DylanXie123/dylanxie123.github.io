import { observer } from 'mobx-react';
import React from 'react';
import { addStyles, EditableMathField } from 'react-mathquill';
import './expression_store';
import ExpStore from './expression_store';

addStyles()

const store = new ExpStore();

export default function Calculator() {
  return (
    <div>
      <EditableMathField
        latex={store.expression}
        onChange={
          (mathField) => store.update(mathField.latex())
        }
      />
      <ResultBox exp={store} />
    </div>
  );
}

interface ResultBoxProps {
  exp: ExpStore
}

// @observer
const ResultBox: React.FC<ResultBoxProps> = observer(props =>
  (
    <ul>
      <li>{'Latex: ' + props.exp.expression}</li>
      <li>{'Result: ' + props.exp.result}</li>
      {/* <li>{'Solve: ' + solve(exp.expression)}</li>
      <li>{'Integer: ' + integrate(exp.expression)}</li>
      <li>{'Defint: ' + defint(exp.expression)}</li>
      <li>{'Diff: ' + diff(exp.expression)}</li> */}
    </ul>
  )
)
