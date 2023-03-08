import { Box, Button, Grid, Link, TextField, Typography, FormHelperText } from '@mui/material';
const axios = require('axios').default;
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
// import ReCAPTCHA from "react-google-recaptcha";


import * as Yup from 'yup';
import { useFormik } from 'formik';

export const ContactForm = (props) => {

  const { queryParams } = props;

  const formik = useFormik({
    initialValues: {

      name: '',
      firm: '',
      email: '',
      phone: '',
      message: '',

      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      firm: Yup
        .string()
        .max(255)
        .required('Firm is required'),
      phone: Yup
        .string()
        // .tel('Must be a phone number')
        .max(255)
        .required('Phone is required'),
      message: Yup
        .string()
        .max(1000)
        .required('Message is required'),

    }),
    onSubmit: async (values, helpers) => {
      try {

        // const captchaToken = captchaRef.current.getValue();
        // captchaRef.current.reset();
        // console.log(captchaToken);

        const { name, firm, email, phone, message } = values;
        const type = queryParams && queryParams.support ? "support" : "sales";

        const qs = new URLSearchParams({
          type, name, firm, email, phone, message
        }).toString();

        const url = "https://qo6kkqgk27.execute-api.ap-southeast-2.amazonaws.com/prod?" + qs;

        const raw = await axios.get(url);

        toast.success(JSON.stringify({
          name, firm, email, phone, message
        }
        ))

        helpers.resetForm()

      } catch (error) {
        console.error(error);
        toast.error("There was an error sending your request, please check your connection and try again");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }

      setSending(false);

    }
  });

  const captchaRef = useRef(null);

  return (
    <form noValidate
      onSubmit={formik.handleSubmit}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
          sm={6}
        >
          <TextField
            required
            autoFocus
            error={Boolean(formik.touched.name && formik.errors.name)}
            fullWidth
            helperText={formik.touched.name && formik.errors.name}
            label="Name"
            margin="normal"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.name}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <TextField
            required
            autoFocus
            error={Boolean(formik.touched.firm && formik.errors.firm)}
            fullWidth
            helperText={formik.touched.firm && formik.errors.firm}
            label="Firm"
            margin="normal"
            name="firm"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.firm}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <TextField
            required
            autoFocus
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Email"
            margin="normal"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.email}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <TextField
            required
            autoFocus
            error={Boolean(formik.touched.phone && formik.errors.phone)}
            fullWidth
            helperText={formik.touched.phone && formik.errors.phone}
            label="Phone Number"
            margin="normal"
            name="phone"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="tel"
            value={formik.values.phone}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <TextField
            required
            rows={6}
            multiline
            autoFocus
            error={Boolean(formik.touched.message && formik.errors.message)}
            fullWidth
            helperText={formik.touched.message && formik.errors.message}
            label="Message"
            margin="normal"
            name="message"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.message}
          />
        </Grid>
      </Grid>

      {/* THIS IS A TEST KEY */}
      {/* <Box align="center">
        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          ref={captchaRef}
        />
      </Box> */}

      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>
            {formik.errors.submit}
          </FormHelperText>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 3
        }}
      >
        <Button
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="secondary"
        >
          Contact
        </Button>
      </Box>
      <Typography
        color="textSecondary"
        sx={{ mt: 3 }}
        variant="body2"
      >
        By submitting this, you agree to the
        {' '}
        <Link
          color="textPrimary"
          href="/privacy"
          underline="always"
          variant="subtitle2"
        >
          Privacy Policy
        </Link>
        {' '}
        and
        {' '}
        <Link
          color="textPrimary"
          href="/terms"
          underline="always"
          variant="subtitle2"
        >
          Terms
        </Link>
        .
      </Typography>
    </form>
  );
};
