import React, { useContext, useState } from "react";
import { Plus, Minus, Trash } from 'lucide-react'
import { GlobalContext } from "../context/GlobalContext";

const CartProductCard = (props) => {
    const { removeProductFromCart } = useContext(GlobalContext);
    const cartList = JSON.parse(localStorage.getItem('cartList')) || []
    const [count, setCount] = useState(props.count)
    const handlePlus = () => {
        setCount(count + 1)
    }
    const handleMinus = () => {
        if (count > 1) {
            setCount(count - 1)
        } else {
            removeProductFromCart(props.id)
        }
    }
    return (
        <div className="cartProductCard flex justify-between gap-[1rem] bg-gray-100 rounded md:bg-white md:border-b border-gray-300" style={{ padding: '20px 0', margin: '0 15px' }}>
            <div className="flex items-start md:items-center gap-4">
                <div className="cartProductCardImg md:w-[150px] md:h-[150px] bg-white border border-gray-200  rounded">
                    <img src={props.image} alt="" className="block w-full h-full object-contain rounded" />
                </div>
                <div className="info flex flex-col justify-between gap-[1rem]">
                    <div>
                        <h4 className="text-lg md:text-xl">{props.title}</h4>
                        <p className="text-gray-600 text-[14px]">Eligible for free shipping</p>
                        <p className="text-green-600 text-[14px]">{props.count > 100 ? 'Available' : (<span className="text-red-600"> Only  {props.count}  left</span>)}</p>
                        <p className="text-blue-500 text-[14px]">15 days of replacement</p>
                    </div>
                    <div className="flex gap-[1rem]">
                        <div className="flex items-center justify-between rounded-full gap-[1rem] w-[130px] border-2 border-yellow-300" >
                            <button onClick={() => handlePlus()} style={{ padding: '.5px 7px', borderRadius: '10px 0 0 10px' }}>
                                <Plus className="w-4 h-4 cursor-pointer" />
                            </button>
                            <p>{count}</p>
                            <button onClick={() => handleMinus()} style={{ padding: '.5px 7px', borderRadius: '0 10px 10px 0' }}>
                                {count == 1 ?
                                    <Trash className="w-4 h-4 cursor-pointer" />
                                    :
                                    <Minus className="w-4 h-4 cursor-pointer" />
                                }
                            </button>
                        </div>

                        <button
                            className="rounded-full bg-white border"
                            style={{ padding: ".5px 10px" }}
                            onClick={() => removeProductFromCart(props.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <div className="productPrice hidden md:block w-[150px]">
                <p className="font-semibold text-lg text-right">{props.price} EGP</p>
            </div>
        </div>
    )
}
export default CartProductCard