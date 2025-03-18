import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { GoogleLogin } from '@react-oauth/google';
// import axios from "axios";
import GoogleLogin from "../components/GoogleLogin";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Login Page Mounted!"); // Runs when component mounts
    return () => {
      console.log("Login Page Unmounted!"); // Cleanup when unmounting
    };
  }, []);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
  };

  const handleSubmit = () => {
    if(!email && !password){
    toast.error("Email and Password are required!");
      return;
    }
    if (!email) {
      toast.error("Email is required!");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email format!");
      return;
    }
    if (!password) {
      toast.error("Password is required!");
      return;
    }
    if (!validatePassword(password)) {
      toast.error(
        "Password must contain at least 6 characters, including uppercase, lowercase, and numbers."
      );
      return;
    }

    // Successful login simulation
    toast.success("Login Successful!");
    navigate("/home");
  };
//   const handleSuccess = async (response) => {
//     try {
//         const { credential } = response;
//         const { data } = await axios.post("http://localhost:4000/user/oauth", { token: credential });
//         console.log("data",data);
//         localStorage.setItem("accessToken", data.accessToken);
//         localStorage.setItem("refreshToken", data.refreshToken);
//         localStorage.setItem("user", JSON.stringify(data.user));
//           if(data.user){
//           toast.success("Login Successful!");
//           // navigate("/home")
//         }
//     } catch (error) {
//         console.error("Login Failed:", error);
//     }
// };

//   credentialResponse => {
//     console.log("credentialResponse",credentialResponse);
    
//       const decoded = jwtDecode(credentialResponse.credential);
//   console.log(decoded);
//   console.log("decoded.email_verified=",decoded.email_verified);
  
//   if(decoded.email_verified===true){
//       toast.success("Login Successful!");
//       navigate("/home")
//   }else{
//       toast.error("something went wrong");
// return;
//   }
// }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Login</h2>
      <input
        type="email"
        placeholder="Enter your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
      />
      <input
        type="password"
        placeholder="Enter your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition mb-2"
      >
        Login
      </button>
      {/* <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
        console.log('Login Failed');
  }}
/> */}
<GoogleLogin/>
    </div>
  );
}

export default Login;
