import React, { useEffect, useState } from 'react';
import { db } from './config';
import { collection, query, where, getDocs, setDoc, doc, limit, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import {Button, Box} from '@chakra-ui/react';

const Preview = () => {
  const [response, setResponse] = useState('');
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'users'), where('name', '==', username));
        const querySnapshot = await getDocs(q);

        let communities = '';
        querySnapshot.forEach((doc) => {
          communities = doc.data().response || '';
        });

        setResponse(communities);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const communitiesArray = response.split(',').map((community) => community.trim());
    
      for (let community of communitiesArray) {
        community = community.replace('[', '');
        community = community.replace(']', '');
        community = community.replace(/'/g, '');
        community = community.toLowerCase()
        const messageQuery = query(collection(db, 'messages'), where('community', '==', community), limit(1));
        const messageSnapshot = await getDocs(messageQuery);
    
        if (messageSnapshot.empty) {
          await addDoc(collection(db, 'messages'), { 
            name: 'AI Bot',
            message: `Hello there! Welcome to the ${community} community. Please feel free to be open and converse with the people and me.`,
            community: community,
            time: serverTimestamp()
          });
        }
      }
    };

    if (response) {
      fetchData();
    }
  }, [response]);


  if (!response) {
    return <div>You are not in any group at this point of time.</div>;
  }

  return (
    <Box h="100vh" bg="gray.800" color="white" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {response
       .replace('[', '') 
       .replace(']', '')
       .replace(/'/g, '') 
       .split(', ')       
       .map((community, index) => (
        <Box key={index}>
          <Link to={`/chat?room=${community}`}>
            <Button m='1'>
              {community} highway
            </Button>
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default Preview;
