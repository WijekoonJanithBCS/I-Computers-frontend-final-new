
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi2";
import AdminProductsPage from "./admin/adminProductsPage.jsx";
import AdminAddProductPage from "./admin/adminAddProductPage.jsx";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage.jsx";
import AdminOrdersPage from "./admin/adminOrdersPage.jsx";
import AdminUsersPage from "./admin/adminUsersPage.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        const checkAdmin = async () => {

            const token = localStorage.getItem("token");

            // No token
            if (!token) {
                navigate("/login", { replace: true });
                return;
            }

            try {

                const response = await axios.get(
                    import.meta.env.VITE_API_URL + "/users/current",
                    {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    }
                );

                const user = response.data.user;

                // User is not admin
                console.log("User role:", user.role);
                if (user.role !== "admin") {
                    navigate("/", { replace: true });
                    return;
                }

                // User is admin
                setLoading(false);

            } catch (error) {

                console.log(error);

                localStorage.removeItem("token");

                navigate("/login", { replace: true });
            }
        };

        checkAdmin();

    }, [navigate]);


    // Show loading while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">

                <div className="flex flex-col items-center gap-4">

                    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>

                    <p className="text-gray-600 text-lg">
                        Checking authentication...
                    </p>

                </div>

            </div>
        );
    }


    // Show admin panel only after admin verification
    return (
        <div className="w-full h-screen flex bg-blue-400">

            {/* Sidebar */}
            <div className="w-[200px] h-full bg-blue-400 text-white text-xl">

                <h1 className="text-[30px] text-center border-b-4 pb-2">
                    Admin Panel
                </h1>

                <Link
                    className="flex w-full p-[10px] gap-5 mt-5 hover:text-red-600"
                    to="/admin/orders"
                >
                    <FaShoppingBag />
                    Orders
                </Link>

                <Link
                    className="flex w-full p-[10px] gap-5 mt-5 hover:text-red-600"
                    to="/admin/products"
                >
                    <RiShoppingBag2Fill />
                    Products
                </Link>

                <Link
                    className="flex w-full p-[10px] gap-5 mt-5 hover:text-red-600"
                    to="/admin/users"
                >
                    <HiUsers />
                    Users
                </Link>

            </div>


            {/* Main Content */}
            <div className="flex-1 h-full border-4 border-blue-400 rounded-2xl bg-white p-4">

                <Routes>

                    <Route
                        path="/orders"
                        element={<AdminOrdersPage />}
                    />

                    <Route
                        path="/products"
                        element={<AdminProductsPage />}
                    />

                    <Route
                        path="/users"
                        element={<AdminUsersPage />}
                    />

                    <Route
                        path="/add-product"
                        element={<AdminAddProductPage />}
                    />

                    <Route
                        path="/update-product"
                        element={<AdminUpdateProductPage />}
                    />

                </Routes>

            </div>

        </div>
    );
}

