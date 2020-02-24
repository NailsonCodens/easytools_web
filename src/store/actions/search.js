export function Search(search, lat, lng){
  return {
    type: 'search',
    search: search,
    lat: lat,
    lng: lng
  }
}