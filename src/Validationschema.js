import * as yup from "yup"; 
export const Validationschema =
    {
        name : yup.string().min(2).required("Please enter your name."),
        email : yup.string().email().required("Please enter your email address.").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Not valid email."),
        password : yup.string().min(8).required("Please enter your password.").matches(/^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Atleast special char. required."),
        cpassword : yup.string().min(8).required().oneOf([yup.ref('password'), null], "Password don't match."),
    }
