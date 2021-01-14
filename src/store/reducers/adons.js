export default function adons(state = '', action){
  switch (action.type) {
    case 'adons':
      let adons = {
        price: action.price,
      }
      return adons;
    default:
      return state;
  }
}