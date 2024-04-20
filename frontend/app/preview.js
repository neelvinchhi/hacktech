import React, { useEffect, useState } from 'react';
import { app, db } from './config';

const preview = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const name = localStorage.getItem("username");
        const q = query(collection(db, 'users'), where('name', '==', name));
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
