export default function coordiantes(state = '', action){
  switch (action.type) {
    case 'coordinates':
      let coordinates = {
        lat: action.lat,
        lng: action.lng,
      }

      return coordiantes;
    default:
      return state;
  }
}