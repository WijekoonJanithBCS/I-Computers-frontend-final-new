import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../components/productCard";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);

    // Fetch all products
    const fetchProducts = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                import.meta.env.VITE_API_URL + "/products"
            );

            setProducts(response.data.products);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch products. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Search products
    const searchProducts = async () => {
        const query = search.trim();

        // If search box is empty, load all products
        if (!query) {
            fetchProducts();
            return;
        }

        try {
            setSearching(true);

            const response = await axios.get(
                import.meta.env.VITE_API_URL +
                    "/products/search/" +
                    encodeURIComponent(query)
            );

            setProducts(response.data);

            if (response.data.length === 0) {
                toast("No products found.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to search products. Please try again.");
        } finally {
            setSearching(false);
        }
    };

    // Load products when page opens
    useEffect(() => {
        fetchProducts();
    }, []);

    // Search when pressing Enter
    const handleSubmit = (event) => {
        event.preventDefault();
        searchProducts();
    };

    // Clear search
    const handleClear = () => {
        setSearch("");
        fetchProducts();
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">

            {/* Page Title */}
            <div className="max-w-7xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center">
                    Products
                </h1>

                <p className="text-center text-gray-500 mt-2">
                    Search and explore our products
                </p>
            </div>

            {/* Search Section */}
            <div className="max-w-2xl mx-auto mb-10">

                <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-2"
                >
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search products..."
                            className="
                                w-full
                                px-5
                                py-3
                                pr-12
                                rounded-xl
                                border
                                border-gray-300
                                bg-white
                                text-gray-800
                                outline-none
                                transition
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-200
                            "
                        />

                        {/* Search Icon */}
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                            🔍
                        </span>
                    </div>

                    {/* Search Button */}
                    <button
                        type="submit"
                        disabled={searching}
                        className="
                            px-6
                            py-3
                            rounded-xl
                            bg-blue-600
                            text-white
                            font-semibold
                            hover:bg-blue-700
                            disabled:bg-blue-300
                            transition
                        "
                    >
                        {searching ? "Searching..." : "Search"}
                    </button>
                </form>

                {/* Clear Button */}
                {search && (
                    <button
                        onClick={handleClear}
                        className="
                            mt-3
                            text-sm
                            text-blue-600
                            hover:text-blue-800
                            font-medium
                        "
                    >
                        ✕ Clear search
                    </button>
                )}
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex justify-center items-center py-20">
                    <div className="
                        w-10
                        h-10
                        border-4
                        border-blue-200
                        border-t-blue-600
                        rounded-full
                        animate-spin
                    "></div>
                </div>
            )}

            {/* Products */}
            {!loading && (
                <>
                    {products.length > 0 ? (
                        <div className="
                            max-w-7xl
                            mx-auto
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-3
                            xl:grid-cols-4
                            gap-6
                        ">
                            {products.map((item) => (
                                <ProductCard
                                    product={item}
                                    key={item.productId}
                                />
                            ))}
                        </div>
                    ) : (
                        /* No products */
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">
                                🔍
                            </div>

                            <h2 className="text-2xl font-semibold text-gray-700">
                                No products found
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Try searching with a different product name.
                            </p>

                            <button
                                onClick={handleClear}
                                className="
                                    mt-5
                                    px-5
                                    py-2
                                    bg-blue-600
                                    text-white
                                    rounded-lg
                                    hover:bg-blue-700
                                "
                            >
                                Show All Products
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}