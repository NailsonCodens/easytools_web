export default function auth(state = [], action){
  switch (action.type) {
    case 'auth':
      return [ 
        ...state, 
        {
          email: action.email,
          name: action.name,
          type_user: action.type_user,
          token: action.token,
        }]
    default:
      return state;
  }
}