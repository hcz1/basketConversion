const { 
  itemiseList,
  roundExchangeRate,
  hasAppleDiscount,
  hasMilkDiscount,
  appleDiscountUSD,
  exchangeSubTotal,
  exchangeDiscounts,
  discountUSD,
  exchangeDiscountAmt,
  exchangeTotal,
} = require('./helpers');

test('2 decimal places', () => {
  expect(roundExchangeRate(0.90227)).toBe(0.90);
});

test('has milk true', () => {
  expect(hasMilkDiscount({MILK: 1})).toBe("3 Milk 50 cents off");
});

test('has milk false', () => {
  expect(hasMilkDiscount({APPLE: 1, SOUP: 2})).toBe(false);
});