export default function notification(state = '', action){
  switch (action.type) {
    case 'count':
      return action.count 
    default:
      return state;
  }
}