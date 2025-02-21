import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Text, Image, Button } from '@chakra-ui/react';

export default function Zero() {
    return (
        <Flex
            h={{ base: '75vh', md: '75vh', lg: '75vh' }}
            direction={{ base: 'column', md: 'row', lg: 'row' }}
            justify="center"
            align="center"
            color={"black"}
            bg="gray.200"
            height={"auto"}

        >
            <Box
                w={{ base: 'full', md: '1/2', lg: '3/6' }}
                p={{ base: 4, md: 8 }}
                textAlign={{ base: 'center', md: 'start' }}
                order={{ base: 1, md: 1, lg: 1 }}
            >
                <Heading
                    fontSize={{ base: '3xl', md: '5xl' }}
                    fontWeight="semibold"
                    color="black"
                    mb={4}
                >
                    Traditional Home Library
                </Heading>
                <Text
                    fontSize={{ base: 'lg', md: 'xl', sm: " 2xl " }}
                    color="black"
                    textAlign="left"
                    mb={8}
                >
                    Built-in bookshelves and wainscotting create a warm and cozy feel in a traditional home library. Interior designers Tara Mangini and Percy Bright from Jersey Ice Cream Co. painted the wood detailing in an 1887 Arts & Crafts home in a warm gray.
                </Text>
                <Link to="/all-books"
                    style={{ backgroundColor: "green", padding: "5px", fontWeight: "bold", borderRadius: "5px" }}
                >
                    Explore
                </Link>
            </Box>
            <Box
                w={{ base: 'full', md: 'full', lg: '3/6' }}
                h={{ base: 'full', md: 'full', lg: 'full' }}
                overflow="hidden"
                order={{ base: 2, md: 2, lg: 2 }}
                display={{ base: 'block', md: 'none', lg: 'block' }}  //{/* Hide on md (tablet), show on base (mobile) and lg (desktop) */}
            >
                <Box
                    w={{ base: 'full', md: 'full', lg: '3/6' }}
                    h={{ base: 'full', md: 'full', lg: 'full' }}
                    overflow="hidden"
                    order={{ base: 2, md: 2, lg: 2 }}
                >
                    <Image
                        src="./homes.JPG"
                        alt="img"
                        p="20px"
                        objectFit="cover"
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                    />
                </Box>
            </Box>
        </Flex>
    );
}
