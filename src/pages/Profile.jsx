import React, { useEffect, useState } from 'react';
import axios from "axios";
import Sidebar from '../components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import { Box, Spinner, Text } from '@chakra-ui/react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  const handler = async () => {
    try {
      const res = await axios.get(`https://library-management-system-1-06yg.onrender.com/user`, { headers });
      // console.log(res.data);

      setProfile(res.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handler();
  }, [])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection={["column", "row", "row"]} >
      <Sidebar data={profile} bg={"green.300"} display={["none", "block", "block"]} />
      <Box w={["full", "80%", "80%"]} p={["2", "4", "6"]}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Profile;