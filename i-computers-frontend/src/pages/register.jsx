import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function RegisterPage(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()

    const googleLogin = useGoogleLogin(
        {
            onSuccess: (response) => {
                axios.post(import.meta.env.VITE_API_URL + "/users/google-login", {token: response.access_token}).then((response)=>{
                    toast.success("Login successfullocalstorage")
                    localStorage.setItem("token", response.data.token)
                    if(response.data.role == "admin"){
                        navigate("/admin")
                    }else{
                        navigate("/")
                    }
                }).catch(
                    (err)=>{
                        toast.error(err?.response?. data?.message || "Google login failed.please try again...")
                    }
                )
        },
        onError: (error) => {
            toast.error("Google login failed.please try again...")
        }}

    )

    async function signup(){
        if(password!=confirmPassword){
            toast.error("password do not match")
            return
        }
        try{
       
        const response = await axios.post(import.meta.env.VITE_API_URL + "/users/", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
    )
        console.log(response)
        //alert("Signup successful")
        toast.success("Signup successful")    
          navigate("/Login")
        } 

            
               
           
           
            
        
        
        catch(error){
            console.log(error);
            //alert("sign up failed")
            toast.error(error?.response?.data?.message || "failed to sign up");
        }
        }

    return(
        <div className="w-full h-screen bg-[url('/img01.jpg')] bg-cover bg-center no-repeat flex">
            <div className="w-[50%] h-full"></div>
            <div className="w-[50%] h-full flex justify-center items-center ">

                <div className="bg-white w-[400px] h-[600px] rounded-lg flex flex-col justify-center items-center">
                    <input type="text" placeholder="First Name" 
                        onChange={(e)=>{
                            setFirstName(e.target.value)
                        }
                        }className="m-2 p-2 w-[90%] h-[40px] rounded-lg border border-blue-600"/>
                    <input type="text" placeholder="Last Name" 
                        onChange={(e)=>{
                            setLastName(e.target.value)
                        }
                        }className="m-2 p-3 w-[90%] h-[40px] rounded-lg border border-blue-600"/>
                    <input type="email" placeholder="Email" 
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }
                        } className="m-2 p-3 w-[90%] h-[40px] rounded-lg border border-blue-600"/>
                    <input type="password" placeholder="password" 
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }
                        }className="m-2 p-3 w-[90%] h-[40px] rounded-lg border border-blue-600"/>
                    <input type="password" placeholder="Confirm password" 
                        onChange={(e)=>
                            setConfirmPassword(e.target.value)
                        }className="m-2 p-3 w-[90%] h-[40px] rounded-lg border border-blue-600"/>

                    
                    <button onClick={signup} className="m-5 p-3 w-[90%] h-[50px] rounded-lg bg-blue-700 text-white font-bold">Signup</button>
                    <button onClick={googleLogin} className="m-5 p-3 w-[90%] h-[50px] rounded-lg border border-blue-600 text-blue-600 font-bold">SIGNUP WITH GOOGLE</button>
                    <p className="w-full text-right text-blue-700 pr-5">Already have an account ? <Link to="/login" className="text-blue-600 font-bold">Login</Link></p>
                    
                </div>
            </div>

          

        </div>
    )
}