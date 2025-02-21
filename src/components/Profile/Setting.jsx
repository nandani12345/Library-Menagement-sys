import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Text, Image, VStack, useToast, HStack, Button, Divider, Flex, Input } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';

export default function Setting() {
    const toast = useToast();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profileData, setProfileData] = useState({});
    const [value, setValue] = useState({ address: "" });

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };

    const handler = async () => {
        try {
            const res = await axios.get('https://library-management-system-1-06yg.onrender.com/user', { headers });
            console.log(res.data);

            setProfileData(res.data);
            setValue({ address: res.data.address })
        } catch (error) {
            console.error('Get User Cart Error:', error);
            setError(error.message);
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handler();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Text>Loading...</Text>
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Text>Error: {error}</Text>
            </Box>
        );
    }

    const handleChange = (e) => {
        setValue({ address: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.put('https://library-management-system-1-06yg.onrender.com/user-update-address', { address: value.address }, { headers });
            console.log(res.data);
            setProfileData({ ...profileData, address: value.address });
            toast({
                title: 'Success',
                description: 'Profile updated successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
    
        } catch (error) {
            console.error('Update User Error:', error);
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <Box maxW="1200px" mx="auto" p={[2, 4, 6]}>
            {profileData && (
                <Box>
                    <Heading mb={4} fontSize={["xl", "2xl", "3xl"]}>
                        Settings
                    </Heading>
                    <Flex flexDirection={["column", "column", "row"]} gap={4}>
                        <Box flex={1}>
                            <Text fontSize={["lg", "xl", "2xl"]} fontWeight="bold">Username</Text>
                            <Text fontSize={["md", "lg", "xl"]} >{profileData.username}</Text>
                        </Box>
                        <Box flex={1}>
                            <Text fontSize={["lg", "xl", "2xl"]} fontWeight="bold">Email</Text>
                            <Text fontSize={["md", "lg", "xl"]} >{profileData.email}</Text>
                        </Box>
                    </Flex>
                    <Box mt={4}>
                        <Text fontSize={["lg", "xl", "2xl"]} fontWeight="bold">Address</Text>
                        <Input
                            type="text"
                            value={value.address}
                            onChange={handleChange}
                            size="lg"
                            width="100%"
                            height={["80px", "100px", "120px"]}
                            padding={4}
                            borderRadius={4}
                            border="1px solid #ccc"
                        />
                    </Box>
                    <Box mt={4}>
                        <Button onClick={handleUpdate} fontSize={["md", "lg", "xl"]}>Update</Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
}