import { Box, Image, Text, Link as ChakraLink, Divider, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from '../Store/auth'; // Import authActions from the correct file

export default function Sidebar({ data, handleLogout }) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      history("/");
    }
  }, [isLoggedIn, history]);

  const handleLogoutClick = async () => {
    setLoading(true);
    await dispatch(authAction.logout());
    setLoading(false);
    dispatch(authAction.changeRole("user"));
    localStorage.clear("id");
    localStorage.clear("role");
    localStorage.clear("token");
    history("/");
  };

  const links = {
    user: [
      { to: "/profile", text: "Favourites" },
      { to: "/profile/settings", text: "Settings" },
      { to: "/profile/order-history", text: "Order History" },
    ],
    admin: [
      { to: "/profile", text: "All Order" },
      { to: "/profile/add-book", text: "Add Book" },
    ],
  };

  return (
    <Box
      bg="green.900" // light gray background
      p={[2, 4, 6]} // padding
      display="flex"
      flexDirection={["column", "column", "column", "column", "row "]} // adjust layout for larger screens
      alignItems={["center", "center", "center", "center", "flex-start"]} // adjust alignment for larger screens
      justifyContent={["center", "center", "center", "center", "flex-start"]} // adjust justification for larger screens
      height={["auto", "auto", "auto", "auto", "100vh"]} // adjust height for larger screens
      borderRadius="left"
      boxShadow="md"
    >
      <Box
        display={["flex", "flex", "flex", "flex", "none"]} // hide on larger screens
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mb={4}
      >
        <Image
          borderRadius="full"
          boxSize={["80px", "100px", "120px"]}
          src={data.avatar}
          alt="User   Avatar"
          mb={4}
        />
        <Text fontSize={["xl", "2xl", "3xl"]} fontWeight="bold" mb={2}>
          {data.username}
        </Text>
        <Text fontSize={["md", "lg", "xl"]} color="gray.500" mb={4}>
          {data.email}
        </Text>
      </Box>
      <Divider borderWidth="1px" borderColor="gray.200" />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        w="full"
        textAlign="left"
        mt={6}
        gap={4}
      >
        {(role === "user" ? links.user : links.admin).map((link) => (
          <Link key={link.to} to={link.to}>
            <ChakraLink
              color="black"
              _hover={{
                color: 'black.500',
                w: 'auto',
                h: 'auto',
                boxShadow: 'xl',
                backgroundColor: "teal.400"
              }}
              padding="2px 2px"
              borderRadius="md"
              fontSize={["md", "lg", "xl"]}
              colorScheme="teal"
              variant="solid"
            >
              {link.text}
            </ChakraLink>
          </Link>
        ))}
      </Box>
      <Box mb={4} gap={4} display="flex" justifyContent="flex-start">
        <Button
          variant="solid"
          fontSize={["md", "lg", "xl"]}
          padding="2px 2px"
          borderRadius="md"
          onClick={handleLogoutClick}
          isLoading={loading}
        >
          Logout <TbLogout />
        </Button>
      </Box>
    </Box>
  );
}