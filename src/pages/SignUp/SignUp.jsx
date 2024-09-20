import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signChange = (event) => {
    event.preventDefault();
    navigate('/signin');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      // Sign up user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store the user credentials in Realtime Database
      const userId = user.uid;
      await set(ref(db, `users/${userId}`), {
        username,
        email,
        userId
      });

      console.log('User signed up and saved:', { username, email, userId });
      navigate('/signin'); // Redirect to sign-in page after successful sign-up

    } catch (error) {
      setError(error.message);
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            className='input-field'
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
           className='input-field'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
           className='input-field'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="sign-up-button">Sign Up</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <p>Already have an account?<p onClick={signChange} style={{
          color:'blue',
          textDecoration: 'underline'
        }}>Sign In</p></p>
        <div className="social-signup">
          <button className="google-signup">
            <img src="/placeholder.svg?height=24&width=24" alt="Sign up with Google" />
          </button>
        </div>
      </div>
    </div>
  );
}
