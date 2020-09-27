import React, { useState } from 'react';
import { addStyles, EditableMathField } from 'react-mathquill';
const nerdamer = require('nerdamer/all');

addStyles()

export default function Calculator() {

  const initLatex = '1+x';
  const [latexExp, setResult] = useState(initLatex);

  return (
    <div>
      <EditableMathField
        latex={initLatex}
        onChange={
          (mathField) => setResult(mathField.latex())
        }
      />
      <p></p>
      <button hidden={true}>Solve</button>
      <p>{'Latex: ' + latexExp}</p>
      <p>{'Result: ' + calc(latexExp)}</p>
      <p>{'Solve: ' + solve(latexExp)}</p>
      <p>{'Integer: ' + integrate(latexExp)}</p>
      <p>{'Defint: ' + defint(latexExp)}</p>
      <p>{'Diff: ' + diff(latexExp)}</p>
    </div>
  );
}

function calc(expression: string): string {
  try {
    let e = nerdamer.convertFromLaTeX(expression);
    return e.evaluate().text();
  } catch (error) {
    return error;
  }
}

function solve(expression: string): string {
  try {
    let e = nerdamer.convertFromLaTeX(expression);
    if (e.variables().length == 1) {
      return e.solveFor('x').toString();
    } else {
      return '';
    }
  } catch (error) {
    return error;
  }
}

function integrate(expression: string): string {
  try {
    let e = nerdamer.convertFromLaTeX(expression);
    return nerdamer.integrate(e.text());
  } catch (error) {
    return error;
  }
}

function defint(expression: string): string {
  try {
    let e = nerdamer.convertFromLaTeX(expression);
    return nerdamer.defint(e.text(), 0, 1);
  } catch (error) {
    return error;
  }
}

function diff(expression: string): string {
  try {
    let e = nerdamer.convertFromLaTeX(expression);
    return nerdamer.diff(e.text());
  } catch (error) {
    return error;
  }
}
