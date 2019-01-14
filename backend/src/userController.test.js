const sum = require('./userController');

test('adds 1 + 2 to equal 3', () => {
  expect(sum.summ(1, 2)).toBe(3);
});
