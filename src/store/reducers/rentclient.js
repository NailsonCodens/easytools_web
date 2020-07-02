export default function rentclient(state = {}, action){
  switch (action.type) {
    case 'rentclient':
      return action.rentclient
    default:
      return state;
  }
}