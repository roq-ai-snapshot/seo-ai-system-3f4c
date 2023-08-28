import axios from 'axios';
import queryString from 'query-string';
import { SeoStrategyInterface, SeoStrategyGetQueryInterface } from 'interfaces/seo-strategy';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSeoStrategies = async (
  query?: SeoStrategyGetQueryInterface,
): Promise<PaginatedInterface<SeoStrategyInterface>> => {
  const response = await axios.get('/api/seo-strategies', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSeoStrategy = async (seoStrategy: SeoStrategyInterface) => {
  const response = await axios.post('/api/seo-strategies', seoStrategy);
  return response.data;
};

export const updateSeoStrategyById = async (id: string, seoStrategy: SeoStrategyInterface) => {
  const response = await axios.put(`/api/seo-strategies/${id}`, seoStrategy);
  return response.data;
};

export const getSeoStrategyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/seo-strategies/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSeoStrategyById = async (id: string) => {
  const response = await axios.delete(`/api/seo-strategies/${id}`);
  return response.data;
};
