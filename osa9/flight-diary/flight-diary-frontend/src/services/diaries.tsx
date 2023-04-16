import axios from 'axios';
import { DiaryEntryProps, DiaryEntryFormValues } from '../types';
const baseUrl = '/api/diaries';

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const create = async (object: DiaryEntryFormValues) => {
  const { data } = await axios.post<DiaryEntryProps>(`${baseUrl}`, object);

  return data;
};
