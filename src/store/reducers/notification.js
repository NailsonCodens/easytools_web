export default function notification(state = '', action){
  switch (action.type) {
    case 'notification':
      return action.count 
    default:
      return state;
  }
}