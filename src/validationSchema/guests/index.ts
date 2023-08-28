import * as yup from 'yup';

export const guestValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});
