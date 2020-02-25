export default function distance(state = '', action){
  switch (action.type) {
    case 'distance':
      return action.distance;
    default:
      return state;
  }
}