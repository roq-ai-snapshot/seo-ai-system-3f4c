const mapping: Record<string, string> = {
  contents: 'content',
  guests: 'guest',
  organizations: 'organization',
  'seo-statuses': 'seo_status',
  'seo-strategies': 'seo_strategy',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
