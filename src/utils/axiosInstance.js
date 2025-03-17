import axios from "axios";
// import useNavigator from ''
const API = axios.create({
  baseURL: "http://localhost:4000", // Your API base URL
//   withCredentials: true, // Ensures cookies (refresh token) are sent
});

// Request Interceptor: Attach Access Token to Every Request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("config",config);
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Unauthorized Errors
API.interceptors.response.use(
  (response) =>
     {console.log("response",response);
     
        return response}, // If the response is successful, return it
  async (error) => {
    
    const originalRequest = error.config;
console.log("originalRequest",originalRequest);

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops

      try {
        // Refresh Access Token
        console.log("attempting refresh token...");
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            console.error("No refresh token available");
            return;
          }
        const { data } = await axios.post("http://localhost:4000/user/refresh", {refreshToken});
        console.log("data",data);

        localStorage.setItem("accessToken", data.accessToken); // Update stored access token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return API(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError.response?.data || refreshError.message);
        localStorage.removeItem("accessToken"); // Clear access token
        localStorage.removeItem("refreshToken"); // Clear access token
        localStorage.removeItem("user"); // Clear access token
        
        window.location.href = "/"; // Redirect to login page
      }
    }

    return Promise.reject(error);
  }
);

export default API;
