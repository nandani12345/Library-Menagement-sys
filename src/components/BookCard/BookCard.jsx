import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Text, Image, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

export default function BookCard({ data, favourites }) {
  // const navigate = useNavigate();
  const toast = useToast()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id, // Changed data_id to data._id
  };

  const handleRemoveBook = async () => {
    try {
      const res = await axios.put(`https://library-management-system-3fx0.onrender.com/delete-fav`, {}, { headers });
      toast({
        status: "success",
        title: res.data.message,
        isClosable: true,
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Link to={`/view-book-details/${data._id}`}>
        <Box
          bg="white"
          borderRadius="lg"
          p={{ base: 3, md: 3, lg: 3 }}
          w="100%"
          h="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box>
            <Image
              src={data.url}
              alt={data.title}
              w="100%"
              objectFit="cover"
              borderRadius="lg"
            />
          </Box>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading as="h2" fontSize={{ base: "md", md: "lg", lg: "xl" }}>
              {data.title}
            </Heading>
          </Flex>
          <Box>
            <Text fontSize={{ base: "xxs", md: "xs", lg: "sm" }} color="gray.500">
              Author: {data.author}
            </Text>
            <Text fontSize={{ base: "xxs", md: "xs", lg: "sm" }} color="gray.500">
              Price: Rs{data.price}
            </Text>
          </Box>
          {favourites && (
          <Button
            width={"100px"}
            colorScheme="teal"
            variant="solid"
            onClick={handleRemoveBook}
          >
            Remove
          </Button>
        )}
        </Box>
        
      </Link>

    </Box>
  );
}