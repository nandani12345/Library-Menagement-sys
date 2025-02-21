import React from 'react';
import Zero from '../components/Home/Zero';
import RecentlyAdded from '../components/Home/RecentlyAdded';
import { Box } from '@chakra-ui/react';

function HomePage() {
  return (
    <Box bg="zinc.800" color="white" p={[2, 4, 6]}>
      <Zero />
      <RecentlyAdded />
    </Box>
  );
}

export default HomePage;