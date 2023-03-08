import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, Checkbox, FormHelperText, Link, TextField, Typography } from '@mui/material';
import { useAuth } from '../../hooks/use-auth';
import { useMounted } from '../../hooks/use-mounted';

const phoneRegExp = /^\(?(?:\+?61|0)(?:(?:2\)?[ -]?(?:3[ -]?[38]|[46-9][ -]?[0-9]|5[ -]?[0-35-9])|3\)?(?:4[ -]?[0-57-9]|[57-9][ -]?[0-9]|6[ -]?[1-67])|7\)?[ -]?(?:[2-4][ -]?[0-9]|5[ -]?[2-7]|7[ -]?6)|8\)?[ -]?(?:5[ -]?[1-4]|6[ -]?[0-8]|[7-9][ -]?[0-9]))(?:[ -]?[0-9]){6}|4\)?[ -]?(?:(?:[01][ -]?[0-9]|2[ -]?[0-57-9]|3[ -]?[1-9]|4[ -]?[7-9]|5[ -]?[018])[ -]?[0-9]|3[ -]?0[ -]?[0-5])(?:[ -]?[0-9]){5})$/



export const AmplifyRegister = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const { register } = useAuth();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      surName: '',
      firmName: '',
      phone: '',
      email: '',
      password: '',
      policy: true,
      submit: null
    },
    validationSchema: Yup.object({
      firstName: Yup
        .string()
        .max(255)
        .required('First name is required'),
      surName: Yup
      .string()
      .max(255)
      .required('Surname is required'),
      firmName: Yup
      .string()
      .max(255)
      .required('Firm name is required'),
      phone: Yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .max(255)
      .required('Phone number is required'),
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .min(7)
        .max(255)
        .required('Password is required'),
      policy: Yup
        .boolean()
        .oneOf([true], 'This field must be checked')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await register(
          values.email, 
          values.password,
          values.firstName,
          values.surName,
          values.firmName,
          values.phone,
          );

        if (isMounted()) {
          router.push('/authentication/verify-code').catch(console.error);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    }
  });

  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
      {...props}>
        <TextField
        error={Boolean(formik.touched.firstName && formik.errors.firstName)}
        fullWidth
        helperText={formik.touched.firstName && formik.errors.firstName}
        label="First Name"
        margin="normal"
        name="firstName"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="text"
        value={formik.values.firstName}
      />
        <TextField
        error={Boolean(formik.touched.surName && formik.errors.surName)}
        fullWidth
        helperText={formik.touched.surName && formik.errors.surName}
        label="Surname"
        margin="normal"
        name="surName"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="text"
        value={formik.values.surName}
      />
      <TextField
        error={Boolean(formik.touched.firmName && formik.errors.firmName)}
        fullWidth
        helperText={formik.touched.firmName && formik.errors.firmName}
        label="Law Firm Name"
        margin="normal"
        name="firmName"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="text"
        value={formik.values.firmName}
      />
      <TextField
        error={Boolean(formik.touched.phone && formik.errors.phone)}
        fullWidth
        helperText={formik.touched.phone && formik.errors.phone}
        label="Phone Number"
        margin="normal"
        name="phone"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="text"
        value={formik.values.phone}
      />
      <TextField
        error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
        helperText={formik.touched.email && formik.errors.email}
        label="Email Address"
        margin="normal"
        name="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="email"
        value={formik.values.email}
      />
      <TextField
        error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
        helperText={formik.touched.password && formik.errors.password}
        label="Password"
        margin="normal"
        name="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.password}
      />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: -1,
          mt: 2
        }}
      >
        <Checkbox
          checked={formik.values.policy}
          name="policy"
          onChange={formik.handleChange}
        />
        <Typography
          color="textSecondary"
          variant="body2"
        >
          I have read the
          {' '}
          <Link
            component="a"
            href="#"
          >
            Terms and Conditions
          </Link>
        </Typography>
      </Box>
      {Boolean(formik.touched.policy && formik.errors.policy) && (
        <FormHelperText error>
          {formik.errors.policy}
        </FormHelperText>
      )}
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>
            {formik.errors.submit}
          </FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <Button
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Register
        </Button>
      </Box>
    </form>
  );
};
