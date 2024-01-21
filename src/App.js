import React from 'react';
import Formm from './Formm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './Signin';
import Home from './Home';


export default  function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formm />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signin/home" element={<Home />} />
        <Route path='/signin/home/signup' element={<Formm />}/>
      </Routes>
    </Router>
  );
}