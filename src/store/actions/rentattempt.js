export function Rentattempt(price, days, cost, amount, period){
  return {
    type: 'rentattempt',
    rentattempt: {price: price, days: days, cost: cost, amount: amount, period: period},
  }
}