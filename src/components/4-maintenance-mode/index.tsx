import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  Box,
  useDisclosure,
  Button,
  CloseButton
} from '@chakra-ui/react';

export const MaintenaceMode = () => {
  const {
    isOpen: isVisible,
    onClose,
    onOpen
  } = useDisclosure({ defaultIsOpen: true });

  return isVisible ? (
    <Alert status="warning">
      <AlertIcon />
      <Box>
        <AlertTitle>Maintenance</AlertTitle>
        <AlertDescription>
          The site is going into maintenance mode in ...
        </AlertDescription>
      </Box>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  ) : (
    <Button onClick={onOpen}>Show Alert</Button>
  );
};
