import React from 'react';
import GoogleAuth from './GoogleAuth';
import Chatroom from './Chatroom';
import { Chat } from 'openai/resources/beta/chat/chat';
import { ChakraProvider } from '@chakra-ui/react'

export default function Home() {
  return (
    <ChakraProvider>
      <GoogleAuth/>
      <Chatroom/>
    </ChakraProvider>
  );
}

