import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface SeoStrategyInterface {
  id?: string;
  strategy: string;
  goals: string;
  tactics: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface SeoStrategyGetQueryInterface extends GetQueryInterface {
  id?: string;
  strategy?: string;
  goals?: string;
  tactics?: string;
  organization_id?: string;
}
