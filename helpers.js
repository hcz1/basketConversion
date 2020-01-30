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
const discountUSD = (appleDiscountUSD, milkDiscount) => appleDiscountUSD + (milkDiscount ? 0.50 : 0);
const exchangeDiscountAmt = ({totalDiscountUSD, roundedExchangeRate}) => 
  Math.floor(100 * totalDiscountUSD * roundedExchangeRate)/100;
const exchangeTotal = ({exchangedSubTotal, exchangedDiscountAmt}) => 
  Math.floor((exchangedSubTotal - exchangedDiscountAmt) * 100)/100;

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
}