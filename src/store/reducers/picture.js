export default function picture(state = [], action){
  switch (action.type) {
    case 'pictures':
      return [ ...state, { 
        url: action.url 
      }]
    default:
      return state;
  }
}