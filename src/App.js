// import React,{useState,useEffect} from 'react';
// import Formm from './Formm';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Signin from './Signin';
// import Home from './Home';


// export default  function App(){
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Formm />} />
//         <Route path="/signin" element={<Signin />} />
//         <Route path="/signin/home" element={<Home />} />
//         <Route path='/signin/home/signup' element={<Formm />}/>
//       </Routes>
//     </Router>
//   );
// }


import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './Signin';
import Home from './Home';
import Formm from './Formm';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firbaseconfig';

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
    <Router>
      <Routes>
        <Route path="/" element={<Formm />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/home"
          element={user ? <Home user={user} /> : <Navigate to="/signin" />}
        />
        {/* <Route path="/signin/home/signup" element={<Formm />} /> */}
      </Routes>
    </Router>
  );
}