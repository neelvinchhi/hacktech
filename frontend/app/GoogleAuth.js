"use client"

import { React, useState } from 'react';
import * as firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCz0uAMDnDk7T0v9BYV6ueIwp8zJGn0f10",
  authDomain: "psysync-6e2aa.firebaseapp.com",
  projectId: "psysync-6e2aa",
  storageBucket: "psysync-6e2aa.appspot.com",
  messagingSenderId: "186386703961",
  appId: "1:186386703961:web:59b7808ab3e53258bf3348",
  measurementId: "G-0RRF2PHJC2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const GoogleAuth = () => {
  const [error, setError] = useState(null);

  const handleSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const name = user.email.replace('@gmail.com', '');

      const q = query(collection(db, 'users'), where('email', '==', user.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          name: name,
          response: ''
        });

        localStorage.setItem('username', name);

        console.log('User added to Firestore:', user.uid);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
      setError('Error signing in with Google. Please try again.');
    }
  };

  return (
    <div>
      <h1>Firebase Authentication Demo</h1>
      <button onClick={handleSignInWithGoogle}>Sign In with Google</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default GoogleAuth;
