import React,{useState,useEffect} from "react";
import "./App.css";
import { useFormik } from "formik";
import img4 from "./image/img4.jpg";
import {  ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Validationschema } from "./Validationschema";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firbaseconfig";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
const initialValues = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
};

export default function Formm() {

  const navigate = useNavigate();

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: yup.object(Validationschema),
      onSubmit: async (values, action) => {
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        )
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
        notify();
        navigate("/signin");
        action.resetForm();
      },
    });

    const notify = () => {
        toast(`Name: ${values.name} \nEmail: ${values.email} \nPassword: ${values.password}`);
      };


  return (
    <>
    <div className="container">
        <div className="left"> 
            <img src={img4}></img>
        </div>

        <div className="right">
            <form onSubmit={handleSubmit}>
                <h1>SignUP Page</h1>
                <div className="login_info">
                <label for="name">Name</label>
                <br />
                <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <br />
                {errors.name && touched.name ? <p>{errors.name}</p> : null}
                <br />

                <label for="email">Email</label>
                <br />
                <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <br />
                {errors.email && touched.email ? <p>{errors.email}</p> : null}
                <br />

                <label for="password">Password</label>
                <br />
                <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <br />
                {errors.password && touched.password ? (
                    <p>{errors.password}</p>
                ) : null}
                <br />

                <label for="cpassword">Confirm Password</label>
                <br />
                <input
                    type="password"
                    name="cpassword"
                    value={values.cpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <br />
                {errors.cpassword && touched.cpassword ? (
                    <p>{errors.cpassword}</p>
                ) : null}
                <br />
                </div>
                <button type="submit" className="submit">
                <Link to="/signin" className="text">Submit</Link>
                </button>
            </form>
            <p>
                Already have an account?<Link to="/signin">SignIn</Link>
            </p>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                pauseOnHover
                draggable
                closeOnClick
                hideProgressBar={false}
            />
            
    </div>
    </>
  );
}
