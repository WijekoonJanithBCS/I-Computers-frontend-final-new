import { Link, Route, Routes } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi2";
import AdminProductsPage from "./admin/adminProductsPage.jsx";
import AdminAddProductPage from "./admin/adminAddProductPage.jsx";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage.jsx";
import AdminOrdersPage from "./admin/adminOrdersPage.jsx";
import AdminUsersPage from "./admin/adminUsersPage.jsx";


export default function AdminPage(){
   
        return(
            <div className="w-full h-screen flex bg-blue-400">
                <div className="w-[200px] h-full bg-blue-400 text-white text-xl">
                    <h1 className="text-[30px] text-center border-b-4">Admin Panel</h1>
                    <Link className="flex w-full p-[10px]  gap-5 mt-5 hover:text-red-600" to="/admin/orders"><FaShoppingBag /> Orders</Link><br/>
                    <Link className="flex w-full p-[10px]  gap-5 mt-5 hover:text-red-600" to="/admin/products" ><RiShoppingBag2Fill/>Products</Link><br/>
                    <Link className="flex w-full p-[10px]  gap-5 mt-5 hover:text-red-600" to="/admin/users"><HiUsers/>Users</Link>
                </div>
                <div className="flex-1 h-full border-4 border-blue-400 rounded-2xl bg-white p-4">
                    <Routes>
                        <Route path="/orders" element={<AdminOrdersPage/>}/>
                        <Route path="/products" element={<AdminProductsPage/>}/>
                        <Route path="/users" element={<AdminUsersPage/>}/>
                        <Route path="/add-product" element={<AdminAddProductPage/>}/>
                        <Route path="/update-product" element={<AdminUpdateProductPage/>}/>
                    </Routes>
                    
                      
                </div>
               
            </div>
           
        )
    }
