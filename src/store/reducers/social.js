export default function social(state = '', action){
  switch (action.type) {
    case 'social':
      return action.social 
    default:
      return state;
  }
}