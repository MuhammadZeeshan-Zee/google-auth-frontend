import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <GoogleOAuthProvider clientId="472022384957-1k2vqqaccglhibkj1jd0tge0kr2s6m20.apps.googleusercontent.com">
    <App />
    <ToastContainer/>
    </GoogleOAuthProvider>
  </BrowserRouter>,
)
