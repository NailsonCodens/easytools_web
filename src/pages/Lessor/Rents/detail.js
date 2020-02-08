import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useParams } from "react-router-dom";
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
  
export default function Rents() {
  const [state, setstate] = useState([]);
  let { id } = useParams();
  let values = queryString.parse(useLocation().search);

  useEffect(() => {
    async function loadTool() { 
      

    }
    
    return () => {
    };
  }, [])

  return (
    <p>dasdsad</p>
  );
}
