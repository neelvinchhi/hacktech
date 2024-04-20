import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  // Your Firebase config here
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const GoogleAuth = () => {
  const handleSignUpWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      const user = result.user;
      console.log('Signed up user:', user);
      alert('Signed up successfully!');
    } catch (error) {
      console.error('Error signing up with Google:', error.message);
      alert('Error signing up with Google. Please try again.');
    }
  };

  const handleLogInWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      const user = result.user;
      console.log('Logged in user:', user);
      alert('Logged in successfully!');
    } catch (error) {
      console.error('Error logging in with Google:', error.message);
      alert('Error logging in with Google. Please try again.');
    }
  };

  return (
    <div>
      <h1>Firebase Authentication Demo</h1>
      <button onClick={handleSignUpWithGoogle}>Sign Up with Google</button>
      <button onClick={handleLogInWithGoogle}>Log In with Google</button>
    </div>
  );
};

export default GoogleAuth;
