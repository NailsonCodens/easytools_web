export default function Photo2(state = '', action){
  switch (action.type) {
    case 'photo2':
      return action.photo2
    default:
      return state;
  }
}