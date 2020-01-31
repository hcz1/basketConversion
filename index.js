const express = require('express');
const axios = require('axios');
const { ACCESS_TOKEN, PRICES } = require('./config');
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
  generateObj,
} = require('./helpers');
const app = express();
app.use(express.json());

const getExchangeRate = async ( { currency } ) => 
  axios.get(
    `http://api.currencylayer.com/live?access_key=${ACCESS_TOKEN}&currencies=${currency}&format=1`)
    .then(({ data }) => data)
    .catch(e=>e);
  

app.post('/basket', async (request, response) => {
  const { items = [], currency = 'USD' } = request.body;
  const subTotal = items.reduce((prev, curr) => prev += PRICES[curr.toUpperCase()], 0);
  const itemisedList = itemiseList(items);

  const currencyLayerRequest = await getExchangeRate( { currency } );
  
  if(!currencyLayerRequest.success) {
    response.status(500)
    response.send({error: currencyLayerRequest.error})}
  else {
    const { quotes: { ['USD' + currency]: exchangedRate } } = currencyLayerRequest;
    const res = generateObj({exchangedRate, subTotal, itemisedList, currency});
    response.status(200);
    response.send(
      res
    )
  }
});

app.get('*', (request, response) => {
  response.status(404)
  response.send({error: 'Not found', message: 'Please POST to /basket'});
});

app.listen(8081);