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
import { useState } from 'react';
import axios from 'axios';

export default function AddBook() {
    const toast = useToast()
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
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

    const submitHandle = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://library-management-system-3fx0.onrender.com/add-book`, data, { headers });
            toast({
                status: "success",
                title: res.data.message,
                isClosable: true,
                duration: 2000,
            })
            setData({
                url: "",
                title: "",
                author: "",
                price: "",
                desc: "",
                language: ""
            })
        } catch (error) {
            toast({
                status: "error",
                title: error.message,
                isClosable: true,
                duration: 2000,
            })
        }
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
                    <Heading>Add Book</Heading>
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
                        Add Book
                    </Button>
                </form>
            </VStack>
        </Box>
    );
}