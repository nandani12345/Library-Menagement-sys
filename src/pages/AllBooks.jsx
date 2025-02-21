import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  CircularProgress,
} from '@chakra-ui/react';
import axios from 'axios';
import BookCard from '../components/BookCard/BookCard';

export default function AllBooks() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://library-management-system-3fx0.onrender.com/get-all-books`);
      if (response.data.status === 'Success' && Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        setError('API endpoint did not return an array of data');
      }
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box mt={4} px={[2, 4, 6]}>
      <Text
        fontSize={['lg', 'xl', '2xl']}
        color="black"
        mb={2}
        fontWeight="bold"
      >
        All Books
      </Text>
      {loading ? (
        <Text>
          <CircularProgress isIndeterminate color="green.300" />
        </Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <SimpleGrid
          spacing={4}
          templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']}
        >
          {data.length > 0 ? (
            data.map((item, index) => (
              <Card key={index} border="1px solid #ddd" borderRadius="md">
                <CardBody>
                  <BookCard data={item} />
                </CardBody>
              </Card>
            ))
          ) : (
            <Text>No data available</Text>
          )}
        </SimpleGrid>
      )}
    </Box>
  );
}