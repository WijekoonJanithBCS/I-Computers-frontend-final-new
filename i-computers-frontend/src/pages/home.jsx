import { Route, Routes } from "react-router-dom";
import Header from "../components/header.jsx";
import ProductPage from "./productPage.jsx";
import Overview from "./overView.jsx";
import Cart from "./cart.jsx";
import CheckOut from "./checkout.jsx";
import MyOrdersPage from "./myOrdersPage.jsx";
import SettingsPage from "./settings.jsx";
import HomePage2 from "./HomePage.jsx";


export default function HomePage(){
    return(
        <div className="w-full min-h-screen">
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage2/>}/>
                <Route path="/about" element={<div>About page content</div>}/>
                <Route path="/contact" element={<div>Contact page content</div>}/>
                <Route path="/products" element={<ProductPage/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/overview/:productId" element={<Overview/>}/>
                <Route path="/checkout" element={<CheckOut/>}/>
                <Route path="/my-orders" element={<MyOrdersPage/>}/>
                <Route path="/settings" element={<SettingsPage/>}/> 
                <Route path="/*" element={<div>404 not found</div>}/>
                
            </Routes>

        </div>
    )
}