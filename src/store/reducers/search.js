export default function picture(state = '', action){
  switch (action.type) {
    case 'search':
      return action.search 
    default:
      return state;
  }
}