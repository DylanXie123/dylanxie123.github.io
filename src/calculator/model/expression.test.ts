import { expStore } from './expression';

describe('parser test', () => {

  test('input', () => {
    const inputTestSample: Map<string, number> = new Map([
      ['1\\times2', 2],
      ['1\\div2', 0.5],
      ['\\arcsin(1)', Math.PI / 2],
    ]);
    inputTestSample.forEach((v, k) => {
      expStore.update(k);
      const result = Number(expStore.eval);
      expect(result).toBeCloseTo(v);
    });
  })

  test('output', () => {
    const outputTestSample: Map<string, string> = new Map([
      ['e\\times\\pi', 'e \\times \\pi'],
    ]);
    outputTestSample.forEach((v, k) => {
      expStore.update(k);
      expect(expStore.text).toBe(v);
    });
  })

})

// TODO: Need more test about error input
test('error input test', () => {

  expStore.update('1+');
  expect(expStore.eval).toBe(undefined);
  
  // expStore.update('x+');
  // expect(expStore.integrate).toBe(undefined);

})

test('general test', () => {

  expStore.update('e^{2+\\sin(23)}-\\log(\\cos(pi/4))*\\pi+0.1');
  expect(Number(expStore.eval)).toBeCloseTo(4.3589);

  expStore.update('e^{e-2*\\sin(23/\\log(5))}');
  expect(Number(expStore.eval)).toBeCloseTo(2.0997);

  expStore.update('\\sin(e^{pi/3+1}+\\cos(4/4))');
  expect(Number(expStore.eval)).toBeCloseTo(0.9079);

  expStore.update('3/4/5');
  expect(Number(expStore.eval)).toBeCloseTo(0.15);

})
