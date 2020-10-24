import { expStore } from './expression'
const algebrite = require('algebrite');

test('basic', () => {
  let a = algebrite.run('1+2');
  console.log(a);
  
  a = algebrite.run('e^(2+sin(23))-log(cos(pi/4))*pi+.1');
  console.log(a);
})