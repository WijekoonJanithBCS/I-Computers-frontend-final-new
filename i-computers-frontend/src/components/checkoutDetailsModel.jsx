import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CheckoutDetailsModel(props){

    const [isVisible, setIsVisible] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const cart= props.cart;
    const navigate = useNavigate();

    useEffect(
        () => {
          const token = localStorage.getItem("token");
          
          if(token==null){
              toast.error("please login to check out");
              navigate("/login");
              return;
          }
          axios.get(import.meta.env.VITE_API_URL + "/users/profile" , {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }).then(
            (response) => {
              console.log("USER PROFILE:", response.data);
              setFirstName(response.data.firstName);
              setLastName(response.data.lastName);
              setEmail(response.data.email);
            }
          )
          .catch(
                    ()=>{
                        localStorage.removeItem("token")
                        window.location.href="/login"
                    }
                )
        }, []
    )


  
    async function placeOrder(e) {
        e.preventDefault();
        
        const token = localStorage.getItem("token");
        if(token==null){
            toast.error("please login to place order");
            window.location.href= "/login";
            return;
        }

        const order= {
            firstName: firstName,
            lastName: lastName,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            postalCode: postalCode,
            phoneNumber: phone,
            email: email,
            country: "Sri Lanka",
            items: [],
        }
        cart.forEach(
            (item) => {
            order.items.push({
                productId: item.product.productId,
                qty: item.qty
            })

        });
            console.log(order);

            try {
                await axios.post(import.meta.env.VITE_API_URL + "/orders", order, {
                    headers: {
                        Authorization: "Bearer " + (token)
                    }
                });
                
                //console.log("SENT ORDER:", order);
                toast.success("Order placed successfully");
                window.location.href= "/";
            }
            catch(error){
                toast.error("Failed to place order");
            }
    }

    return (
       
        <>
            <button className="bg-blue-400 text-white font-bold px-4 py-2 ml-5 rounded"
            onClick={()=>{setIsVisible(true)}}
                >Buy Now
            </button>

            {isVisible&& <div className="w-full h-full fixed top-0 left-0 bg-black/50 flex justify-center items-center z-50">
            <div className="w-[400px] h-[500px] bg-white rounded-lg p-4 relative">
                <button onClick={()=>{setIsVisible(false)}} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    X
                </button>
                <h2 className="text-2xl font-bold mb-4">Enter Shipping Details</h2>
                <form onSubmit={placeOrder} className="flex flex-col gap-3">
                    <div className="flex gap-2">
                        <input type="text" placeholder="First Name" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} className="w-1/2 border p-2 rounded"/>
                        <input type="text" placeholder="Last Name" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} className="w-1/2 border p-2 rounded"/>
                    </div>
                    <input type="text" placeholder="Address Line 1" value={addressLine1} onChange={(e)=>{setAddressLine1(e.target.value)}} className="w-full border p-2 rounded"/>
                    <input type="text" placeholder="Address Line 2" value={addressLine2} onChange={(e)=>{setAddressLine2(e.target.value)}} className="w-full border p-2 rounded"/>
                    <input type="text" placeholder="City" value={city} onChange={(e)=>{setCity(e.target.value)}} className="w-full border p-2 rounded"/>
                    <input type="text" placeholder="Postal Code" value={postalCode} onChange={(e)=>{setPostalCode(e.target.value)}} className="w-full border p-2 rounded"/>
                    <input type="text" placeholder="Phone Number" value={phone} onChange={(e)=>{setPhone(e.target.value)}} className="w-full border p-2 rounded"/>
                    <input type="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="w-full border p-2 rounded"/>
                    <button  type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                       Confirm
                    </button>
                </form>
            </div>

            </div>}
        </>
        


        
    );
}
