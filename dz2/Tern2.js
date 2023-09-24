function manyChecks() {
  let a = Math.floor(Math.random() * 20) + 1;
  console.log(`a = ${a}`);
  return (
    (a > 10
      ? 'a is bigger than 10'
      : 'a is less than or equal to 10 ' +
        (a === 5 ? 'an example of a special case' : '')) +
    (a === 15 ? 'but a is not 15' : '') +
    (a > 5 ? 'and a is greater than 5' : 'and a is less than or equal to 5 ') +
    (a % 2 ? ' and a is odd' : ' and a is even ')
  );
}
function manyChecks3() {
  let a = Math.floor(Math.random() * 20) + 1;
  console.log(`a = ${a}`);
  let str = '';

  switch (a > 10) {
    case true:
      str += 'a is bigger than 10';
      break;
    case false:
      str += 'a is less than or equal to 10 ';
      break;
  }
  switch (a === 5) {
    case true:
      str += 'an example of a special case';
      break;
    case false:
      str += '';
      break;
  }
  switch (a === 15) {
    case true:
      str += 'but a is not 15';
      break;
    case false:
      str += '';
      break;
  }
  switch (a > 5) {
    case true:
      str += 'and a is greater than 5';
      break;
    case false:
      str += 'and a is less than or equal to 5 ';
      break;
  }
  switch (a % 2) {
    case 1:
      str += ' and a is odd';
      break;
    case 0:
      str += ' and a is even ';
      break;
  }

  return str;
}
function manyChecks2() {
  let a = Math.floor(Math.random() * 20) + 1;
  console.log(`a = ${a}`);
  let str = '';

  if (a > 10) {
    str += 'a is bigger than 10';
  } else {
    str += 'a is less than or equal to 10 ';
  }

  if (a === 5) {
    str += 'an example of a special case';
  } else {
    str += '';
  }

  if (a === 15) {
    str += 'but a is not 15';
  } else {
    str += '';
  }

  if (a > 5) {
    str += 'and a is greater than 5';
  } else {
    str += 'and a is less than or equal to 5 ';
  }
  if (a % 2) {
    str += ' and a is odd';
  } else {
    str += ' and a is even ';
  }

  return str;
}

console.log(manyChecks());
console.log(manyChecks2());
console.log(manyChecks3());
