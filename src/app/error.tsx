'use client';

import { Button, Container, Heading, Stack, Box, Text } from '@chakra-ui/react';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <Container maxW={'3xl'}>
      <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          {error.name || 'Error'}
        </Heading>
        <Text color={'gray.500'}>
          {error.message || 'You must be logged in to access the page'}
        </Text>
        <Button onClick={() => reset()}>Try Again</Button>
      </Stack>
    </Container>
  );
}
