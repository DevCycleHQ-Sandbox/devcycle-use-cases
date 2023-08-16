'use client';

import { useEffect, useState } from 'react';
import {
  Center,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  Stack,
  Flex,
  Text
} from '@chakra-ui/react';
import { SyncLoader } from 'react-spinners';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useVariableValue, useDVCClient } from '@devcycle/devcycle-react-sdk';

import { AuthRequiredError } from '../../lib/exceptions';

const RootUserOptIn = () => {
  const { user, isLoading } = useUser();
  const [optIn, setOptIn] = useState<boolean>(false);
  const dvcClient = useDVCClient();

  useEffect(() => {
    if (user?.email) {
      const userObj = { email: user.email, customData: { optIn } };
      console.log({ userObj });
      dvcClient
        .identifyUser(userObj)
        .then((variables) => console.log('Updated Variables:', variables));
    }
  }, [dvcClient, user, optIn]);

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
      <Flex p={8} flex={1} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text color={'#1F2937'} as={'span'}>
              User OptIn
            </Text>
          </Heading>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0">
              User OptIn?
            </FormLabel>
            <Switch
              id="user-optin"
              isChecked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
            />
          </FormControl>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default RootUserOptIn;
