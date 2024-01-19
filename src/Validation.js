import * as yup from "yup";
export const Validation= {
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
}
