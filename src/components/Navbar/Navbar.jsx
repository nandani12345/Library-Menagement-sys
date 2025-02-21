import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { FaGripLines, FaTimes } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import {
  Box,
  Flex,
  Image,
  Heading,
  IconButton,
  useDisclosure,
  useBreakpointValue,
  Stack,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const links = [
    {
      title: "Home",
      link: "/"
    },
    {
      title: "All books",
      link: "/all-books"
    },
    {
      title: "Cart",
      link: "/cart"
    },
    {
      title: "Profile",
      link: "/profile"
    },
    {
      title: "Admin Profile",
      link: "/profile"
    }
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const filteredLinks = isLoggedIn ? links.filter((link) => {
    if (role === "user") {
      return link.title !== "Admin Profile";
    } else if (role === "admin") {
      return link.title !== "Profile" && link.title !== "Cart";
    } else {
      return true;
    }
  }) : links.slice(0, 2);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const isDesktop = useBreakpointValue({ base: false, sm: false, md: true, lg: true, xl: true });
  const isMobile = useBreakpointValue({ base: true, sm: true, md: false, lg: false, xl: false });

  return (
    <Box bg="gray.800" color="white" py={isDesktop ? 2 : 1} px={isDesktop ? 8 : 4} zIndex={50}>
      <Flex justify="space-between" align="center">
        <RouterLink to="/">
          <Flex align="center">
            <Image src="/icon.jpg" alt="logo" h={10} mr={2} />
            <Heading fontSize="xl" fontWeight="semibold">The Cozy Library</Heading>
          </Flex>
        </RouterLink>
        <Flex align="center" gap={4}>
          {isDesktop && (
            <Flex gap={4} flexWrap="wrap">
              {filteredLinks.map((item, index) => (
                <RouterLink to={item.link} key={index}>
                  <ChakraLink fontSize="lg" fontWeight="medium" color="white" transition="color 0.3s ease-in-out, background-color 0.3s ease-in-out" _hover={{
                    color: "blue.200",
                    textDecoration: "underline",
                    transition: "all 0.3s ease-in-out",
                  }}>
                    {item.title === "Profile" || item.title === "Admin Profile" ? item.title : item.title}
                  </ChakraLink>
                </RouterLink>
              ))}
              {!isLoggedIn && (
                <Stack direction='row' spacing={4} align='center'>
                  <RouterLink to="/login">
                    <Button colorScheme='teal' variant='solid'>
                      Login
                    </Button>
                  </RouterLink>
                  <RouterLink to="/signUp">
                    <Button colorScheme='teal' variant='outline'>
                      SignUp
                    </Button>
                  </RouterLink>
                </Stack>
              )}
            </Flex>
          )}
          {isMobile && (
            <IconButton icon={<FaGripLines />} fontSize="2xl" color="white" _hover={{ color: "gray.500" }} ref={btnRef} onClick={onOpen} />
          )}
        </Flex>
      </Flex>
      {isMobile && (
        <Drawer
          isOpen={isOpen}
          placement='top'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent  >
            {/* <DrawerHeader py={0}>Navigation</DrawerHeader> */}
            <DrawerBody display="flex" flexDirection="column" alignItems="center" textAlign="center" pt={4}>
              {filteredLinks.map((item, index) => (
                <RouterLink to={item.link} key={index}>
                  <ChakraLink fontSize="lg" fontWeight="medium" color="black" _hover={{ color: "teal.800", textDecoration: "underline" }} py={2}>
                    {item.title}
                  </ChakraLink>
                </RouterLink>
              ))}
              {!isLoggedIn && (
                <Stack direction='column' spacing={2} mt={4}>
                  <RouterLink to="/login">
                    <Button colorScheme='teal' variant='solid' w="full">
                      Login
                    </Button>
                  </RouterLink>
                  <RouterLink to="/signUp">
                    <Button colorScheme='teal' variant='outline' w="full">
                      SignUp
                    </Button>
                  </RouterLink>
                </Stack>
              )}
            </DrawerBody>
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                <RxCross1 />
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </Box>
  );
}