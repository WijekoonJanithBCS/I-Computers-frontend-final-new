
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function HomePage2() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (loading) {

            axios.get(import.meta.env.VITE_API_URL + "/products")
                .then((response) => {

                    setProducts(response.data.products);
                    setLoading(false);

                })
                .catch((error) => {

                    console.log(error);

                    toast.error("Failed to fetch products. Please try again");

                    setLoading(false);

                });

        }

    }, []);


    const categories = [
        {
            name: "Laptops",
            icon: "💻",
            description: "Powerful laptops for work and study"
        },
        {
            name: "Desktop PCs",
            icon: "🖥️",
            description: "Reliable desktops for every need"
        },
        {
            name: "Components",
            icon: "⚙️",
            description: "RAM, SSD, GPU and more"
        },
        {
            name: "Accessories",
            icon: "🎧",
            description: "Keyboards, mice, headsets and more"
        }
    ];


    return (

        <div className="min-h-screen bg-gray-50 text-gray-900">

            {/* ================= HERO ================= */}

            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">

                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

                    <div className="grid items-center gap-12 lg:grid-cols-2">

                        {/* LEFT SIDE */}

                        <div className="text-center lg:text-left">

                            <span className="inline-block rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-300">
                                Your Trusted Computer Store
                            </span>

                            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">

                                Upgrade Your

                                <span className="block text-blue-400">
                                    Digital World
                                </span>

                            </h1>

                            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300 lg:mx-0">

                                Find laptops, desktop PCs, components and accessories
                                for work, gaming and everyday computing.

                            </p>

                            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">

                                <Link
                                    to="/products"
                                    className="inline-block rounded-lg bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg transition hover:bg-blue-700"
                                >
                                    Shop Now
                                </Link>

                                <Link
                                    to="/about"
                                    className="inline-block rounded-lg border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white transition hover:bg-white/20"
                                >
                                    About Us
                                </Link>

                                <Link
                                    to="/contact"
                                    className="inline-block rounded-lg border border-blue-400 px-7 py-3.5 font-semibold text-blue-300 transition hover:bg-blue-500 hover:text-white"
                                >
                                    Contact Us
                                </Link>

                            </div>

                        </div>


                        {/* RIGHT SIDE */}

                        <div className="flex justify-center">

                            <div className="flex h-72 w-72 items-center justify-center rounded-3xl bg-white/10 shadow-2xl backdrop-blur">

                                <div className="text-center">

                                    <div className="text-8xl">
                                        🖥️
                                    </div>

                                    <p className="mt-5 text-xl font-bold text-white">
                                        Build Your Setup
                                    </p>

                                    <p className="mt-2 text-sm text-gray-300">
                                        Performance meets reliability
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= FEATURES ================= */}

            <section className="border-b bg-white">

                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-3 lg:px-8">

                    <div className="flex items-center justify-center gap-4">

                        <div className="text-3xl">
                            🚚
                        </div>

                        <div>

                            <h3 className="font-semibold">
                                Fast Delivery
                            </h3>

                            <p className="text-sm text-gray-500">
                                Island-wide delivery
                            </p>

                        </div>

                    </div>


                    <div className="flex items-center justify-center gap-4">

                        <div className="text-3xl">
                            🛡️
                        </div>

                        <div>

                            <h3 className="font-semibold">
                                Quality Products
                            </h3>

                            <p className="text-sm text-gray-500">
                                Reliable computer products
                            </p>

                        </div>

                    </div>


                    <div className="flex items-center justify-center gap-4">

                        <div className="text-3xl">
                            💬
                        </div>

                        <div>

                            <h3 className="font-semibold">
                                Customer Support
                            </h3>

                            <p className="text-sm text-gray-500">
                                We're here to help
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= CATEGORIES ================= */}

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

                <div className="text-center">

                    <p className="font-semibold text-blue-600">
                        SHOP BY CATEGORY
                    </p>

                    <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                        Find What You Need
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Explore our range of computer products and accessories.
                    </p>

                </div>


                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    {categories.map((category) => (

                        <Link
                            key={category.name}
                            to="/products"
                            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                        >

                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-3xl">
                                {category.icon}
                            </div>


                            <h3 className="mt-5 text-xl font-bold">
                                {category.name}
                            </h3>


                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                {category.description}
                            </p>


                            <div className="mt-5 font-semibold text-blue-600">
                                Shop now →
                            </div>

                        </Link>

                    ))}

                </div>

            </section>
            
            {/* ================= FINAL CTA ================= */}

            <section className="bg-white">

                <div className="mx-auto max-w-4xl px-6 py-16 text-center">

                    <h2 className="text-3xl font-bold sm:text-4xl">
                        Ready to Upgrade?
                    </h2>


                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Browse our products and find the right computer,
                        component or accessory for your setup.
                    </p>


                    <div className="mt-7 flex flex-wrap justify-center gap-4">

                        <Link
                            to="/products"
                            className="inline-block rounded-lg bg-blue-600 px-8 py-3.5 font-semibold text-white shadow-lg transition hover:bg-blue-700"
                        >
                            Start Shopping
                        </Link>

                        <Link
                            to="/about"
                            className="inline-block rounded-lg border border-gray-300 bg-white px-8 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                            About Us
                        </Link>

                        <Link
                            to="/contact"
                            className="inline-block rounded-lg border border-blue-600 px-8 py-3.5 font-semibold text-blue-600 transition hover:bg-blue-50"
                        >
                            Contact Us
                        </Link>

                    </div>

                </div>

            </section>


            {/* ================= PROMOTION ================= */}

            <section className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="overflow-hidden rounded-3xl bg-blue-600">

                    <div className="grid items-center gap-8 px-8 py-12 md:grid-cols-2 md:px-12">

                        <div>

                            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white">
                                SPECIAL OFFER
                            </span>


                            <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
                                Upgrade Your PC Today
                            </h2>


                            <p className="mt-4 max-w-lg text-blue-100">

                                Discover great products for your computer,
                                gaming setup and everyday computing needs.

                            </p>


                            <Link
                                to="/products"
                                className="mt-7 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
                            >
                                Explore Products
                            </Link>

                        </div>


                        <div className="flex justify-center">

                            <div className="text-9xl">
                                💻
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= PRODUCTS ================= */}

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

                    <div>

                        <p className="font-semibold text-blue-600">
                            FEATURED PRODUCTS
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            Popular Products
                        </h2>

                    </div>


                    <Link
                        to="/products"
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        View all products →
                    </Link>

                </div>


                {/* LOADING */}

                {loading && (

                    <div className="py-12 text-center">

                        <p className="text-gray-500">
                            Loading products...
                        </p>

                    </div>

                )}


                {/* PRODUCTS */}

                {!loading && products.length > 0 && (

                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {products.slice(0, 6).map((product) => (

                            <Link
                                key={product.productId}
                                to={"/overview/" + product.productId}
                                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >

                                {/* PRODUCT IMAGE */}

                                <div className="flex h-56 items-center justify-center bg-gray-100">

                                    {product.images && product.images.length > 0 ? (

                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="h-full w-full object-contain p-4"
                                        />

                                    ) : (

                                        <div className="text-7xl">
                                            💻
                                        </div>

                                    )}

                                </div>


                                {/* PRODUCT DETAILS */}

                                <div className="p-6">

                                    <p className="text-sm font-medium text-blue-600">
                                        {product.category}
                                    </p>


                                    <h3 className="mt-2 line-clamp-1 text-lg font-bold">
                                        {product.name}
                                    </h3>


                                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                                        {product.description}
                                    </p>


                                    <div className="mt-5 flex items-center justify-between">

                                        <div>

                                            <p className="text-xl font-bold text-blue-600">
                                                Rs. {product.price.toLocaleString()}
                                            </p>


                                            {product.labelledPrice && product.labelledPrice > product.price && (

                                                <p className="text-sm text-gray-400 line-through">
                                                    Rs. {product.labelledPrice.toLocaleString()}
                                                </p>

                                            )}

                                        </div>


                                        <span className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white">
                                            View
                                        </span>

                                    </div>

                                </div>

                            </Link>

                        ))}

                    </div>

                )}


                {/* NO PRODUCTS */}

                {!loading && products.length === 0 && (

                    <div className="mt-8 rounded-xl bg-white p-10 text-center shadow-sm">

                        <p className="text-gray-500">
                            No products available.
                        </p>

                    </div>

                )}

            </section>


            {/* ================= WHY CHOOSE US ================= */}

            <section className="bg-gray-900">

                <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

                    <div className="text-center">

                        <p className="font-semibold text-blue-400">
                            WHY CHOOSE US
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                            Everything You Need
                        </h2>

                    </div>


                    <div className="mt-12 grid gap-8 md:grid-cols-3">

                        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-7">

                            <div className="text-4xl">
                                💰
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-white">
                                Competitive Prices
                            </h3>

                            <p className="mt-3 leading-7 text-gray-400">
                                Get quality computer products at competitive
                                prices without compromising on reliability.
                            </p>

                        </div>


                        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-7">

                            <div className="text-4xl">
                                🔧
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-white">
                                Technical Support
                            </h3>

                            <p className="mt-3 leading-7 text-gray-400">
                                Need help choosing the right product?
                                We can help you find the right solution.
                            </p>

                        </div>


                        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-7">

                            <div className="text-4xl">
                                ⭐
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-white">
                                Trusted Service
                            </h3>

                            <p className="mt-3 leading-7 text-gray-400">
                                We focus on providing a simple and reliable
                                shopping experience for every customer.
                            </p>

                        </div>

                    </div>

                </div>

            </section>



        </div>
    );
}

export default HomePage2;

