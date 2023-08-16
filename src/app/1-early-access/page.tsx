'use client';

import { Heading, Image, Center, Stack, Flex, Text } from '@chakra-ui/react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { SyncLoader } from 'react-spinners';

import { AuthRequiredError } from '../../lib/exceptions';

const RootProfile = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex>
          <Center>
            <SyncLoader />
          </Center>
        </Flex>
      </Stack>
    );
  }

  if (!user) {
    throw new AuthRequiredError();
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex pt={8} justify={'center'}>
        <Image
          alt={'Avatar'}
          borderRadius="full"
          boxSize="150px"
          objectFit={'cover'}
          src={user?.picture || ''}
        />
      </Flex>
      <Flex p={8} flex={1} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text color={'#1F2937'} as={'span'}>
              Profile
            </Text>
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'#6B7280'}>
            {user?.name || ' '}
          </Text>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default RootProfile;
