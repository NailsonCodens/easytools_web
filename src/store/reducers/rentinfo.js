export default function rentinfo(state = {}, action){
  switch (action.type) {
    case 'rentinfo':
      return action.rentinfo
    default:
      return state;
  }
}