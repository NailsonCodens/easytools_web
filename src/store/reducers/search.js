export default function search(state = '', action){
  switch (action.type) {
    case 'search':
      let search = {
        search: action.search,
        email: action.lat,
        name: action.lng,
      }
      return search;
    default:
      return state;
  }
}