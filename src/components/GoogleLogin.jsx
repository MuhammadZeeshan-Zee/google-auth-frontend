/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Extract ID token from URL
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const idToken = hashParams.get("id_token");

    // if (idToken) {
    //   console.log("ID Token:", idToken);
    //   localStorage.setItem("google_id_token", idToken); // Store it
    //   // Redirect to remove token from URL
    //   window.history.replaceState(null, "", window.location.pathname);
    //   // navigate("/home")
    // }
    const oauth = async (token) => {
      try {
          const { data } = await axios.post("http://localhost:4000/user/oauth", { token });
          console.log("data",data);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("user", JSON.stringify(data.user));
            if(data.user){
            toast.success("Login Successful!");
            navigate("/home")
          }
      } catch (error) {
          console.error("Login Failed:", error);
      }
  };
  oauth(idToken)
  }, []);
  const handleLogin = () => {
    const GOOGLE_CLIENT_ID = "472022384957-1k2vqqaccglhibkj1jd0tge0kr2s6m20.apps.googleusercontent.com";
    const REDIRECT_URI = "http://localhost:5173";
    const SCOPE = "openid email profile";
    const NONCE = Math.random().toString(36).substring(2); // Generate a random nonce
  
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&response_type=id_token` +  // Using id_token requires nonce
      `&scope=${encodeURIComponent(SCOPE)}` +
      `&nonce=${NONCE}` + // Add nonce
      `&prompt=select_account`;
  
    window.location.href = authUrl;
  };
  return (
    <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded">
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
