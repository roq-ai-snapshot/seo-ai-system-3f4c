import * as yup from 'yup';

export const seoStrategyValidationSchema = yup.object().shape({
  strategy: yup.string().required(),
  goals: yup.string().required(),
  tactics: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});
