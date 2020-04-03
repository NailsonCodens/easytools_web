export default function proof(state = '', action){
  switch (action.type) {
    case 'proof':
      return action.proof 
    default:
      return state;
  }
}