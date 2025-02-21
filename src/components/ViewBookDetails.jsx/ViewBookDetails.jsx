import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa"; // Corrected icon import
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
    Card, Image,
    Stack,
    Heading,
    Text,
    Button,
    CardBody,
    CircularProgress,
    Box,
    useToast
} from '@chakra-ui/react';

export default function ViewBookDetails() {
    const toast = useToast()
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const navigate = useNavigate();
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://library-management-system-3fx0.onrender.com/get-book-by-id/${id}`);

            if (response.status >= 200 && response.status < 300) {
                if (response.data.status === 'Success') {
                    setData(response.data.data);
                }
            } else {
                setError(`API endpoint returned an error: ${response.status}`);
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    if (loading) {
        return <div><CircularProgress isIndeterminate color="green.300" /></div>;
    }

    if (error) {
        return <div><CircularProgress isIndeterminate color="red.300" />{error}</div>;
    }

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    }

    const handleFav = async () => {
        try {
            const res = await axios.put(`https://library-management-system-3fx0.onrender.com/addFavourite`,
                {}, { headers })
            toast({
                status: "success",
                title: res.data.message,
                isClosable: true,
            })
        } catch (error) {
            console.error(error)
            toast({
                status: "error",
                title: "Failed to add to favourites",
                isClosable: true,
            })
        }
    }

    const handleToCart = async () => {
        try {
            const res = await axios.put(`https://library-management-system-3fx0.onrender.com/add-cart-to`,
                {}, { headers })
            toast({
                status: "success",
                title: res.data.message,
                isClosable: true,
            })
            
        } catch (error) {
            console.error(error)
            toast({
                status: "error",
                title: "Failed to add to cart",
                isClosable: true,
            })
        }
    }

    const deleteHandler = async () => {
        try {
            const res = await axios.delete(`https://library-management-system-3fx0.onrender.com/delete-book`, { headers })
            console.log(res.data);

            toast({
                status: "success",
                title: res.data.message,
                isClosable: true,
            })
            navigate("/all-books")
        } catch (error) {
            console.error(error)
            toast({
                status: "error",
                title: "Failed to delete book",
                isClosable: true,
            })
        }
    }

    return (
        <Box p={[2, 4, 6]}>
            <Heading m={3} fontSize={['lg', 'xl', '2xl']}>Book Details</Heading>
            {data && Object.keys(data).length > 0 ? (
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    mt={5}
                    p={3}
                >
                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '320px', }}
                        src={data.url}
                        alt='Img'
                        
                    />

                    <Stack>
                        <CardBody>
                            <Heading size={['md', 'lg', 'xl']}>{data.title}</Heading>
                            <Text py={2} mt={4} fontSize={['sm', 'md', 'lg']}>
                                Author: {data.author}
                            </Text>
                            <Text py={2} fontSize={['sm', 'md', 'lg']}>
                                Description: {data.desc}
                            </Text>
                            <Text py='2' display="flex" alignItems="center" fontSize={['sm', 'md', 'lg']}>
                                <GrLanguage /> {data.language}
                            </Text>
                            <Text py='2' fontSize={['sm', 'md', 'lg']}>
                                Price: Rs{data.price}
                            </Text>
                        </CardBody>
                        {
                            isLoggedIn && role === "user" ? (
                                <Stack direction="row">
                                    <Button variant='solid' colorScheme='blue' onClick={handleFav} fontSize={['sm', 'md', 'lg']}>
                                        <FaHeart />
                                    </Button>
                                    <Button ml={4} variant='solid' colorScheme='blue' onClick={handleToCart} fontSize={['sm', 'md', 'lg']}>
                                        <FaShoppingCart />
                                    </Button>
                                </Stack>
                            ) : role === "admin" ? (
                                <Stack direction="row">
                                    <Button ml={4} variant='solid' colorScheme='blue' fontSize={['sm', 'md', 'lg']} onClick={deleteHandler}>
                                        <MdDelete />
                                    </Button>
                                    <Link to={`/updateBook/${id}`} ml={4}  style={{backgroundColor:"grey", padding:"12px", borderRadius:"5px", color:"white"}}  fontSize={['sm', 'md', 'lg']}>
                                        <FaEdit />
                                    </Link>
                                </Stack>
                            ) : null
                        }
                    </Stack>
                </Card>
            ) : (
                <CircularProgress isIndeterminate color="green.300" />
            )}
        </Box>
    );
}