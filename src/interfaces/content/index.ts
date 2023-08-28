import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ContentInterface {
  id?: string;
  title: string;
  body: string;
  seo_score: number;
  user_id: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {};
}

export interface ContentGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  body?: string;
  user_id?: string;
  organization_id?: string;
}
