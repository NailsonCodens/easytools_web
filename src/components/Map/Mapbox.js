import React, { useState, useEffect } from 'react';
import MapGL, { NavigationControl, ScaleControl, Popup } from 'react-map-gl';
import './style.css';
import 'mapbox-gl/dist/mapbox-gl.css'

const Mapbox = ({ lat, lng, url, title }) => {
  const TOKEN = 'pk.eyJ1IjoibmFpbHNvbiIsImEiOiJjazRrYmRyMnUwNHdoM2RvanpkM2t3Z2ZkIn0.8KBTYMBwH5sb0OIhnk5icg';
  const [latde, setLatde] = useState(lat !== undefined ? Number(lat) : 0)
  const [lngde, setLngde] = useState(lng !== undefined ? Number(lng) : 0)
  const [showPopup, setShowpopup] = useState(true);
  const [viewport, setViewPort ] = useState({
    width: '100%',
    height: 380,
    latitude: latde,
    longitude: lngde,
    zoom: 13,
    bearing: 0,
    pitch: 0
  })

  navigator.geolocation.getCurrentPosition(function(position) {

  });

  const navStyle = {
    position: 'absolute',
    top: 36,
    left: 0,
    padding: '10px'
  };

  const scaleStyle = {
    position: 'absolute',
    bottom: 30,
    left: 0,
    padding: '10px'
  };

  const styleImage = {
    width: '40px',
    height: '40px',
  }

  const _onViewportChange = viewport => setViewPort({...viewport, transitionDuration: 300 })

  return (
    <>
      <div>
        <MapGL
          {...viewport}
          width="100%"
          height="380px" 
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={TOKEN}
          onViewportChange={_onViewportChange}
        >
          <div style={navStyle}>
            <NavigationControl/>
          </div>
          <div style={scaleStyle}>
            <ScaleControl maxWidth={100} unit={"metric"}/>
          </div>
          {
            showPopup && <Popup
              latitude={viewport.latitude}
              longitude={viewport.longitude}
              closeButton={false}
              closeOnClick={false}
              onClose={() => setShowpopup(false)}
              anchor="top">
              <div>
                <div className="columns">
                  <div className="column">
                    <img src={url} alt={url} style={styleImage} />
                  </div>
                  <div className="columns">
                    <div className="title-popup">
                      { title }
                    </div>                
                  </div>
                </div>
              </div>
            </Popup>
          }
        </MapGL>
      </div>
    </>
  )
};

export default Mapbox;