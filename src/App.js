import React, {useCallback} from 'react';
import { useFormik} from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstName:yup.string().min(3).required(),
  lastName:yup.string().min(3).required(),
})

function App() {
  const handleOnSubmit =(values)=>{
    const fullName = Object.keys(values)
      .map((key) => values[key])
      .join(" ");
    alert(`Hello ${fullName}!`);
  }
  const formik = useFormik({
    initialValues: {
      firstName:"",
      lastName:"",
    },
    validationSchema: schema,
    onSubmit: handleOnSubmit,
  })
  
  const setInputValue = useCallback(
    (key, value) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
      }),
    [formik]
  );
  console.log(formik)
  
  return(
    <form onSubmit={formik.handleSubmit}>
      <input type="text" placeholder="Enter your name" value={formik.values.firstName}
        onChange={(e) => setInputValue("firstName", e.target.value)} name='First' />
        <br/>
        <small>{formik.errors.firstName}</small>
        <br/>
      <input type="text" placeholder="Enter your Last name" value={formik.values.lastName}
        onChange={(e) => setInputValue("lastName", e.target.value)}  name='Lastname'/>
        <br/>
        <small>{formik.errors.lastName}</small>
        <br/>
        {!!formik.errors.lastName && <br />}
      <button type="submit" disabled={!formik.isValid}>Submit</button>
    </form>
  )
}
export default App;
