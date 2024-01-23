import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './Signin';
import Home from './Home';
import Formm from './Formm';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firbaseconfig';
import Product from './Product';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Product />
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Formm />} />
    //     <Route path="/signin" element={<Signin />} />
    //     <Route
    //       path="/home"
    //       element={user ? <Home user={user} /> : <Navigate to="/signin" />}
    //     />
    //     {/* <Route path="/signin/home/signup" element={<Formm />} /> */}
    //   </Routes>
    // </Router>
  );
}