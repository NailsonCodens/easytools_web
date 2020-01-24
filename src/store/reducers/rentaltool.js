export default function rentaltool(state = {}, action){
  switch (action.type) {
    case 'rentaltool':
      return action.rentaltool
    default:
      return state;
  }
}