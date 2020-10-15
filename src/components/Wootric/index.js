import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

const Wootric = () => {
  const current_user = useSelector(state => state.auth);

  useEffect(() => {
    async function Startwootric () {

      let setupScript = document.createElement('script');
      setupScript.type = 'text/javascript';
      setupScript.async = true;
      setupScript.innerHTML = `
        wootric_no_surveyed_cookie = true;
        wootric_survey_immediately = true;
        window.wootricSettings = {
          email: '${current_user.email}',
          created_at: 1234567890,
          account_token: 'NPS-921f842f'
        };
      `;
      document.body.appendChild(setupScript);

      // Beacon
      let beacon = document.createElement('script');
      beacon.type = 'text/javascript';
      beacon.async = true;
  
      beacon.src = 'https://cdn.wootric.com/wootric-sdk.js';
      beacon.onload = function() {
        window.wootric('run');
      };
      document.body.appendChild(beacon);
    }
    Startwootric()

    return () => {
    };
  }, [])

  return (
    <>
    </>
  )
}

export default Wootric;