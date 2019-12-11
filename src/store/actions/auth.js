export function Auth(email, name, token, type_use){
  return {
    type: 'auth',
    email: email,
    name: name,
    token: token,
    type_user: type_use,
  }
}