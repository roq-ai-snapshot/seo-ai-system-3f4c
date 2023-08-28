import axios from 'axios';
import queryString from 'query-string';
import { SeoStatusInterface, SeoStatusGetQueryInterface } from 'interfaces/seo-status';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSeoStatuses = async (
  query?: SeoStatusGetQueryInterface,
): Promise<PaginatedInterface<SeoStatusInterface>> => {
  const response = await axios.get('/api/seo-statuses', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSeoStatus = async (seoStatus: SeoStatusInterface) => {
  const response = await axios.post('/api/seo-statuses', seoStatus);
  return response.data;
};

export const updateSeoStatusById = async (id: string, seoStatus: SeoStatusInterface) => {
  const response = await axios.put(`/api/seo-statuses/${id}`, seoStatus);
  return response.data;
};

export const getSeoStatusById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/seo-statuses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSeoStatusById = async (id: string) => {
  const response = await axios.delete(`/api/seo-statuses/${id}`);
  return response.data;
};
