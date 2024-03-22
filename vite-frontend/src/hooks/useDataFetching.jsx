import { useState, useEffect } from 'react';
import axios from 'axios';
import BackendURL from '../components/BackendURL';

export const useDataFetching = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BackendURL}/${endpoint}`)
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [endpoint]);

  return { data, loading, setData };
};

export default useDataFetching;
