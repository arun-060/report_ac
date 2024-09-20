import React from 'react';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';
export default function SignIn() {
const navigate = useNavigate();

  const signChange=(event)=>{
    event.preventDefault()
    console.log("cliicked")
    navigate('/sign-up')
  }
  return (
    
    <div className="sign-in-container">
      
      <div className="sign-in-form">
      <div className="social-signin">

         
        </div>
        <h2>Sign In</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="sign-in-button" >Sign In</button>
        <p>Don't have an account?
          <button onClick={signChange}>Sign-Up</button>
        </p>

        <button className="google-signin">
            <img src="google.png" alt="Google" />
          </button>
          <button className="github-signin" >
            <img src="github.png" alt="GitHub" />
          </button>
       
      </div>
    </div>
  );
}