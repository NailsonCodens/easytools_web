export default function latitude(state = '', action){
  switch (action.type) {
    case 'latitude':
      return action.lat;
    default:
      return state;
  }
}