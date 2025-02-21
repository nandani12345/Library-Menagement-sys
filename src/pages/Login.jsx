import React, { useState } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
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
import  {authAction} from "../components/Store/auth";
import { useDispatch } from 'react-redux';

export default function SignUp() {
  const toast = useToast()
  const [data, setData] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://library-management-system-3fx0.onrender.com/signin`, data);
      // Update the state with the relevant data
      dispatch(authAction.login())
      dispatch(authAction.changeRole(res.data.role))
      localStorage.setItem("id", res.data.id);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/profile")


      setData({
        username: "",
        password: ""
      });
      toast({
        status: "success",
        title: "Login successfully",
        isClosable: true,
        duration:2000,
      })
      // navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast({
          status: "error",
          title: `Something is went wrong`,
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
          <Heading size="lg" >Sign Up</Heading>
        </VStack>
        <form onSubmit={submit}>
          <VStack spacing={4}>
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
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name='password'
                value={data.password}
                onChange={changeHandler}
                placeholder="Enter your password"
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
            Login
          </Button>
          <Box textAlign={'center'}>
            <Text>
              or
            </Text>
            <Link to="/">Already have an account? <Link to={"/signUp"}>SignIn</Link></Link>
          </Box>
        </form>
      </Box>
    </Flex>
  )
}