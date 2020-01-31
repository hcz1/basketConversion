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

test('has milk discount', () => {
  expect(hasMilkDiscount({MILK: 1})).toBe("3 Milk 50 cents off");
});

test('has no milk discount', () => {
  expect(hasMilkDiscount({APPLES: 1, SOUP: 2})).toBe(false);
});

test('empty object milk test', () => {
  expect(hasMilkDiscount({})).toBe(false);
});

test('has apples discount', () => {
  expect(hasAppleDiscount({APPLES: 1, SOUP: 2})).toBe('Apples 10% off');
});

test('has no apples discount', () => {
  expect(hasAppleDiscount({SOUP: 2})).toBe(false);
});

test('empty object Apple test', () => {
  expect(hasAppleDiscount({})).toBe(false);
});

test('Apple Discount', () => {
  expect(appleDiscountUSD({applesPrice: 1.00, applesDiscount: 0.1, numOfApples: 2})).toBe(0.2);
});

test('Echange Subtotal Calc', () => {
  expect(exchangeSubTotal({subTotalUSD: 3.00, roundedExchangeRate: 0.91})).toBe(2.73);
});

test('Discount USD apples and milk', () => {
  expect(discountUSD({appleDiscountUSD: 0.3, milkDiscount: true})).toBe(0.8);
});

test('Discount USD Milk', () => {
  expect(discountUSD({milkDiscount: true})).toBe(0.5);
});

test('Discount USD Apples', () => {
  expect(discountUSD({appleDiscountUSD: 0.3})).toBe(0.3);
});

test('exchangeDiscountAmt', () => {
  expect(exchangeDiscountAmt({totalDiscountUSD: 0.8, roundedExchangeRate: 0.91})).toBe(0.72);
});

test('exchangeTotal', () => {
  expect(exchangeTotal({exchangedSubTotal: 3, exchangedDiscountAmt: 0.72})).toBe(2.28);
});
