import { ContentInterface } from 'interfaces/content';
import { GuestInterface } from 'interfaces/guest';
import { SeoStatusInterface } from 'interfaces/seo-status';
import { SeoStrategyInterface } from 'interfaces/seo-strategy';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  content?: ContentInterface[];
  guest?: GuestInterface[];
  seo_status?: SeoStatusInterface[];
  seo_strategy?: SeoStrategyInterface[];
  user?: UserInterface;
  _count?: {
    content?: number;
    guest?: number;
    seo_status?: number;
    seo_strategy?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
