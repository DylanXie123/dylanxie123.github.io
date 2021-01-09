import nerdamer from 'nerdamer';
const nerdamerAll = require('nerdamer/all');

let expStr = '';

test('basic', () => {

  const testSample: Map<string, number> = new Map([
    ['1+2', 3],
    ['1-2', -1],
    ['1\\cdot 2', 2],
    ['1\\times 2', 2],
    ['1/2', 0.5],
    ['3/4/5', 0.15],
    ['\\sin 2', Math.sin(2)],
    ['\\cos 2', Math.cos(2)],
    ['\\tan 2', Math.tan(2)],
    ['\\asin 0.2', Math.asin(0.2)],
    ['\\acos 0.2', Math.acos(0.2)],
    ['\\atan 0.2', Math.atan(0.2)],
    ['e^2', Math.exp(2)],
    ['\\log 2', Math.log(2)],
    ['\\sqrt{2}', Math.sqrt(2)],
  ]);

  testSample.forEach((result, expStr) => {
    let expression = nerdamerAll.convertFromLaTeX(expStr) as nerdamer.Expression;
    let calcResult = Number(expression.evaluate().text());
    expect(calcResult).toBeCloseTo(result);
  })

})

test('symbolic output', () => {
  const testSample: Map<string, string> = new Map([
    ['e+1-1', 'e'],
    ['\\sin{pi/3}', '\\frac{\\sqrt{3}}{2}'],
    ['4/6', '\\frac{2}{3}'],
  ]);

  testSample.forEach((result, expStr) => {
    let expression = nerdamerAll.convertFromLaTeX(expStr) as nerdamer.Expression;
    let calcResult = expression.toTeX();
    expect(calcResult).toBe(result);
  })

})

describe('function calc', () => {

  test('int', () => {
    expStr = 'x^2';
    let expression = nerdamerAll.convertFromLaTeX(expStr) as nerdamer.Expression;
    let integration = nerdamer.integrate(expression, 'x');
    let calcResult = integration.toTeX();
    expect(calcResult).toBe('\\frac{x^{3}}{3}');
  })

  test('diff', () => {
    expStr = 'x^2';
    let expression = nerdamerAll.convertFromLaTeX(expStr) as nerdamer.Expression;
    let integration = nerdamer.diff(expression, 'x');
    let calcResult = integration.toTeX();
    expect(calcResult).toBe('2 \\cdot x');
  })

  test('defint', () => {
    expStr = 'x^2';
    let expression = nerdamerAll.convertFromLaTeX(expStr) as nerdamer.Expression;
    let integration = nerdamerAll(`defint(${expression.evaluate().text()}, 0, 2)`) as nerdamer.Expression;
    let calcResult = integration.evaluate().toTeX();
    expect(calcResult).toBe('\\frac{8}{3}');
  })

  test('simplify', () => {
    expStr = 'a*b+a*c';
    let expression = nerdamerAll.convertFromLaTeX(expStr) as nerdamer.Expression;
    let simplify = nerdamerAll(`simplify(${expression.evaluate().text()})`) as nerdamer.Expression;
    let calcResult = simplify.toTeX();
    expect(calcResult).toBe('\\left(b+c\\right) \\cdot a');
  })

})

describe('solve', () => {

  test('polynomial', () => {
    expStr = 'x^2+3*x+5';
    let expression = nerdamerAll.convertFromLaTeX(expStr) as nerdamer.Expression;
    let calcResult = expression.solveFor('x');
    expect(calcResult.toString()).toBe('(1/2)*i*sqrt(11)-3/2,(-1/2)*i*sqrt(11)-3/2');
  })

})

describe('matrix', () => {

  test('matrix input', () => {
    expStr = 'matrix([0,3],[5,6])';
    let expression = nerdamerAll(expStr) as nerdamer.Expression;
    let calcResult = expression.evaluate().text();
    expect(calcResult).toBe('matrix([0],[3],[5],[6])');

    // expStr = '\\begin{matrix}0 & 3 \\ 5 & 6\\end{matrix}';
    // expression = nerdamerAll.convertFromLaTeX(expStr) as nerdamer.Expression;
    // calcResult = expression.evaluate().toTeX();
    // console.log(calcResult);
    // expect(calcResult).toBe('matrix([0],[3],[5],[6])');
  })

  test('matrix multiply', () => {
    expStr = 'matrix([0,3],[5,6])*2';
    let expression = nerdamerAll(expStr) as nerdamer.Expression;
    let calcResult = expression.evaluate().text();
    expect(calcResult).toBe('matrix([0],[6],[10],[12])');

    expStr = 'matrix([0,3],[5,6])*matrix([0,3],[5,6])';
    expression = nerdamerAll(expStr) as nerdamer.Expression;
    calcResult = expression.evaluate().text();
    expect(calcResult).toBe('matrix([15],[18],[30],[51])');

    expStr = 'matrix([0,3],[5,6])*matrix([3],[5])';
    expression = nerdamerAll(expStr) as nerdamer.Expression;
    calcResult = expression.evaluate().text();
    expect(calcResult).toBe('matrix([15],[45])');
  })

  test('invert matrix', () => {
    expStr = 'invert(matrix([0,3],[5,6]))';
    let expression = nerdamerAll(expStr) as nerdamer.Expression;
    let calcResult = expression.evaluate().text();
    expect(calcResult).toBe('matrix([-2/5],[1/5],[1/3],[0])');
  })

})

describe('complex calc', () => {

  test('plus & minus', () => {
    expStr = '1+i+5+i-9-7*i';
    let expression = nerdamerAll.convertFromLaTeX(expStr) as nerdamer.Expression;
    let calcResult = expression.evaluate().toTeX();
    expect(calcResult.toString()).toBe('-5 \\cdot i-3');
  })

  test('times & divide', () => {
    expStr = '(1+2*i)*(4+3*i)/(6+4*i)';
    let expression = nerdamerAll.convertFromLaTeX(expStr) as nerdamer.Expression;
    let calcResult = expression.evaluate().toTeX();
    expect(calcResult.toString()).toBe('\\frac{\\left(2 \\cdot i+1\\right) \\cdot \\left(3 \\cdot i+4\\right)}{4 \\cdot i+6}');
  })

})