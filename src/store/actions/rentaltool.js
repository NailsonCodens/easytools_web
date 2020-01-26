export function Rentaltool(dInit, dEnd, price, tension, amount){
  return {
    type: 'rentaltool',
    rentaltool: {startDate: dInit, endDate: dEnd, price: price, tension: tension, amount: amount},
  }
}