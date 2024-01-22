import React from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import "./App.css";
import { auth } from './Firbaseconfig';
import img8 from "./image/img8.jpg";

export default function Home() {
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate('/signin');
    }
  });

  const handleClick = () => {
   
    navigate('/signin');
  };

  return (
    <div>
        <div className="image-container">
            <img src={img8} alt="Welcome" />
         </div>
    <div className="content">  
      <h2>Welcome to the Home Page</h2>
      <button onClick={handleClick}>Logout</button>
   </div>
    </div>
  );
}

