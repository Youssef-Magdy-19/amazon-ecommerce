import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserButton, useClerk, useUser } from "@clerk/clerk-react"


const CartEmpty = () => {
    const navigate = useNavigate()
    const { openSignIn } = useClerk()
    const { user } = useUser()

    
    return (
        <div className="bg-white flex flex-col md:flex-row items-center gap-[2rem]" style={{ padding: '30px' }}>
            <img src="/images/cartImage.jpg" alt="" className="w-[250px] " />
            <div className="cartContent flex-1">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl md:4xl font-semibold">Your Amazon Shopping cart is empty</h2>
                    <Link to='/' className="text-blue-400 text-md">Shop today's offers</Link>
                    <div className="flex flex-col md:flex-row gap-[.6rem]" style={{ marginTop: '10px' }}>
                        { !user && <button 
                        className="bg-yellow-400 rounded-full hover:bg-yellow-500" 
                        style={{ padding: '5px 12px' }}
                        onClick={()=>{openSignIn()}}
                        >
                            Login to your account
                        </button>
                        }
                        <button
                            className={`bg-white border rounded-full`}
                            style={{ padding: '5px 12px' }}
                            onClick={() => navigate('/products')}
                        >
                            Follow up shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CartEmpty