import alg from 'algebra.js';
const algl = require('algebra-latex');

test('basic', ()=>{
  const expStr = '1+5';
  const algObj = new algl().parseLatex(expStr);
  const a = algObj.toAlgebra(alg)
  console.log(a.toString())
})