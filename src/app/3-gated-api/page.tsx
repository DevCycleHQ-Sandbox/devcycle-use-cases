'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Heading, Stack, Flex, Text } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';

type Result = {
  result?: Array<string>;
};

const handleError = (
  err: unknown,
  setData: Dispatch<SetStateAction<Result | null>>
) => {
  const error = err as Error | AxiosError;
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      setData(error.response?.data);
    } else {
      throw new Error(error.message);
    }
  } else {
    throw error;
  }
};

const RootFeature = () => {
  const [pub, setPub] = useState<Result | null>(null);
  const [free, setFree] = useState<Result | null>(null);
  const [paid, setPaid] = useState<Result | null>(null);

  useEffect(() => {
    axios
      .get('/api/public')
      .then((res) => {
        setPub(res.data);
      })
      .catch((err: unknown) => handleError(err, setPub));
    axios
      .get('/api/free')
      .then((res) => {
        setFree(res.data);
      })
      .catch((err: unknown) => handleError(err, setFree));
    axios
      .get('/api/paid')
      .then((res) => {
        setPaid(res.data);
      })
      .catch((err: unknown) => handleError(err, setPaid));
  }, []);

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex pt={8} justify={'center'}></Flex>
      <Flex p={8} flex={1} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text color={'#1F2937'} as={'span'}>
              Public Feature
            </Text>
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'#6B7280'}>
            {pub && pub.result}
          </Text>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text color={'#1F2937'} as={'span'}>
              Free Feature
            </Text>
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'#6B7280'}>
            {free && free.result}
          </Text>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text color={'#1F2937'} as={'span'}>
              Paid Feature
            </Text>
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'#6B7280'}>
            {paid && paid.result}
          </Text>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default RootFeature;
