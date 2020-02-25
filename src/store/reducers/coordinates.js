export default function coordiantes(state = '', action){
  switch (action.type) {
    case 'coordinates':
      let coordinates = {
        lat: action.lat,
        lng: action.lng,
      }

      return coordinates;
    default:
      return state;
  }
}