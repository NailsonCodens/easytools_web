export default function auth(state = [], action){
  switch (action.type) {
    case 'auth':
      return [ 
        ...state, 
        {
          email: action.email,
          name: action.name,
          token: action.token,
          type: action.type, 
        }]
    default:
      return state;
  }
}