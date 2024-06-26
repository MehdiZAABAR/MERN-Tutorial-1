import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import BackendURL from '../components/BackendURL';

// export const useDataFetching = (endpoint) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`${BackendURL}/${endpoint}`)
//       .then((response) => {
//         setData(response.data.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }, [endpoint]);

//   return { data, loading, setData };
// };

// export default useDataFetching;
export const useDataFetching = (endpoint, contextSetter) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchedData = useMemo(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BackendURL}/${endpoint}`);
        setData(response.data.data);
        if( contextSetter)
            contextSetter(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint, contextSetter]); // Dependency on endpoint only

  return { data, loading, setData };
};
export default useDataFetching;

export const fetchDataAsync = async (endpoint, contextSetter) => {
     try {
        const response = await axios.get(`${BackendURL}/${endpoint}`);
        if( contextSetter)
            contextSetter(response.data.data);
        return {data:response.data.data};
      } catch (error) {
        console.log(error);
      } 
  return {};
};
