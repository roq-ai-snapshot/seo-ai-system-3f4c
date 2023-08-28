import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createSeoStatus } from 'apiSdk/seo-statuses';
import { seoStatusValidationSchema } from 'validationSchema/seo-statuses';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { SeoStatusInterface } from 'interfaces/seo-status';

function SeoStatusCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SeoStatusInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSeoStatus(values);
      resetForm();
      router.push('/seo-statuses');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SeoStatusInterface>({
    initialValues: {
      status: '',
      keywords: '',
      backlinks: 0,
      traffic: 0,
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: seoStatusValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Seo Statuses',
              link: '/seo-statuses',
            },
            {
              label: 'Create Seo Status',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Seo Status
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.status}
            label={'Status'}
            props={{
              name: 'status',
              placeholder: 'Status',
              value: formik.values?.status,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.keywords}
            label={'Keywords'}
            props={{
              name: 'keywords',
              placeholder: 'Keywords',
              value: formik.values?.keywords,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Backlinks"
            formControlProps={{
              id: 'backlinks',
              isInvalid: !!formik.errors?.backlinks,
            }}
            name="backlinks"
            error={formik.errors?.backlinks}
            value={formik.values?.backlinks}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('backlinks', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Traffic"
            formControlProps={{
              id: 'traffic',
              isInvalid: !!formik.errors?.traffic,
            }}
            name="traffic"
            error={formik.errors?.traffic}
            value={formik.values?.traffic}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('traffic', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/seo-statuses')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'seo_status',
    operation: AccessOperationEnum.CREATE,
  }),
)(SeoStatusCreatePage);
