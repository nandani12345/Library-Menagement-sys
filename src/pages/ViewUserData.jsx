import React from 'react';
import { RxCross1 } from "react-icons/rx";
import { Box, Button, Heading, FormLabel } from '@chakra-ui/react';

export default function ViewUserData({ userDivData, userDiv, setUserDiv }) {
    return (
        <Box>
            <Box display={userDiv} justifyContent="space-between" p={4}>
            </Box>
            <Box display={userDiv}
                sx={{
                    '@media (max-width: 480px)': { // base
                        padding: '1rem',
                        width: '100%',
                    },
                    '@media (min-width: 481px) and (max-width: 768px)': { // sm
                        padding: '2rem',
                        width: '80%'
                    },
                    '@media (min-width: 769px)': { // md
                        padding: '3rem',
                        width: '60%',
                    },
                }}
            >
                <Box>
                    <Heading fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}>User   Information</Heading>
                    <Button onClick={() => setUserDiv && setUserDiv("hidden")}>
                        <RxCross1 />
                    </Button>
                </Box>
                {userDivData && (
                    <Box>
                        <FormLabel>
                            Username:{" "}
                            <span style={{ color: "blue" }}>{userDivData.username}</span>
                        </FormLabel>
                        <FormLabel>
                            Email:{" "}
                            <span style={{ color: "blue" }}>{userDivData.email}</span>
                        </FormLabel>
                        <FormLabel>
                            Address:{" "}
                            <span style={{ color: "blue" }}>{userDivData.address}</span>
                        </FormLabel>
                    </Box>
                )}
            </Box>
        </Box>
    )
}