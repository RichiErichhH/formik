import React from 'react';
import { Validation } from './Validation';
import { useFormik } from 'formik';
import { auth }from './Firbaseconfig';
import  * as yup from "yup";
import { signInWithEmailAndPassword,signOut } from 'firebase/auth';

const initialValues = {
    email : "",
    password : "",
}



export default function Signin(){
    const{ handleSubmit , values, handleChange , handleBlur , errors , touched} =useFormik({
        initialValues : initialValues,
        validationSchema: yup.object(Validation),
        onSubmit :  async (values, action) => {
            try {
            //    console.log("before sign in");
              await signInWithEmailAndPassword(auth, values.email, values.password);
            //   alert("successfully signed in");
              console.log(values.email);
              
            } catch (error) {
              console.error('Sign-in error:', error.message);
            }
            action.resetForm();
          },
    })
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label for="email">Email:</label>
                <br/>
                <input type="email" name="email" onBlur={handleBlur} onChange={handleChange} value={values.email}/>
                <br/>
                {touched.email && errors.email && <div>{errors.email}</div>}
                <br/>

                <label for="password">Password:</label>
                <br/>
                <input type='password' name="password" onBlur={handleBlur} onChange={handleChange} value={values.password}/>
                <br/>
                {touched.password && errors.password && <div>{errors.password}</div>}
                <br/>
                
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}