import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate()
    const handleClick = () =>{
        navigate("./signup")
    }
    return(
        <div>
            <h1>Welcome</h1>
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}