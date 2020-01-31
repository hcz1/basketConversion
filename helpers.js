const { PRICES } = require('./config')

const itemiseList = (items) => items.reduce((prev,curr)=> {
  prev[curr.toUpperCase()] = prev[curr.toUpperCase()] || 0;
  prev[curr.toUpperCase()] += 1;
  return prev;
}, {});

const roundExchangeRate = (exchangedRate) => 
  Math.floor( Math.round(exchangedRate * 100 )) / 100;

const hasAppleDiscount = (itemisedList) => itemisedList.APPLES ? "Apples 10% off" : false;
const hasMilkDiscount = (itemisedList) => itemisedList.MILK ? "3 Milk 50 cents off" : false;
const appleDiscountUSD = ({applesPrice = 1, applesDiscount = 0.1, numOfApples = 0}) => 
  Math.floor(applesPrice * applesDiscount * numOfApples * 100) / 100;
const exchangeSubTotal = ({subTotalUSD, roundedExchangeRate}) => 
  Math.floor(subTotalUSD * roundedExchangeRate * 100 ) / 100;
const exchangeDiscounts = ({ appleDiscount, milkDiscount }) => 
  [appleDiscount, milkDiscount].filter(Boolean);
const discountUSD = ({appleDiscountUSD = 0, milkDiscount = false}) => appleDiscountUSD + (milkDiscount ? 0.50 : 0);
const exchangeDiscountAmt = ({totalDiscountUSD, roundedExchangeRate}) => 
  Math.floor(100 * totalDiscountUSD * roundedExchangeRate)/100;
const exchangeTotal = ({exchangedSubTotal, exchangedDiscountAmt}) => 
  Math.floor((exchangedSubTotal - exchangedDiscountAmt) * 100)/100;


const generateObj = ({exchangedRate, subTotal, itemisedList, currency}) => {
  const roundedExchangeRate = roundExchangeRate(exchangedRate);
  const exchangedSubTotal = exchangeSubTotal({subTotalUSD: subTotal, roundedExchangeRate })
  const appleDiscount = hasAppleDiscount(itemisedList);
  const milkDiscount = hasMilkDiscount(itemisedList);
  const appleDiscountedUSD = appleDiscountUSD({
    applesPrice: PRICES.APPLES,
    applesDiscount: PRICES.DISCOUNTS.APPLES,
    numOfApples: itemisedList.APPLES,
  });
  const exchangedDiscounts = [appleDiscount, milkDiscount].filter(Boolean);
  const totalDiscountUSD = discountUSD({appleDiscountUSD: appleDiscountedUSD, milkDiscount});
  const exchangedDiscountAmt = exchangeDiscountAmt({totalDiscountUSD, roundedExchangeRate });
  const total = exchangeTotal({
    exchangedSubTotal, 
    exchangedDiscountAmt
  });
  return {
    subTotal: exchangedSubTotal,
    discounts: exchangeDiscounts({
      appleDiscount: hasAppleDiscount(itemisedList), 
      milkDiscount: hasMilkDiscount(itemisedList)
    }),
    discountAmt: exchangedDiscountAmt,
    total,
    currency,
  }
}

module.exports = {
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
  generateObj,
}