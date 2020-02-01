export default function rentattempt(state = {}, action){
  switch (action.type) {
    case 'rentattempt':
      return action.rentattempt
    default:
      return state;
  }
}