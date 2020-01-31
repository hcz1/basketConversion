const ACCESS_TOKEN = '7da111ea5b52c436523f66a628842ab0';
const PRICES = {
  'SOUP': 0.65,
  'BREAD': 0.80,
  'MILK': 1.15,
  'APPLES': 1.00,
  'DISCOUNTS': {
    'APPLES': 0.1,
    'MILK': (amount) => amount - 0.50, 
  },
}

module.exports = {
  ACCESS_TOKEN,
  PRICES,
}