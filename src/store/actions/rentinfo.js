export function Rentinfo(rentinfo){
  rentinfo["picture1"] = rentinfo.picture.length > 0 ? rentinfo.picture[0].url : '' 

  if (rentinfo.picture[1] !== undefined) {
    rentinfo["picture2"] = rentinfo.picture.length > 0 ? rentinfo.picture[1].url : ''     
  }

  if (rentinfo.picture[2] !== undefined) {
    rentinfo["picture3"] = rentinfo.picture.length > 0 ? rentinfo.picture[2].url : ''
  }

  delete rentinfo.picture

  return {
    type: 'rentinfo',
    rentinfo: rentinfo,
  }
}