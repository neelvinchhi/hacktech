import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const preview = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'users'), where('name', '==', 'someone'));
        const querySnapshot = await getDocs(q);

        const communityNames = [];
        querySnapshot.forEach((doc) => {
          communityNames.push(doc.data().community);
        });
        
        setCommunities(communityNames);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Display community names as links */}
      {communities.map((community, index) => (
        <div key={index}>
          <a href={`/${community}`} target="_blank">{community}</a>
        </div>
      ))}
    </div>
  );
};

export default preview;
