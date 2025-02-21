import React, { useState } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  VStack,
  Heading,
  Text,
  useToast
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const toast = useToast()
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    address: ""
  });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://library-management-system-3fx0.onrender.com/signup`, data);
      // Update the state with the relevant data
      setData({
        username: "",
        password: "",
        email: "",
        address: ""
      });
      console.log(res);
      
      toast({
        status: "success",
        title: "Account created successfully",
        isClosable: true,
        duration:2000,
      })
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast({
          status: "error",
          title: "Already you have signUp, Please login",
          isClosable: true,
          duration:2000,
        })
      } else {
        toast({
          status: "error",
          description: "An error occurred. Please try again.",
          isClosable: true,
          duration:2000,
        })
      }
    }
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="50%"
      bg="gray.100"
      overflow="hidden"
      m={5}
      p={2}
    >
      <Box
        bg="white"
        p={5}
        borderRadius="lg"
        boxShadow="lg"
        w={{ base: '90%', md: '60%', lg: '40%' }}
        maxW="500px"
      >
        <VStack spacing={4}>
          <Heading size="lg">Sign Up</Heading>
        </VStack>
        <form onSubmit={submit}>
          <VStack>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name='username'
                value={data.username}
                onChange={changeHandler}
                placeholder="Enter your username"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name='email'
                value={data.email}
                onChange={changeHandler}
                placeholder="Enter your email"
                required
              />
              <FormHelperText>
                Enter a valid email address.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name='password'
                value={data.password}
                onChange={changeHandler}
                placeholder="Enter your password"
                required
              />
              <FormHelperText>
                Enter a password with at least 5 characters.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                name='address'
                value={data.address}
                onChange={changeHandler}
                placeholder="Enter your address"
                required
              />
            </FormControl>
          </VStack>
          <Button
            mt={2}
            colorScheme="blue"
            type="submit"
            w={'full'}
          >
            Sign Up
          </Button>
        </form>
        <Box textAlign={'center'}>
          <Text>
            or
          </Text>
          <Link to="/">Already have an account?
           <Link to="/login">Login</Link>
           </Link>
        </Box>
      </Box>
    </Flex>
  );
}