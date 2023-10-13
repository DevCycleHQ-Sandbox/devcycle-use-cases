'use client';

import React, { ReactNode, useEffect } from 'react';

import { FiHome, FiMenu, FiChevronDown } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { BeatLoader } from 'react-spinners';

import {
  Avatar,
  Button,
  Container,
  Stack,
  IconButton,
  Image,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  HStack,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  BoxProps,
  FlexProps
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useVariableValue, useDVCClient } from '@devcycle/devcycle-react-sdk';

import { MaintenaceMode } from '../components/4-maintenance-mode/';

export default function RootTemplate({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex direction="column" align="center" maxW={{ xl: '1400px' }} m="0 auto">
      <MaintenaceMode />
      <Sidebar>
        <Box minH="calc(100vh - 160px)">{children}</Box>
        <Footer />
      </Sidebar>
    </Flex>
  );
}

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        minH="60px"
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© 2023 Devcycle. All rights reserved</Text>
      </Container>
    </Box>
  );
};

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, url: '/' },
  { name: 'Maintenace Mode', icon: FiHome, url: '/4-maintenance-mode' }
];

const Sidebar = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" w="100%" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image
          alt={'DevCycle Logo'}
          objectFit={'cover'}
          src={'devcycle-logo-white-bg-full-colour.jpg'}
        />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} url={link.url}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  url: string;
}
const NavItem = ({ icon, children, url, ...rest }: NavItemProps) => {
  return (
    <Link
      href={url}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white'
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white'
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { user, error, isLoading } = useUser();

  const showProfilePage = useVariableValue('profile-page', false);

  const dvcClient = useDVCClient();

  useEffect(() => {
    if (user?.email) {
      dvcClient
        .identifyUser({ email: user.email })
        .then((variables) => console.log('Updated Variables:', variables));
    }
  }, [dvcClient, user]);

  const bgColorModeValue = useColorModeValue('white', 'gray.900');
  const borderColorModeValue = useColorModeValue('gray.200', 'gray.700');

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Image
        display={{ base: 'flex', md: 'none' }}
        maxH="60px"
        alt={'DevCycle Logo'}
        objectFit={'cover'}
        src={'devcycle-logo-white-bg-full-colour.jpg'}
      />

      {isLoading ? (
        <Button isLoading spinner={<BeatLoader size={8} color="white" />}>
          Loading
        </Button>
      ) : user ? (
        <HStack spacing={{ base: '0', md: '6' }}>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}
              >
                <HStack>
                  {user.picture && <Avatar size={'sm'} src={user.picture} />}
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">{user.nickname}</Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={bgColorModeValue}
                borderColor={borderColorModeValue}
              >
                <>
                  {showProfilePage && (
                    <>
                      <MenuItem as="a" href="/1-early-access/">
                        Profile
                      </MenuItem>
                      <MenuDivider />
                    </>
                  )}
                </>
                <MenuItem as="a" href="/api/auth/logout">
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/api/auth/login">
            <Button variant="outline">Login</Button>
          </a>
        </>
      )}
    </Flex>
  );
};
