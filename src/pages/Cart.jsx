import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Text, Image, VStack, useToast, HStack, Button, Divider, Flex } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const toast = useToast()
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  const handler = async () => {
    try {
      const res = await axios.get('https://library-management-system-1-06yg.onrender.com/get-user-cart', { headers });
      console.log('Get User Cart Response:', res);
      if (res.status === 200) {
        setCart(res.data.data);
      } else {
        setError('Failed to fetch cart data');
      }
    } catch (error) {
      console.error('Get User Cart Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handler()
  }, []);

  const handleRemove = async (bookid) => {
    try {
      const res = await axios.put(`https://library-management-system-3fx0.onrender.com/remove-cart/${bookid}`, {}, { headers });
      if (res.status === 200) {
        setCart((prevCart) => prevCart.filter((book) => book._id !== bookid));
      } else {
        setError('Failed to remove book from cart');
      }
    } catch (error) {
      console.error('Remove Cart Error:', error);
      setError(error.message);
    }
  }

  useEffect(() => {
    if (cart && cart.length > 0) {
      const total = cart.reduce((acc, item) => acc + item.price, 0);
      setTotal(total);
    } else {
      setTotal(0);
    }
  }, [cart]);

  const handlePlaceOrder = async () => {
    try {
      const res = await axios.post(`https://library-management-system-3fx0.onrender.com/orderRecived`,
        { order: cart },
        { headers }
      );
      console.log('Place Order Response:', res);;
      toast({
        status: "success",
        title: res.data.message,
        isClosable: true,
      })
      navigate("/profile/order-history")
    } catch (error) {
      console.error('Place Order Error:', error);
      setError(error.message);
    }
  }

  if (loading) return <Heading color="white">Loading...</Heading>;
  if (error) return <Heading color="red.300">Error: {error}</Heading>;

  return (
    <Box w={"full"} mx="auto" p={[2, 4, 6]} color="black" boxShadow="xl" >
      <Heading fontSize={['xl', '2xl', '3xl']} mb={4} borderBottom="2px solid gray">Your Cart</Heading>

      {cart.length === 0 ? (
        <VStack spacing={4} align="center">
          <Image src="/empty.png" alt="Empty Cart" h={['100px', '150px', '200px']} />
          <Text fontSize={['md', 'lg', 'xl']} color="gray.500">Your cart is empty.</Text>
        </VStack>
      ) : (
        <>
          {cart.map((item) => (
            <Box key={item._id} color={"white"} bg="gray.800" p={4} borderRadius="md" mb={4}>
              <HStack spacing={4} align="center">
                <Image src={item.url} alt={item.title} h={['60px', '80px', '100px']} />
                <Box flex="1">
                  <Text fontSize={['md', 'lg', 'xl']} fontWeight="bold">{item.title}</Text>
                  <Text fontSize={['sm', 'md', 'lg']} color="gray.400">{item.desc.slice(0, 50)}...</Text>
                </Box>
                <Flex align="center">
                  <Text fontSize={['md', 'lg', 'xl']} fontWeight="bold" mr={3}>₹ {item.price}</Text>
                  <Button colorScheme="red" size="sm" onClick={() => handleRemove(item._id)}>
                    <FaTrashAlt />
                  </Button>
                </Flex>
              </HStack>
            </Box>
          ))}

          <Divider my={4} />

          {cart && cart.length > 0 && (
            <Box bg="gray.800" p={4} borderRadius="md" color={'white'} >
              <Box>
                <Text fontSize={['md', 'lg', 'xl']} fontWeight="bold">Total Amount: ₹ {total}</Text>
                <Box>
                  <Text>{cart.length} books</Text><Text>Rs: {total}</Text>
                </Box>
                <Box>
                  <Button colorScheme="blue" w="full" mt={3} onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                </Box>
              </Box>

            </Box>
          )}
        </>
      )}
    </Box>
  );
}