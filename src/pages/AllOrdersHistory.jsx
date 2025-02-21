import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaCheck } from "react-icons/fa";
import {
  Box,
  Spinner,
  Grid,
  GridItem,
  FormLabel,
  Flex,
  Text,
  Heading,
  Button,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,

} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import { useDisclosure } from "@chakra-ui/react";

export default function AllOrdersHistory() {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allOrders, setAllOrders] = useState([]);
  const [options, setOptions] = useState(-1);
  const [values, setValues] = useState({});
  const [userDivData, setUserDivData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://library-management-system-3fx0.onrender.com/get-all-Order-Details",
        { headers }
      );
      setAllOrders(res.data.data);

      // Initialize values state with fetched data
      const initialValues = {};
      res.data.data.forEach((order) => {
        initialValues[order._id] = order.status;
      });
      setValues(initialValues);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const change = (e, index) => {
    const { value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [allOrders[index]._id]: value,
    }));
  };

  const submitChanges = async (index) => {
    if (values[allOrders[index]._id]) {
      try {
        const id = allOrders[index]._id;
        const status = values[id];

        const res = await axios.put(
          `https://library-management-system-3fx0.onrender.com/update-status/${id}`,
          { status },
          { headers }
        );

        if (res.data.success) {
          toast({
            title: res.data.message,
            status: status,
            isClosable: true,
            duration: 2000,
          })
          setAllOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === id ? { ...order, status } : order
            )
          );
        } else {
        }
      } catch (error) {
        toast({
          title: "Error updating status",
          status: error,
          isClosable: true,
          duration: 2000,
        })
      }

      setOptions(-1);
    }
  };

  return (
    <Box p={4}>
      {Array.isArray(allOrders) && allOrders.length > 0 ? (
        <Box>
          {/* Header Section */}
          <Heading fontSize={["lg", "xl", "2xl"]} mb={4}>
            Your Order History
          </Heading>

          {/* Orders List */}
          <Grid
            templateColumns={{
              base: "1fr", // Mobile (stacked cards)
              sm: "1fr", // Small screens (stacked cards)
              md: "repeat(2, 1fr)", // Tablets (2 columns)
              lg: "repeat(3, 1fr)", // Large screens (3 columns)
              xl: "repeat(4, 1fr)", // Extra-large screens (4 columns)
            }}
            gap={4}
            mt={4}
          >
            {allOrders.map((item, index) => (
              <GridItem key={item._id}>
                <Box
                  p={4}
                  bg="grey"
                  borderRadius="lg"
                  boxShadow="lg"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  {/* Order Details */}
                  <Flex direction="column">
                    <Text fontSize="sm" fontWeight="bold">
                      #{index + 1}
                    </Text>
                    <RouterLink to={`/view-book-details/${item.book._id}`}>
                      <Text fontSize={["md", "lg"]} fontWeight="bold">
                        {item.book.title}
                      </Text>
                    </RouterLink>
                    <Text fontSize="md" color="black">
                      {item.book.desc.slice(0, 20)}...
                    </Text>
                    <Text fontSize="md" fontWeight="bold">
                      Rs {item.book.price}
                    </Text>

                    {/* Status Dropdown */}
                    <Box mt={2}>
                      <Button
                        onClick={() => setOptions(index)}
                        fontSize="sm"
                        colorScheme={
                          values[item._id] === "Order placed"
                            ? "green"
                            : values[item._id] === "Canceled"
                              ? "red"
                              : "gray"
                        }
                      >
                        {values[item._id] || "Order placed"}
                      </Button>
                      {options === index && (
                        <Box mt={2}>
                          <Select value={values[item._id]} onChange={(e) => change(e, index)}>
                            {[
                              "Order placed",
                              "Out for delivery",
                              "Delivered",
                              "Canceled",
                            ].map((status, idx) => (
                              <option key={idx} value={status}>
                                {status}
                              </option>
                            ))}
                          </Select>
                          <Button mt={2} onClick={() => submitChanges(index)}>
                            <FaCheck />
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Flex>

                  {/* User Details Button */}
                  <Button mt={2} onClick={() => {
                    setUserDivData(item.user);
                    onOpen();
                  }}>
                    <IoOpenOutline />
                  </Button>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Box>
      ) : (
        <Flex justify="center" align="center" h="100%">
          <Spinner thickness="4px" speed="0.65s" color="black" size="xl" />
        </Flex>
      )}

      {/* User Details Modal */}
      {userDivData && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>User Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormLabel>
                Username: <span style={{ color: "blue" }}>{userDivData.username}</span>
              </FormLabel>
              <FormLabel>
                Email: <span style={{ color: "blue" }}>{userDivData.email}</span>
              </FormLabel>
              <FormLabel>
                Address: <span style={{ color: "blue" }}>{userDivData.address}</span>
              </FormLabel>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}