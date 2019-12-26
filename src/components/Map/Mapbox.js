import React, { useState } from 'react';
import MapGL, { GeolocateControl } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css'

const Mapbox = () => {
  const TOKEN = 'pk.eyJ1IjoibmFpbHNvbiIsImEiOiJjazRrYmRyMnUwNHdoM2RvanpkM2t3Z2ZkIn0.8KBTYMBwH5sb0OIhnk5icg';
  const [viewport, setViewPort ] = useState({
    width: '100%',
    height: 300,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 12.8,
    bearing: 0,
    pitch: 0
  })

  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position)
  });

  const geolocateStyle = {
    width: '50px',
    float: 'left',
    position: 'absolute',
    left: '200px',
    margin: '-50px',
    left: '200px',
    padding: '10px'
};  

  const _onViewportChange = viewport => setViewPort({...viewport, transitionDuration: 300 })

  return (
    <>
      <div>
        <MapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={TOKEN}
          onViewportChange={_onViewportChange}
        />
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
      </div>
    </>
  )
};

export default Mapbox;