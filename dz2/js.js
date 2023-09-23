let a = Math.floor(Math.random());

console.log(
  (a > 10 ? a : a * 2) > 5
    ? 2 * a + 1
    : (a < 3 ? 1 : 2 * (a - 2)) > 4
    ? 5
    : a % 2 == 0
    ? 6
    : 7
);
