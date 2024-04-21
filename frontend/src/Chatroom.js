
import React, { useState } from 'react';
import { Box, Input, Button, VStack, HStack, IconButton, Text, ChakraProvider } from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages([...messages, inputText]);
      setInputText('');
    }
  };

  return (
    <Box h="100vh" bg="gray.800" color="white" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box p={4} w="400px" borderWidth="1px" borderRadius="lg">
        <VStack spacing={4} align="stretch">
          <Box h="300px" overflowY="scroll">
            {messages.map((message, index) => (
              <Text key={index} fontSize="sm" bg="gray.700" p={2} borderRadius="md">
                {message}
              </Text>
            ))}
          </Box>
          <HStack spacing='0.01'>
          <Input
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <IconButton  icon={<FaPaperPlane />}
            onClick={handleSendMessage}
            colorScheme="blue"
            aria-label="Send"
            ml={2} />
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <ChakraProvider>
      <Chatroom />
    </ChakraProvider>
  );
};

export default Chatroom;
