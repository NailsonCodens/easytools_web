export function Auth(email, name, type_user, token){
  return {
    type: 'auth',
    email: email,
    name: name,
    type_user: type_user,
    token: token,
  }
}