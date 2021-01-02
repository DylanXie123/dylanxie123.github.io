import { expStore } from './expression'
const algebrite = require('algebrite');
const algebraLatex = require('algebra-latex');

const parser = new algebraLatex();
let expStr = '';

describe('basic', () => {

  test('add', () => {
    expStr = '1+2';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.float(exp).d).toBeCloseTo(3);
  })

  test('minus', () => {
    expStr = '1-2';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.float(exp).d).toBeCloseTo(-1);
  })

  test('times', () => {
    expStr = '1*2';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.float(exp).d).toBeCloseTo(2);

    // expStr = '1\\times 2';
    // parser.parseLatex(expStr);
    // exp = parser.toAlgebra(algebrite);
    // expect(algebrite.float(exp).d).toBeCloseTo(2);
  })

  test('divide', () => {
    expStr = '1/2';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.float(exp).d).toBeCloseTo(0.5);

    expStr = '3/4/5';
    parser.parseLatex(expStr);
    exp = parser.toAlgebra(algebrite);
    expect(algebrite.float(exp).d).toBeCloseTo(0.15);
  })

  test('sin', () => {
    expStr = '\\sin 2';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.float(exp).d).toBeCloseTo(Math.sin(2));
  })

  test('cos', () => {
    expStr = '\\cos 2';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.float(exp).d).toBeCloseTo(Math.cos(2));
  })

  test('tan', () => {
    expStr = '\\tan 2';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.float(exp).d).toBeCloseTo(Math.tan(2));
  })

  test('asin', () => {
    expStr = '\\arcsin 0.2';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.float(exp).d).toBeCloseTo(Math.asin(0.2));
  })

  test('acos', () => {
    expStr = '\\arccos 0.2';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.float(exp).d).toBeCloseTo(Math.acos(0.2));
  })

  test('atan', () => {
    expStr = '\\arctan 0.2';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.float(exp).d).toBeCloseTo(Math.atan(0.2));
  })

  test('exp', () => {
    expStr = 'e^2';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.float(exp).d).toBeCloseTo(Math.exp(2));
  })

  test('ln', () => {
    expStr = '\\log 2';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.float(exp).d).toBeCloseTo(Math.log(2));
  })

  test('sqrt', () => {
    expStr = '\\sqrt{2}';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.float(exp).d).toBeCloseTo(Math.sqrt(2));
  })

})

describe('symbolic output', () => {

  test('symbol output', () => {
    expStr = 'e+1-1';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.eval(exp).toString()).toBe('e');
  })

  test('symbol output', () => {
    expStr = '\\sin{pi/3}';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.eval(exp).toString()).toBe('1/2*3^(1/2)');
  })

  test('symbol output', () => {
    expStr = '4/6';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.eval(exp).toString()).toBe('2/3');
  })

})

describe('function calc', () => {

  test('int', () => {
    expStr = 'x^2';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.integral(exp).toString()).toBe('1/3*x^3');
  })

  test('diff', () => {
    expStr = 'x^2';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.derivative(exp).toString()).toBe('2*x');
  })

  test('defint', () => {
    expStr = 'x^2';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.defint(exp, 'x', 0, 2).toString()).toBe('8/3');
  })

  test('simplify', () => {
    expStr = 'a*b+a*c';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.simplify(exp).toString()).toBe('a*(b+c)');
  })

})

describe('solve', () => {

  test('polynomial', () => {
    expStr = 'x^2+3*x+5';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.roots(exp).toString()).toBe('[-3/2-1/2*i*11^(1/2),-3/2+1/2*i*11^(1/2)]');
  })

})

describe('complex calc', () => {

  test('plus & minus', () => {
    expStr = '1+i+5+i-9-7*i';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.float(exp.toString()).toString()).toBe('-3.0-5.0*i');
  })

  test('times & divide', () => {
    expStr = '(1+2*i)*(4+3*i)/(6+4*i)';
    parser.parseLatex(expStr);
    let exp = parser.toAlgebra(algebrite);
    expect(algebrite.float(exp.toString()).toString()).toBe('0.615385...+1.423077...*i');
  })

  // test('matrix', () => {
  //   expStr = '\\begin{bmatrix} a^2-b^2 & -1 \\\\ 1& 2ab \\end{bmatrix}';
  //   parser.parseLatex(expStr);
  //   let exp = parser.toAlgebra(algebrite);
  //   console.log(exp.toString());
  //   // expect(algebrite.float(exp.toString()).toString()).toBe('0.615385...+1.423077...*i');
  // })

})