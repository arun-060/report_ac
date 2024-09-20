import React, { useState } from 'react';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, db } from '../../firebase.config';  // Make sure firebase is initialized in firebase.js

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors

    try {
      // Sign in user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch the user's role from Firebase Realtime Database
      const userRef = ref(db, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const role = userData.role; 

        // Role-based navigation
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else if (role === 'student') {
          navigate(`/dashboard?userId=${user.uid}`);
        } else if (role === 'faculty') {
          navigate('/faculty-dashboard');
        } else {
          setError(`${role}`);
        }
      } else {
        setError('User not found in the database');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error signing in:', error);
    }
  };

  const signChange = (event) => {
    event.preventDefault();
    navigate('/signup');
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-form">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <p>
          Don't have an account? 
          <button className="link-button" onClick={signChange}>Sign-Up</button>
        </p>

        <div className="social-signin">
          <button className="social-button google-signin">
            <img src="google.png" alt="Google" className="social-icon" /> Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
