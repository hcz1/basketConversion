# Basket Currency Conversion

  ## Pre-req
1. Node
2. npm

  ## Running
1. `npm install`
2. `npm start`
3. `npm test`

  ## Testing
1. `npm test`


  ## Usage
* Can configure prices of items and discounts in config.js
* REST API
* POST to localhost:8081/basket
* HEADER: Content-Type:application/json
* POST BODY (JSON): 
```javascript
  {
    "items": Array<"Soup" | "Bread" | "Milk", "Apples">,
    "currency" : "GBP" | "EUR" | "USD"
  }
```

* Response:
```javascript
  {
    "subTotal": number,
    "discounts": Array<"Apples 10% off" | "3 Milk 50 cents off"> | [],
    "discountAmt": number,
    "total": number,
    "currency": "GBP" | "EUR" | "USD"
  }
```
