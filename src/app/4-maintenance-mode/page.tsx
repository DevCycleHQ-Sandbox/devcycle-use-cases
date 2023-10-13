'use client';

import { Heading, Stack, Flex, Text } from '@chakra-ui/react';

const RootMaintenanceMode = () => {
  return (
    <div>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex pt={8} justify={'center'}></Flex>
        <Flex p={8} flex={1} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text color={'#1F2937'} as={'span'}>
                Maintenance Mode
              </Text>
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'#6B7280'}>
              Message
            </Text>
          </Stack>
        </Flex>
      </Stack>
    </div>
  );
};

export default RootMaintenanceMode;
