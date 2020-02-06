export default function auth(state = {}, action){
  switch (action.type) {
    case 'auth':
      let auth = {
        id: action.id,
        email: action.email,
        name: action.name,
        type_user: action.type_user,
        token: action.token,
      }
      return auth;
    default:
      return state;
  }
}