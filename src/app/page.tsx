'use client';

import { Container, Heading, Stack, Box, Text } from '@chakra-ui/react';

export default function Page() {
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
          Page
        </Heading>
        <Text color={'gray.500'}>This is a page</Text>
      </Stack>
    </Container>
  );
}
