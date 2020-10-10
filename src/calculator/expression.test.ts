import Expression from './expression';

test('expression', () => {
  const exp = new Expression();
  exp.update('1+2');
  expect(exp.eval).toBe('3');
})