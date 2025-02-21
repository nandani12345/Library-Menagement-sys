import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Spinner, Grid, SimpleGrid, Text } from '@chakra-ui/react';
import BookCard from "../BookCard/BookCard";

export default function Favourites() {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };

    useEffect(() => {
        const fetchFavouriteBooks = async () => {
            if (!localStorage.getItem("token")) {
                setLoading(false);
                setError("You are not logged in");
                return;
            }

            try {
                const res = await axios.get(`https://library-management-system-1-06yg.onrender.com/getfav`, { headers });
                setFavourites(res.data.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
        };
        fetchFavouriteBooks();

    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'

                />
            </Box>
        );
    }

    if (error) {
        return (
            <Box bg={"grey"} w={"full"} height="100vh" display="flex" justifyContent="center" alignItems="center" textAlign="center">
                <Text fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }} >{error}</Text>
            </Box>
        );
    }

    return (
        <Box >
            {favourites.length > 0 ? (
                <SimpleGrid columns={[2, 2, 3]} spacing={2} >
                    {favourites.map((item, index) => (
                        <Grid item xs={6} sm={6} md={4} key={index}>
                            <BookCard data={item} favourites={true} />
                        </Grid>
                    ))}
                </SimpleGrid>
            ) : (
                <Box bg={"grey"} w={"full"} height="100vh" display="flex" justifyContent="center" alignItems="center" textAlign="center">
                    <Text fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }} style={{display:"flex"}} >No favourite books found.
                        <img src="/fav.JPG" alt="fav"  />
                    </Text>
                </Box>
            )}
        </Box>
    );
}