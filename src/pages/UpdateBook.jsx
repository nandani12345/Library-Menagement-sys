import {
    Box,
    FormLabel,
    FormControl,
    Input,
    Textarea,
    Button,
    VStack,
    HStack,
    Heading,
    useToast
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateBook() {
    const { id } = useParams();
    const toast = useToast()
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id
    };
    const [data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: ""
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const validateData = () => {
        if (!data.url || !data.title || !data.author || !data.price || !data.desc || !data.language) {
            toast({
                status: "error",
                title: "Please fill in all fields",
                isClosable: true,
                duration:2000,
            })
            return false;
        }
        if (isNaN(data.price)) {
            toast({
                status: "error",
                title: "Price must be a number",
                isClosable: true,
                duration:2000,
            })
            return false;
        }
        return true;
    }

    const submitHandle = async (e) => {
        e.preventDefault();
        if (!validateData()) return;
        try {
            const res = await axios.put(`https://library-management-system-3fx0.onrender.com/update-book`, data, { headers });
            toast({
                status: "success",
                title: res.data.message,
                isClosable: true,
                duration:2000,
            })
            navigate(`/view-book-details/${id}`)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast({
                    status: "error",
                    title: error.message,
                    isClosable: true,
                    duration:2000,
                })
            } else {
                toast({
                    status: "error",
                    title: "An unknown error occurred",
                    isClosable: true,
                    duration:2000,
                })
            }
        }
    }

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
            if (axios.isAxiosError(error)) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <Box
                p={['4', '6', '15']}
                bg="white"
                borderRadius="lg"
                boxShadow="md"
            >
                <VStack spacing={['4', '6', '8']}>
                    <Box>
                        <Heading>Loading...</Heading>
                    </Box>
                </VStack>
            </Box>
        )
    }

    return (
        <Box
            p={['4', '6', '15']}
            bg="white"
            borderRadius="lg"
            boxShadow="md"
        >
            <VStack spacing={['4', '6', '8']}>
                <Box>
                    <Heading>Update Book</Heading>
                </Box>
                <form onSubmit={submitHandle}>
                    <FormControl>
                        <FormLabel>URL:</FormLabel>
                        <Input
                            type="text"
                            name="url"
                            value={data.url}
                            required
                            onChange={changeHandler}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Title:</FormLabel>
                        <Input
                            type="text"
                            name="title"
                            required
                            value={data.title}
                            onChange={changeHandler}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Author:</FormLabel>
                        <Input
                            type="text"
                            name="author"
                            required
                            value={data.author}
                            onChange={changeHandler}
                        />
                    </FormControl>
                    <FormControl>
                        <HStack spacing={['2', '4', '6']}>
                            <Box>
                                <FormLabel>Price:</FormLabel>
                                <Input
                                    type="number"
                                    name="price"
                                    required
                                    value={data.price}
                                    onChange={changeHandler}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Language:</FormLabel>
                                <Input
                                    type="text"
                                    name="language"
                                    required
                                    value={data.language}
                                    onChange={changeHandler}
                                />
                            </Box>
                        </HStack>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description:</FormLabel>
                        <Textarea
                            name="desc"
                            value={data.desc}
                            required
                            onChange={changeHandler}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme="teal"
                        variant="solid"
                    >
                        Update Book
                    </Button>
                </form>
            </VStack>
        </Box>
    )
}