const express = require('express');
const axios = require('axios');
const { ACCESS_TOKEN } = require('./config')
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
} = require('./helpers')
const app = express();

const prices = {
  "SOUP": 0.65,
  "BREAD": 0.80,
  "MILK": 1.15,
  "APPLES": 1.00,
  "DISCOUNTS": {
    "APPLES": 0.1,
    "MILK": (amount) => amount - 0.50, 
  },
}

const getExchangeRate = async ( { currency } ) => 
  axios.get(
    `http://api.currencylayer.com/live?access_key=${ACCESS_TOKEN}&currencies=${currency}&format=1`)
    .then(({ data }) => data)
    .catch(e=>e);
  

app.use(express.json());

app.post('/basket', async (request, response) => {
  const { items = [], currency = 'USD' } = request.body;
  const subTotal = items.reduce((prev, curr) => prev += prices[curr.toUpperCase()], 0);
  const itemisedList = itemiseList(items);

  const t = await getExchangeRate( { currency } );
  
  if(!t.success) {
    response.send( {error: t.error} )}
    else {
      const { quotes: { ['USD' + currency]: exchangedRate } } = t;
      const roundedExchangeRate = roundExchangeRate(exchangedRate);
      const exchangedSubTotal = exchangeSubTotal({subTotalUSD: subTotal, roundedExchangeRate })
      const appleDiscount = hasAppleDiscount(itemisedList);
      const milkDiscount = hasMilkDiscount(itemisedList);
      const appleDiscountedUSD = appleDiscountUSD({
        applesPrice: prices.APPLES, 
        applesDiscount: prices.DISCOUNTS.APPLES,
        numOfApples: itemisedList.APPLES,
      });
      const exchangedDiscounts = [appleDiscount, milkDiscount].filter(Boolean);
      const totalDiscountUSD = appleDiscountedUSD + (milkDiscount ? 0.50 : 0);
      const exchangedDiscountAmt = exchangeDiscountAmt({totalDiscountUSD, roundedExchangeRate });
      const total = exchangeTotal({
        exchangedSubTotal, 
        exchangedDiscountAmt
      });
      response.send(
        {
          subTotal: exchangedSubTotal,
          discounts: exchangeDiscounts({
            appleDiscount: hasAppleDiscount(itemisedList), 
            milkDiscount: hasMilkDiscount(itemisedList)
          }),
          discountAmt: exchangedDiscountAmt,
          total,
          currency,
        }
      )
    }
  });

app.listen(8081);