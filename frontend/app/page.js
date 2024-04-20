'use client'

import React from 'react';
import { useRouter } from 'next/router'
import { ChakraProvider, Heading } from '@chakra-ui/react'

export default function Home() {

  return (
    <ChakraProvider>
      <Heading>Hello </Heading>
    </ChakraProvider>
  );
}

