import axios from "axios"
import { useSearchParams, NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

const VerifyPayment = () => {
    const [searchParams] = useSearchParams()
    const [status, setStatus] = useState("loading")

    const reference = searchParams.get("reference")
      const token = Cookies.get("token");

    console.log(reference)

    useEffect(() =>{
          const confirmPayment = async() =>{
        try {
          const payment = await  axios.get(`https://fastbuy-backend.onrender.com/pay/verify/${reference}`,
           {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
          )

          console.log(payment)
          setStatus(payment.data.data.status)
        } catch (error) {
            console.log(error.response.data || "Something went wrong")
        }
    }

    confirmPayment()

    },[reference, token])

  
  return (
    <div className="flex items-center justify-center flex-col gap-5 min-h-[80vh]">
     {status === "loading" &&( <div>
        <button className="animate-spin"></button>
        Loading...</div>) }

     {status === "success" && (<div>
        <h1 className="text-green-600 text-xl">Your payment is successful</h1>
          <NavLink to={"/"}>
        <button className="py-2 px-4 text-black border-gray-900 rounded-md text-xl">Go back to home page</button>
        </NavLink>
     </div>) }

    
     {status === "failed" && (<div>
        <h1 className="text-red-500 text-xl">Your payment is successful</h1>
        <NavLink to={"/"}>
        <button className="py-2 px-4 text-black border-gray-900 rounded-md text-xl">Go back to home page</button>
        </NavLink>
     </div>) }
    </div>
  )
}

export default VerifyPayment
