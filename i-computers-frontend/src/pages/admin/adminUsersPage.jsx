import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ViewOrderModelInfo from "../../components/viewOrderModelInfo.jsx";

export default function AdminUsersPage() {

    const [users, setUsers] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        
            const token = localStorage.getItem("token");
            axios.get(import.meta.env.VITE_API_URL + "/users/all/" + pageSize + "/" + pageNumber, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(
                (response)=>{
                    console.log(response.data)
                    setUsers(response.data.users)

                   
                    setTotalPages(response.data.totalPages);
                    setLoaded(true);
                }
            ).catch( //axios request ekata adala promise eka fail wenawa. Anna e hethuwa hoyanna catch ekak danne
                (err)=>{
                    console.log(err);
                    toast.error(err?.response?.data?.message || "Failed to fetch users");
                }
            )
        },[pageNumber, pageSize])
    
    return(
        <div className="w-full h-full overflow-y-scroll bg-blue-300 pl-2">
            <h4 className="font-bold text-xl">Users</h4><br/>
            <h1>Manage your Users at a glance</h1><br/>

            {isLoaded ? (
                <table className="w-full table-fixed border-collapse min-w-[1200px]">

                    <thead>
                        <tr className="border-b bg-gray-100 text-text-center uppercase text-sm overflow-y-scroll">
                            <th className="p-2">Email</th>
                            <th className="p-2">First name</th>
                            <th className="p-2">Last name</th>
                            <th className="p-2">Role</th>
                            <th className="p-2">Email verification</th>
                            <th className="p-2">Account status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {users.map((user) => (
                                
                                <tr key={user.id} className="text-center border-secondary/10">
                                    <td className="p-2">{user.email}</td>
                                    <td className="p-2">{user.firstName}</td>
                                    <td className="p-2">{user.lastName}</td>
                                    <td className="p-2">{user.role}</td>
                                    <td className="p-2">{user.isEmailVerified ? "Verified" : "Not Verified"}</td>
                                    <td className="p-2">{user.isBlocked ? "Active" : "Blocked"}</td>
                                    <td className="px-5 py-3 text-center">
                                        {/*block user button*/}

                                        <button className="bg-red-500 text-white p-1 rounded-md cursor-pointer w-[100px]" onClick={()=>{
                                            axios.post(import.meta.env.VITE_API_URL + "/users/toggle-block" , {
                                                email: user.email
                                            },{
                                                headers: {
                                                    Authorization: "Bearer " + localStorage.getItem("token")
                                                }
                                            }).then((response)=>{
                                                toast.success(response.data.message|| "User block status toggled successfully");
                                                console.log(response.data.message);
                                                setUsers(users.map((u) =>
                                                u.email === user.email
                                                    ? { ...u, isBlocked: !u.isBlocked }
                                                    : u
                                            ));
                                            }).catch((err)=>{
                                                toast.error(err?.response?.data?.message || "Failed to toggle block status");
                                            })

                                        }}>{user.isBlocked ? "Unblock" : "Block"}</button>

                                    </td>
                                    <td className="px-5 py-3 text-center">
                                       {/*make admin or customer button*/}
                                        <button className="bg-green-500 text-white p-1 rounded-md cursor-pointer w-[100px]" onClick={()=>{
                                            axios.post(import.meta.env.VITE_API_URL + "/users/toggle-role" , {
                                                email: user.email
                                            },{
                                                headers: {
                                                    Authorization: "Bearer " + localStorage.getItem("token")
                                                }
                                            }).then((response)=>{
                                                toast.success(response.data.message);
                                                setUsers(users.map((u) =>
                                                    u.email === user.email
                                                        ? { ...u, role: u.role === "admin" ? "customer" : "admin" }
                                                        : u
                                                ));
                                            }).catch((err)=>{
                                                toast.error(err?.response?.data?.message || "Failed to toggle role");
                                            })
                                        }}>{user.role === "admin" ? "Make Customer" : "Make Admin"}</button>
                                    </td>
                                    <td className="px-5 py-3 text-center">
                                    </td>

                                </tr>
                            ))}
                                 
                                    
                    </tbody>

    

                </table>
            ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <h1 className="text-2xl font-bold">Loading...</h1>
                </div>
            )}
            <div className="w-[1150px] absolute botom-5 left h-[40px] flex justify-center items-center ">
                <div className="w-[500px] h-full bg-white rounded-full items-center  justify-between flex items-center px-5  ">
                    <button className="bg-blue-400 text-white p-1 rounded-md cursor-pointer w-[100px] "onClick={()=>{
                        if(pageNumber > 1){
                            setPageNumber(pageNumber - 1);
                            setLoaded(true);
                        }
                        else{
                            toast.error("Already on the first page");
                        }
                    }}>Previous</button>
                    <span className="text-sm text-blue-500 w-[100px] flex justify-center items-center">
                        Page {pageNumber} of {totalPages}
                    </span>
                    <button className="bg-blue-400 text-white p-1 rounded-md cursor-pointer w-[100px]" onClick={()=>{
                        if(pageNumber < totalPages){
                            setPageNumber(pageNumber + 1);
                            setLoaded(true);
                        }
                        else{
                            toast.error("Already on the last page");
                        }
                    }}>Next</button>

                    <select

                        value ={pageSize} onChange={(e)=>{
                            setPageSize(parseInt(e.target.value));//in html 3,5,10 selected values are in string
                            setLoaded(true);
                        }} 
                        className="ml-5 bborder border-secondary/20 rounded px-3 py-2">
                            {/*<option value={2}>2 per page</option>
                            <option value={3}>3 per page</option>*/}
                            <option value={5}>5 per page</option>
                            <option value={10}>10 per page</option>
                            <option value={20}>20 per page</option>
                    </select>
                       
                    
                </div>

            </div>
                
                    
                    
        </div>
    )
        
}



