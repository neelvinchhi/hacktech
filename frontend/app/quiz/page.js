"use client"

import { useState } from 'react';
import { Box, VStack, FormControl, FormLabel, RadioGroup, Radio, Button } from '@chakra-ui/react';

const FormPage = () => {
  const [answers, setAnswers] = useState({});

  const questions = [
  {
    id: 1,
    text: 'What is your favorite color?',
    options: ['Red', 'Blue', 'Green', 'Yellow'],
  },
  {
    id: 2,
    text: 'Which programming language do you prefer?',
    options: ['JavaScript', 'Python', 'Java', 'C++'],
  },
  // Add more questions here
];

  const handleChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(answers);
  };

  return (
    <Box h="100vh" bg="gray.800" color="white" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box p={4} w="400px" borderWidth="1px" borderRadius="lg">
        <VStack spacing={4} align="stretch" as="form" onSubmit={handleSubmit}>
          {questions.map((question) => (
            <FormControl key={question.id}>
              <FormLabel>{question.text}</FormLabel>
              <RadioGroup value={answers[question.id]} onChange={(e) => handleChange(question.id, e)}>
                <VStack align="stretch">
                  {question.options.map((option) => (
                    <Radio key={option} value={option}>
                      {option}
                    </Radio>
                  ))}
                </VStack>
              </RadioGroup>
            </FormControl>
          ))}
          <Button type="submit" colorScheme="blue">Submit</Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default FormPage;
