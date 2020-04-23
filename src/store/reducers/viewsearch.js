export default function viewsearch(state = '', action){
  switch (action.type) {
    case 'viewsearch':
      return action.viewsearch;
    default:
      return state;
  }
}