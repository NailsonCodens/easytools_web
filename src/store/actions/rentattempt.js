export function Rentattempt(price, days, cost, amount, period, freight, priceperiod){
  return {
    type: 'rentattempt',
    rentattempt: {price: price, days: days, cost: cost, amount: amount, period: period, freight: freight, priceperiod: priceperiod},
  }
}