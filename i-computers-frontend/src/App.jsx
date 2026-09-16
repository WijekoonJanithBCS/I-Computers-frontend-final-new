
import { Route, Routes } from "react-router-dom"
import AdminPage from "./pages/admin.jsx"
import HomePage from "./pages/home.jsx"
import LoginPage from "./pages/login.jsx"
import TestPage from "./components/test.jsx"
import RegisterPage from "./pages/register.jsx"
import ForgotPasswordPage from "./pages/forgotPassword.jsx"
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Toaster } from "react-hot-toast"
import AboutPage from "./pages/about.jsx"

//636344840884-9bjmspfe92a8rhcglk587dfukvuf8dg3.apps.googleusercontent.com

function App() {
  

  return (
    <GoogleOAuthProvider clientId="636344840884-9bjmspfe92a8rhcglk587dfukvuf8dg3.apps.googleusercontent.com">
      <div>
      <Toaster position="top-right" />
        <Routes>
          
          <Route path="/*" element={<HomePage/>}/>
          <Route path="/admin/*" element={<AdminPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/test" element={<TestPage/>}/>
          <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
        </Routes>
      </div>
    
      
       
        
    </GoogleOAuthProvider>  
    )
  
}

export default App
