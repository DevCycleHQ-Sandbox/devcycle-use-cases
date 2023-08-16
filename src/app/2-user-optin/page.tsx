'use client';

import { useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Heading,
  Switch,
  Stack,
  Flex,
  Text
} from '@chakra-ui/react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useVariableValue, useDVCClient } from '@devcycle/devcycle-react-sdk';

import { AuthRequiredError } from '../../lib/exceptions';

const RootUserOptIn = () => {
  const { user, isLoading } = useUser();
  const dvcClient = useDVCClient();

  useEffect(() => {
    if (user?.email) {
      dvcClient
        .identifyUser({ email: user.email })
        .then((variables) => console.log('Updated Variables:', variables));
    }
  }, [dvcClient, user]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!user) {
    throw new AuthRequiredError();
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex pt={8} justify={'center'}>
        <Text>Side</Text>
      </Flex>
      <Flex p={8} flex={1} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text color={'#1F2937'} as={'span'}>
              User OptIn
            </Text>
          </Heading>
          <Text>Info</Text>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0">
              Enable email alerts?
            </FormLabel>
            <Switch id="email-alerts" />
          </FormControl>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default RootUserOptIn;
