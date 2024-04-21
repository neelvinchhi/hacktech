import React, { useEffect, useState } from "react";
import { db } from "./config";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  limit,
  serverTimestamp,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

import { Box, Input, Button, VStack, HStack, IconButton, Text, ChakraProvider } from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';

const Chat = () => {
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesRef = collection(db, "messages");
  const name = localStorage.getItem("username");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomParam = urlParams.get("room");
    if (roomParam) {
      setRoom(roomParam);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        messagesRef,
        where("community", "==", room),
        orderBy("time", "asc")
      ),
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messages);
      },
      (error) => {
        console.error("Error fetching messages:", error);
      }
    );
  
    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const newDoc = doc(messagesRef);
      await setDoc(newDoc, {
        community: room,
        message: newMessage,
        name: name,
        time: serverTimestamp()
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

 return (
    <Box className="chat-app" h="100vh" bg="gray.800" color="white" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box p={4} w="1400px" h='93.5vh' borderWidth="1px" borderRadius="lg">
        <VStack align="stretch" flex="1">
          <Box h='85vh' overflowY="scroll">
            {messages.map((message, index) => (
              <Box key={index} bg="gray.700" p={2} borderRadius="md" margin={1}>
                <Text fontSize="xs" fontWeight="bold">{message.name}</Text>
                <Text fontSize="xl  ">{message.message}</Text>
              </Box>
            ))}
          </Box>
          <HStack spacing='0.01'>
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <IconButton  
              icon={<FaPaperPlane />}
              onClick={handleSubmit}
              colorScheme="blue"
              aria-label="Send"
              ml={2} 
            />
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default Chat;
