export function Rentclient(start, end, prices, tension, am, ){
  return {
    type: 'rentclient',
    rentattempt: {tension: tension, am: am, start: start, end: end},
  }
}