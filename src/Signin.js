import React from 'react';
import { Validation } from './Validation';
import { useFormik } from 'formik';
import { auth } from './Firbaseconfig';
import * as yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import img7 from './image/img7.jpg';
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
  email: '',
  password: '',
};

export default function Signin() {

  const navigate = useNavigate();

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object(Validation),
    onSubmit: async (values, action) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        action.resetForm();
        navigate('/signin/home'); 
      } catch (error) {
        console.error('Sign-in error:', error.message);
        action.setErrors({ auth: error.message });
      }
    },
  });

  return (
    <div className="container">
      <div className="left_signin">
        <form onSubmit={handleSubmit}>
          <div className="form_decoration">
            <h1>SignIn Page</h1>
            <label htmlFor="email">Email:</label>
            <br />
            <input type="email" name="email" onBlur={handleBlur} onChange={handleChange} value={values.email} />
            <br />
            {touched.email && errors.email && <div>{errors.email}</div>}
            <br />

            <label htmlFor="password">Password:</label>
            <br />
            <input type="password" name="password" onBlur={handleBlur} onChange={handleChange} value={values.password} />
            <br />
            {touched.password && errors.password && <div>{errors.password}</div>}
            <br />
            {errors.auth && <div>Incorrect Email or Password</div>}
            <button type="submit" className="done">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="right_signin">
        <img src={img7} alt="Right Signin" />
      </div>
    </div>
  );
}
