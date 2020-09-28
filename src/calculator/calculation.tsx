const nerdamer = require('nerdamer/all');

export function calc(expression: string): string {
  try {
    let e = nerdamer.convertFromLaTeX(expression);
    return e.evaluate().text();
  } catch (error) {
    return error;
  }
}

export function solve(expression: string): string {
  try {
    let e = nerdamer.convertFromLaTeX(expression);
    if (e.variables().length === 1) {
      return e.solveFor('x').toString();
    } else {
      return '';
    }
  } catch (error) {
    return error;
  }
}

export function integrate(expression: string): string {
  try {
    let e = nerdamer.convertFromLaTeX(expression);
    return nerdamer.integrate(e.text());
  } catch (error) {
    return error;
  }
}

export function defint(expression: string): string {
  try {
    let e = nerdamer.convertFromLaTeX(expression);
    return nerdamer.defint(e.text(), 0, 1);
  } catch (error) {
    return error;
  }
}

export function diff(expression: string): string {
  try {
    let e = nerdamer.convertFromLaTeX(expression);
    return nerdamer.diff(e.text());
  } catch (error) {
    return error;
  }
}
