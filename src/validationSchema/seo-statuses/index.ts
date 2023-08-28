import * as yup from 'yup';

export const seoStatusValidationSchema = yup.object().shape({
  status: yup.string().required(),
  keywords: yup.string().required(),
  backlinks: yup.number().integer().required(),
  traffic: yup.number().integer().required(),
  organization_id: yup.string().nullable().required(),
});
