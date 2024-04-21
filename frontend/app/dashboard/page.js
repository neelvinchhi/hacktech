'use client'

import React, { useEffect, useState } from 'react';
import { db } from '../config';
import { collection, query, where, getDocs, setDoc, doc, limit } from 'firebase/firestore';

const Preview = () => {
  const username = localStorage.getItem('username');
  const [response, setResponse] = useState([]);
  const [noCommunities, setNoCommunities] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'users'), where('username', '==', username));
        const querySnapshot = await getDocs(q);

        let communities = ['adhd', 'autism', 'ocd']; // only for testing
        querySnapshot.forEach((doc) => {
          communities = doc.data().response || [];
        });
        
        setResponse(communities);

        if (communities.length === 0) {
          setNoCommunities(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [username]);

  useEffect(() => {
    response.forEach(async (community) => {
      const messageQuery = query(collection(db, 'messages'), where('community', '==', community), limit(1));
      const messageSnapshot = await getDocs(messageQuery);
      
      if (messageSnapshot.empty) {
        await setDoc(doc(db, 'messages'), {
          name: 'AI Bot',
          message: `Hello there! Welcome to the ${community} community. Please feel free to be open and converse with the people and me.`,
          community: community
        });
      }
    });
  }, [response]);

  if (noCommunities) {
    return <div>Sorry, you are not part of any group yet.</div>;
  }

  return (
    <div>
      {/* Display community names as links */}
      {response.map((community, index) => (
        <div key={index}>
          <a href={`/chat?=${community}`} target="_blank">{community}</a>
        </div>
      ))}
    </div>
  );
};

export default Preview;
