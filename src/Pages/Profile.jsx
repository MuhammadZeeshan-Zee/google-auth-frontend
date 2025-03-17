import React, { useEffect, useState } from "react";
import API from "../utils/axiosInstance.js"; // Import the Axios instance
import {Link} from 'react-router-dom'
import Header from "../components/Header.jsx";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await API.get("/user/userinfo");
        setUser(data); // Store user info in state
      } catch (error) {
        console.log("error",error.status);
        
        console.error("Error fetching user info:", error.response?.data || error.message);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      <Header/><br/>
      <div>Name: {user.name }</div>
      <div>Email: {user.email }</div>
    </div>
  );
};

export default Profile;
