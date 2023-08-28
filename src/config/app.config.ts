interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['Guest'],
  tenantRoles: ['Business Owner', 'Marketing Manager', 'SEO Specialist', 'Content Creator'],
  tenantName: 'Organization',
  applicationName: 'SEO AI system',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
