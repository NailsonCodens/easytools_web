export default function search(state = '', action){
  switch (action.type) {
    case 'search':
      return action.search;
    default:
      return state;
  }
}