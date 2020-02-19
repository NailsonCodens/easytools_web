export default function link(state = '', action){
  switch (action.type) {
    case 'link':
      return action.link 
    default:
      return state;
  }
}