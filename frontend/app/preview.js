import React, { useEffect, useState } from 'react';
import { db, collection, query, where, getDocs, setDoc, doc, limit } from './config';

const Preview = () => {
const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'users'));
        const querySnapshot = await getDocs(q);

        let communities = [];
        querySnapshot.forEach((doc) => {
          communities = doc.data().response || []; // Assuming 'response' contains the array of communities
        });
        
        setResponse(communities);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
