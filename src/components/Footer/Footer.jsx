import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box bg='grey' color="black" px={3} py={5}>
      <Text fontSize="2xl" fontWeight="semibold" textAlign="center">
        &copy; 2025, Made With Love for you
      </Text>
    </Box>
  );
}