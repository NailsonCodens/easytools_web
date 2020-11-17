export default function refreshui (state = {}, action){
  switch (action.type) {
    case 'refreshui':
      return {
        ...state,
        payload: action.payload,
      }
    default:
      return state;
  }
}