export default function Photo3(state = '', action){
  switch (action.type) {
    case 'photo3':
      return action.photo3
    default:
      return state;
  }
}