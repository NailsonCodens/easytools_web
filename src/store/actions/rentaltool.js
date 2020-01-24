export function Rentaltool(dInit, dEnd, price){
  return {
    type: 'rentaltool',
    rentaltool: {startDate: dInit, endDate: dEnd, price: price},
  }
}