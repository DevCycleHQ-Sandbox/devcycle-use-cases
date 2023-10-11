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
import Confetti from 'react-confetti';
import { AuthRequiredError } from '../../lib/exceptions';

const RootUserOptIn = () => {
  // Fetch the current authenticated user and its loading state.
  const { user, isLoading } = useUser();

  /*
    So now let's set up this feature flag on the page and set the value of optIn 
    in the customData when we identify the user. For this example, we will store 
    the value that the user has chosen in a state variable.
  */

  // Initializing the optIn state variable to store the user's choice.
  const [optIn, setOptIn] = useState<boolean>(false);

  // Fetching the 'user-optin' variable value from DevCycle for feature flagging.
  const userOptIn = useVariableValue('user-optin', false);

  // Create an instance of the DevCycle client.
  const dvcClient = useDVCClient();

  // Initialize local state for screen dimensions.
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0
  });

  // Update screen dimensions whenever the userOptIn changes.
  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setDimensions({ width, height });
  }, [userOptIn]);

  // Identify or update the user in DevCycle when user or optIn state changes.
  useEffect(() => {
    // Check if the user object exists and has an email property.

    if (user?.email) {
      // Construct a new object with the user's email and opt-in status.

      const userObj = { email: user.email, customData: { optin: optIn } };

      // Send an "identifyUser" request to DevCycle with the userObj data.

      dvcClient.identifyUser(userObj).then((variables) => {
        // Log the returned variables after successfully identifying the user.

        console.log('Updated Variables:', variables);
      });
    }
    // Re-run this effect when dvcClient, user, or optIn changes.
  }, [dvcClient, user, optIn]);

  // Display a loading spinner while fetching user data.
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

  // Throw an authentication-required error if no user is authenticated.
  if (!user) {
    throw new AuthRequiredError();
  }

  // Render the main component UI.
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} justify={'center'}>
        {/* Display confetti effect if user has opted in */}
        {userOptIn && (
          <Confetti width={dimensions.width} height={dimensions.height} />
        )}
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
            {/* Switch for user to opt-in or opt-out */}
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
