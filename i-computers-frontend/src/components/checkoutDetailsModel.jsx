import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CheckoutDetailsModel(props) {

    const [isVisible, setIsVisible] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const cart = props.cart;

    const navigate = useNavigate();


    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token == null) {

            toast.error("Please login to check out");
            navigate("/login");

            return;
        }


        axios.get(
            import.meta.env.VITE_API_URL + "/users/profile",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((response) => {

            console.log("USER PROFILE:", response.data);

            setFirstName(response.data.firstName || "");
            setLastName(response.data.lastName || "");
            setEmail(response.data.email || "");

        })
        .catch((error) => {

            console.log(
                "PROFILE ERROR:",
                error.response?.data || error.message
            );

            localStorage.removeItem("token");

            window.location.href = "/login";

        });

    }, [navigate]);


    async function placeOrder(e) {

        e.preventDefault();


        const token = localStorage.getItem("token");


        if (token == null) {

            toast.error("Please login to place order");

            window.location.href = "/login";

            return;
        }


        // Check cart
        if (!cart || cart.length === 0) {

            toast.error("Your cart is empty");

            return;
        }


        // Check required fields
        if (firstName.trim() === "") {

            toast.error("First Name is required");

            return;
        }


        if (lastName.trim() === "") {

            toast.error("Last Name is required");

            return;
        }


        if (addressLine1.trim() === "") {

            toast.error("Address Line 1 is required");

            return;
        }


        if (addressLine2.trim() === "") {

            toast.error("Address Line 2 is required");

            return;
        }


        if (city.trim() === "") {

            toast.error("City is required");

            return;
        }


        if (postalCode.trim() === "") {

            toast.error("Postal Code is required");

            return;
        }


        if (phone.trim() === "") {

            toast.error("Phone Number is required");

            return;
        }


        if (email.trim() === "") {

            toast.error("Email is required");

            return;
        }


        const order = {

            firstName: firstName.trim(),

            lastName: lastName.trim(),

            addressLine1: addressLine1.trim(),

            addressLine2: addressLine2.trim(),

            city: city.trim(),

            postalCode: postalCode.trim(),

            phoneNumber: phone.trim(),

            email: email.trim(),

            country: "Sri Lanka",

            items: []

        };


        // Add cart items
        cart.forEach((item) => {

            if (
                item.product != null &&
                item.product.productId != null
            ) {

                order.items.push({

                    productId: item.product.productId,

                    qty: item.qty

                });

            }

        });


        console.log("ORDER BEING SENT:", order);


        if (order.items.length === 0) {

            toast.error("Your cart does not contain valid products");

            return;
        }


        try {

            const response = await axios.post(

                import.meta.env.VITE_API_URL + "/orders",

                order,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );


            console.log("ORDER RESPONSE:", response.data);


            toast.success("Order placed successfully");


            window.location.href = "/";


        }
        catch (error) {

            console.log(
                "ORDER ERROR STATUS:",
                error.response?.status
            );

            console.log(
                "ORDER ERROR DATA:",
                error.response?.data
            );


            const message =
                error.response?.data?.message ||
                "Failed to place order";


            toast.error(message);

        }

    }


    return (

        <>

            <button
                className="bg-blue-400 text-white font-bold px-4 py-2 ml-5 rounded"
                onClick={() => {
                    setIsVisible(true);
                }}
            >
                Buy Now
            </button>


            {isVisible && (

                <div className="w-full h-full fixed top-0 left-0 bg-black/50 flex justify-center items-center z-50">

                    <div className="w-[400px] h-[500px] bg-white rounded-lg p-4 relative">

                        <button
                            onClick={() => {
                                setIsVisible(false);
                            }}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            X
                        </button>


                        <h2 className="text-2xl font-bold mb-4">
                            Enter Shipping Details
                        </h2>


                        <form
                            onSubmit={placeOrder}
                            className="flex flex-col gap-3"
                        >

                            <div className="flex gap-2">

                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                    }}
                                    className="w-1/2 border p-2 rounded"
                                />


                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}
                                    className="w-1/2 border p-2 rounded"
                                />

                            </div>


                            <input
                                type="text"
                                placeholder="Address Line 1"
                                value={addressLine1}
                                onChange={(e) => {
                                    setAddressLine1(e.target.value);
                                }}
                                className="w-full border p-2 rounded"
                            />


                            <input
                                type="text"
                                placeholder="Address Line 2"
                                value={addressLine2}
                                onChange={(e) => {
                                    setAddressLine2(e.target.value);
                                }}
                                className="w-full border p-2 rounded"
                            />


                            <input
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value);
                                }}
                                className="w-full border p-2 rounded"
                            />


                            <input
                                type="text"
                                placeholder="Postal Code"
                                value={postalCode}
                                onChange={(e) => {
                                    setPostalCode(e.target.value);
                                }}
                                className="w-full border p-2 rounded"
                            />


                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                                className="w-full border p-2 rounded"
                            />


                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                className="w-full border p-2 rounded"
                            />


                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Confirm
                            </button>

                        </form>

                    </div>

                </div>

            )}

        </>

    );

}