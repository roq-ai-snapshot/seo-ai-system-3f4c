import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface GuestInterface {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface GuestGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  organization_id?: string;
}
