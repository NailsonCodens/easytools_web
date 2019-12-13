export function Auth(email, name, token, type_use){
  return {
    type: 'auth',
    email: email,
    name: name,
    type_user: type_use,
    token: token,
  }
}