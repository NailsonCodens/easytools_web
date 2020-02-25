export default function longitude(state = '', action){
  switch (action.type) {
    case 'longitude':
      return action.lng;
    default:
      return state;
  }
}