import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface SeoStatusInterface {
  id?: string;
  status: string;
  keywords: string;
  backlinks: number;
  traffic: number;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface SeoStatusGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  keywords?: string;
  organization_id?: string;
}
