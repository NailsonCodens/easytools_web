export default function document(state = '', action){
  switch (action.type) {
    case 'document':
      return action.document 
    default:
      return state;
  }
}