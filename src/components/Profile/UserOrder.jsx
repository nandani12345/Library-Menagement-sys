import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Heading, Box, Text, Link, Flex, Grid, GridItem } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaUser    } from "react-icons/fa";

export default function UserOrder() {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
  const [orderHistory, setOrderHistory] = useState([])

  const fetch = async () => {
    try {
      const res = await axios.get(`https://library-management-system-1-06yg.onrender.com/get-Order-Details`, { headers })
      setOrderHistory(res.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <Box p={[2, 4, 6]}>
      {
        orderHistory.length === 0 && (
          <Box>
            <Box>
              <Heading fontSize={['lg', 'xl', '2xl']}>No Order History</Heading>
              <Text fontSize={['sm', 'md', 'lg']}>You haven't placed any orders yet.</Text>
              <img src="" alt="icon" />
            </Box>
          </Box>
        )
      }
      {
        orderHistory.length > 0 && (
          <Box>
            <Box>
              <Heading fontSize={['lg', 'xl', '2xl']}>Your Order History</Heading>
              <Text fontSize={['sm', 'md', 'lg']}>Here are your previous orders:</Text>
            </Box>
            {
              orderHistory.map((item, index) => (
                <React.Fragment key={index}>
                  <Box p={4} bg="white" borderRadius="lg" boxShadow="lg" mb={4}>
                    <Heading fontSize={['md', 'lg', 'xl']} fontWeight="bold">Order {index + 1}</Heading>
                    <Text fontSize={['sm', 'md', 'lg']} >Book Title: {item.book.title}</Text>
                    <Text fontSize={['sm', 'md', 'lg']}>Description: {item.book.desc.slice(0, 50)}...</Text>
                    <Text fontSize={['sm', 'md', 'lg']}>Price: Rs {item.book.price}</Text>
                    <Text fontSize={['sm', 'md', 'lg']}>Status: {item.status}</Text>
                    <Text fontSize={['sm', 'md', 'lg']}>Payment Method: COD</Text>
                    <RouterLink to={`/view-book-details/${item.book._id}`}>
                      <Text fontSize={['sm', 'md', 'lg']}>View Book Details</Text>
                    </RouterLink>
                  </Box>
                </React.Fragment>
              ))
            }
          </Box>
        )
      }
    </Box>
  )
}