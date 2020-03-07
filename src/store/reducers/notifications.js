export default function notifications(state = [], action){
  switch (action.type) {
    case 'notifications':
      return  action.notifications;
    default:
      return state;
  }
}