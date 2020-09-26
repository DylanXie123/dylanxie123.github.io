import nerdamer from 'nerdamer';
import React, { useState } from 'react';
import { addStyles, EditableMathField } from 'react-mathquill';
const AlgebraLatex = require('algebra-latex')

addStyles()

export default function Calculator() {

  const initLatex = '1+2';
  const [latexExp, setResult] = useState(initLatex);

  return (
    <div>
      <EditableMathField
        latex={initLatex}
        onChange={
          (mathField) => setResult(mathField.latex())
          // (mathField) => console.log(mathField.latex())
        }
      />
      <p>{'Latex: ' + latexExp}</p>
      <p>{'Result: ' + calc(latexExp)}</p>
    </div>
  );
}

function calc(expression: string): string {
  try {
    const converter = new AlgebraLatex().parseLatex(expression);
    let e = nerdamer(converter.toMath());
    console.log(e.text());
    return e.evaluate().text();
  } catch (error) {
    return '';
  }
}
