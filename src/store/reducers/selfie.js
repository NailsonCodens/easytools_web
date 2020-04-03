export default function selfie(state = '', action){
  switch (action.type) {
    case 'selfie':
      return action.selfie 
    default:
      return state;
  }
}