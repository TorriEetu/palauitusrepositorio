import axios from 'axios';
const baseUrl = '/api/diaries';

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
