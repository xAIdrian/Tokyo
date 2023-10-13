import { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'http://localhost:3000/api/v3';

const useFetch = (endpoint, query) => { 
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    // headers: {
    //   'X-RapidAPI-Key': rapidApiKey,
    //   'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    // },
    url: `${url}/${endpoint}`,
    params: { ...query },
  };

  const fetchData = async () => { 
    setIsLoading(true);
    try {
      const response = await axios.request(options);

      setData(response.data.data);
    } catch (error) {
      setError(error);
      alert('There is an error');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  }

  return { data, isLoading, error, refetch };
}

export default useFetch;
