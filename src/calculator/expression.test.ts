import { expStore } from './expression';

describe('function test', () => {

  test('sin', () => {
    expStore.update('\\sin(2)');
    expect(Number(expStore.eval)).toBeCloseTo(Math.sin(2));

    // expStore.update('\\sin(45\\degree)');
    // expect(Number(expStore.eval)).toBeCloseTo(Math.sin(Math.PI / 4));
  })

  test('cos', () => {
    expStore.update('\\cos(2)');
    expect(Number(expStore.eval)).toBeCloseTo(Math.cos(2));
  })

  test('tan', () => {
    expStore.update('\\tan(2)');
    expect(Number(expStore.eval)).toBeCloseTo(Math.tan(2));
  })

  test('asin', () => {
    expStore.update('\\arcsin(0.2)');
    expect(Number(expStore.eval)).toBeCloseTo(Math.asin(0.2));
  })

  test('acos', () => {
    expStore.update('\\arccos(0.2)');
    expect(Number(expStore.eval)).toBeCloseTo(Math.acos(0.2));
  })

  test('atan', () => {
    expStore.update('\\arctan(0.2)');
    expect(Number(expStore.eval)).toBeCloseTo(Math.atan(0.2));
  })

  test('ln', () => {
    expStore.update('\\log(e+10)');
    expect(Number(expStore.eval)).toBeCloseTo(Math.log(Math.E + 10));
  })

  // test('lg', () => {
  //   expStore.update('\\log10(e+10)');
  //   expect(Number(expStore.eval)).toBeCloseTo(Math.log10(Math.E + 10));
  // })

  test('sqrt', () => {
    expStore.update('\\sqrt{5}');
    expect(Number(expStore.eval)).toBeCloseTo(Math.sqrt(5));
  })

})

describe('operation test', () => {

  test('plus', () => {
    expStore.update('1+2');
    expect(Number(expStore.eval)).toBeCloseTo(3);
  })

  test('minus', () => {
    expStore.update('1-2');
    expect(Number(expStore.eval)).toBeCloseTo(-1);
  })

  test('times', () => {
    expStore.update('1*2');
    expect(Number(expStore.eval)).toBeCloseTo(2);
    // expStore.update('1\\times 2');
    // expect(Number(expStore.eval)).toBeCloseTo(2);
    // expStore.update('1\\cdot 2');
    // expect(Number(expStore.eval)).toBeCloseTo(2);
  })

  test('divide', () => {
    expStore.update('\\frac{1}{2}');
    expect(Number(expStore.eval)).toBeCloseTo(1 / 2);
    expStore.update('1/2');
    expect(Number(expStore.eval)).toBeCloseTo(1 / 2);
    // expStore.update('1÷2');
    // expect(Number(expStore.eval)).toBeCloseTo(1 / 2);
  })

  test('exp', () => {
    expStore.update('e^{2}');
    expect(Number(expStore.eval)).toBeCloseTo(Math.pow(Math.E, 2));
  })

})

describe('general test', () => {
  test('eq1', () => {
    // expStore.update('\\cos(\\frac{pi}{4})');
    // console.log(expStore.text)
    // expect(Number(expStore.eval)).toBeCloseTo(0.7071);
    // expStore.update('\\ln(0.5)');
    // expect(Number(expStore.eval)).toBeCloseTo(Math.log(0.5));
    // expStore.update('\\ln(\\frac{1}{2}+1-1)');
    // expect(Number(expStore.eval)).toBeCloseTo(Math.log(0.5));
    // expStore.update('\\ln(\\cos(pi/3))');
    // expect(Number(expStore.eval)).toBeCloseTo(Math.log(0.5));
    // expStore.update('\\ln(0.7071)');
    // console.log(expStore.text)
    // expect(Number(expStore.eval)).toBeCloseTo(-0.3466);
    // expStore.update('\\ln(1/\\sqrt{2})');
    // console.log(expStore.text)
    // expect(Number(expStore.eval)).toBeCloseTo(-0.3466);
    // expStore.update('\\log(\\cos(\\frac{pi}{4}))');
    // console.log(expStore.text)
    // expect(Number(expStore.eval)).toBeCloseTo(-0.3466);
    // expStore.update('e^{2+\\sin(23)}-\\ln(\\cos(45\\degree))*pi+.1');
    // expect(Number(expStore.eval)).toBeCloseTo(4.3589);
  })
})
