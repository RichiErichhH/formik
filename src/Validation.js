import * as yup from "yup";
export const Validation= {
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8).required("Please enter your password").matches(/^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "incorrect password"),
}
