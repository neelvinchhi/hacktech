"use client"

import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCz0uAMDnDk7T0v9BYV6ueIwp8zJGn0f10",
  authDomain: "psysync-6e2aa.firebaseapp.com",
  projectId: "psysync-6e2aa",
  storageBucket: "psysync-6e2aa.appspot.com",
  messagingSenderId: "186386703961",
  appId: "1:186386703961:web:59b7808ab3e53258bf3348",
  measurementId: "G-0RRF2PHJC2"
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
