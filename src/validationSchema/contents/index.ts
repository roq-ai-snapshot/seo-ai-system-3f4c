import * as yup from 'yup';

export const contentValidationSchema = yup.object().shape({
  title: yup.string().required(),
  body: yup.string().required(),
  seo_score: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
  organization_id: yup.string().nullable().required(),
});
