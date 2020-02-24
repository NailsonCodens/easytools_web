import { toast } from 'react-toastify';

const Notification = function (typetoastify = 'info', text = 'Padrão', config = {autoClose: 3000, draggable: false }, type = { position: "top-center", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true }){
  toast.configure({
    config
  })

  switch(typetoastify){
    case 'info':
      toast.info(text, type)
      break;
    case 'success':
      toast.success(text, type)
      break;
    case 'warning':
        toast.warning(text, type)
        break;
        case 'error':
          toast.error(text, type)
          break;
    default: 
      toast.info(text, type)
     break;
  }
} 

export default Notification;