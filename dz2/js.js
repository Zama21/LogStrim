let a = Math.floor(Math.random() * 100);

// a = 11;
console.log(
  (a > 10 ? a : a * 2) > 5
    ? 2 * a + 1
    : (a < 3 ? 1 : 2 * (a - 2)) > 4
    ? 5
    : a % 2 == 0
    ? 6
    : 7
);
console.log('===============================');
if (a > 10) {
  if (a > 5) {
    console.log(2 * a + 1);
  } else {
    if (a < 3) {
      if (1 > 4) {
        console.log(5);
      } else {
        if (a % 2 == 0) {
          console.log(6);
        } else {
          console.log(7);
        }
      }
    } else {
      if (2 * (a - 2) > 4) {
        console.log(5);
      } else {
        if (a % 2 == 0) {
          console.log(6);
        } else {
          console.log(7);
        }
      }
    }
  }
} else {
  if (a * 2 > 5) {
    console.log(2 * a + 1);
  } else {
    if (a < 3) {
      if (1 > 4) {
        console.log(5);
      } else {
        if (a % 2 == 0) {
          console.log(6);
        } else {
          console.log(7);
        }
      }
    } else {
      if (2 * (a - 2) > 4) {
        console.log(5);
      } else {
        if (a % 2 == 0) {
          console.log(6);
        } else {
          console.log(7);
        }
      }
    }
  }
}
