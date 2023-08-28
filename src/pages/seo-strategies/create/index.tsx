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

import { createSeoStrategy } from 'apiSdk/seo-strategies';
import { seoStrategyValidationSchema } from 'validationSchema/seo-strategies';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { SeoStrategyInterface } from 'interfaces/seo-strategy';

function SeoStrategyCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SeoStrategyInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSeoStrategy(values);
      resetForm();
      router.push('/seo-strategies');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SeoStrategyInterface>({
    initialValues: {
      strategy: '',
      goals: '',
      tactics: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: seoStrategyValidationSchema,
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
              label: 'Seo Strategies',
              link: '/seo-strategies',
            },
            {
              label: 'Create Seo Strategy',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Seo Strategy
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.strategy}
            label={'Strategy'}
            props={{
              name: 'strategy',
              placeholder: 'Strategy',
              value: formik.values?.strategy,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.goals}
            label={'Goals'}
            props={{
              name: 'goals',
              placeholder: 'Goals',
              value: formik.values?.goals,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.tactics}
            label={'Tactics'}
            props={{
              name: 'tactics',
              placeholder: 'Tactics',
              value: formik.values?.tactics,
              onChange: formik.handleChange,
            }}
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
              onClick={() => router.push('/seo-strategies')}
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
    entity: 'seo_strategy',
    operation: AccessOperationEnum.CREATE,
  }),
)(SeoStrategyCreatePage);
