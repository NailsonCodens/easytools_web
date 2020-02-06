export function Auth(email, name, type_user, token, id){
  return {
    type: 'auth',
    id: id, 
    email: email,
    name: name,
    type_user: type_user,
    token: token,
  }
}