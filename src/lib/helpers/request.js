import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export default async (method, url, options = {}, config = null) => {
  const instance = axios.create({
    baseURL: API_URL,
  });

  try {
    const response = await instance[method](url, options, config);

    if (response.data) {
      const { data } = response;
      return data;
    }
  } catch (err) {
    const error = await err.response;

    throw error;
  }
};