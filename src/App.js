import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import ViewBookDetails from "./components/ViewBookDetails.jsx/ViewBookDetails";
import SignUp from "./pages/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "./components/Store/auth";
import Favourites from "./components/Profile/Favourites";
import UserOrder from "./components/Profile/UserOrder";
import Setting from "./components/Profile/Setting";
import AllOrdersHistory from "./pages/AllOrdersHistory";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authAction.login());
      dispatch(authAction.changeRole(localStorage.getItem("role")));
    }
    return () => {
      // Clean up function to prevent memory leaks
    };
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
        {role === "user" ?   <Route index element={<Favourites />} /> :   <Route index element={<AllOrdersHistory/>} />}
        {role === "admin" && <Route path="/profile/add-book" element={<AddBook/>} />}
          <Route path="order-history" element={<UserOrder />} />
          <Route path="settings" element={<Setting />} />
        </Route>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/updateBook/:id" element={<UpdateBook/>} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
