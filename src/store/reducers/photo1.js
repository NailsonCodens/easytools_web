export default function Photo1(state = '', action){
  switch (action.type) {
    case 'photo1':
      return action.photo1 
    default:
      return state;
  }
}