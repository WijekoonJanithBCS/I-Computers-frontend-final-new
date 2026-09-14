import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <Link
            to={"/overview/" + product.productId}
            className="block"
        >
            <div
                className="
                    w-full
                    h-full
                    min-h-[380px]
                    rounded-2xl
                    overflow-hidden
                    bg-white
                    shadow-md
                    hover:shadow-xl
                    hover:-translate-y-1
                    transition-all
                    duration-300
                    cursor-pointer
                "
            >
                {/* Product Image */}
                <div className="w-full h-[220px] bg-gray-200 overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="
                                h-full
                                w-full
                                object-cover
                                hover:scale-105
                                transition-transform
                                duration-300
                            "
                        />
                    ) : (
                        <div className="
                            h-full
                            w-full
                            flex
                            items-center
                            justify-center
                            text-gray-400
                            text-lg
                        ">
                            No Image
                        </div>
                    )}
                </div>

                {/* Product Information */}
                <div className="p-5">

                    {/* Product ID */}
                    <span className="text-xs text-gray-400">
                        {product.productId}
                    </span>

                    {/* Product Name */}
                    <h2 className="
                        mt-1
                        text-lg
                        font-bold
                        text-gray-800
                        line-clamp-1
                    ">
                        {product.name}
                    </h2>

                    {/* Category */}
                    <p className="text-sm text-gray-500 mt-1">
                        {product.category}
                    </p>

                    {/* Price */}
                    <div className="mt-4 flex items-center justify-between">

                        <span className="
                            text-xl
                            font-bold
                            text-blue-600
                        ">
                            Rs. {product.price}
                        </span>

                        <span className="
                            px-3
                            py-1
                            rounded-lg
                            bg-blue-100
                            text-blue-600
                            text-sm
                            font-medium
                        ">
                            View
                        </span>

                    </div>
                </div>
            </div>
        </Link>
    );
}