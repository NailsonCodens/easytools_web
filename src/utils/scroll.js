const scrollTop = function (first, secound){
  let m = '';
  let s = '';
  if (first !== '' || first !== undefined) {
    m = first
  }
  if (secound !== '' || secound !== undefined) {
    s = secound
  }

  window.scrollTo(m, s)
} 

export default scrollTop;