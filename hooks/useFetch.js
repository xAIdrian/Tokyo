import { useState, useEffect } from 'react';
import axios from 'axios';

export const sendMessageToServer = async (messages, framework) => {
  const url = 'http://localhost:3000/api/v3/writer';
  const options = {
    method: 'POST',
    url: url,
    data: {
      messages: messages.map((message) => ({
        role: message.user._id === 1 ? 'user' : 'assistant',
        content: message.text,
      })),
      framework: framework,
    },
  };

  try {
    const response = await axios.request(options);
    if (response.data.message == 'success') {
      
      return response.data.result; 
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};


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