import React, { useContext, useState } from "react";
import { Plus, Minus, Trash } from 'lucide-react'
import { GlobalContext } from "../context/GlobalContext";

const CartProductCard = (props) => {
    const { removeProductFromCart, addToSavedForLater, addProductToCart, decreaseProductQuantity } = useContext(GlobalContext);
    const cartList = JSON.parse(localStorage.getItem('cartList')) || []
    // const [quantity, setquantity] = useState(props.quantity)
    const handlePlus = () => {
        addProductToCart(props.product)
    }
    const handleMinus = () => {
        if (props.quantity > 1) {
            decreaseProductQuantity(props.id)
        } else {
            removeProductFromCart(props.id)
        }
    }
    return (
        <div className="cartProductCard flex justify-between  bg-gray-100 rounded md:bg-white md:border-b border-gray-300" style={{ padding: '20px 0', margin: '0 15px' }}>
            <div className="flex items-start md:items-center gap-4">
                <div className="flex flex-col gap-[1rem] justify-between h-full">
                    <div className="cartProductCardImg w-[100px] h-[100px] sm:w-[125px] sm:h-[125px] md:w-[150px] md:h-[150px] bg-white rounded">
                        <img src={props.image} alt="" className="block w-full h-full object-contain rounded" />
                    </div>
                    <div className="block md:hidden flex items-center justify-between rounded-full gap-[1rem] w-[110px] border-2 border-yellow-300" >
                        <button onClick={() => handlePlus()} style={{ padding: '.5px 7px', borderRadius: '10px 0 0 10px' }}>
                            <Plus className="w-4 h-4 cursor-pointer" />
                        </button>
                        <p>{props.quantity}</p>
                        <button onClick={() => handleMinus()} style={{ padding: '.5px 7px', borderRadius: '0 10px 10px 0' }}>
                            {props.quantity == 1 ?
                                <Trash className="w-4 h-4 cursor-pointer" />
                                :
                                <Minus className="w-4 h-4 cursor-pointer" />
                            }
                        </button>
                    </div>
                </div>
                <div className="info flex flex-col flex-1 justify-between h-full gap-[1rem]">
                    <div>
                        <h4 className="text-lg md:text-xl">{props.title}</h4>
                        <p className="text-gray-600 text-[14px]">Eligible for free shipping</p>
                        <p className="text-green-600 text-[14px]">{props.count > 100 ? 'Available' : (<span className="text-red-600"> Only  {props.quantity}  left</span>)}</p>
                        <p className="text-blue-500 text-[14px]">15 days for return</p>
                    </div>
                    <div className="buttons-cart flex gap-[.5rem]">
                        <div className="hidden md:flex flex items-center justify-between rounded-full gap-[1rem] w-[130px] border-2 border-yellow-300" >
                            <button onClick={() => handlePlus()} style={{ padding: '.5px 7px', borderRadius: '10px 0 0 10px' }}>
                                <Plus className="w-4 h-4 cursor-pointer" />
                            </button>
                            <p>{props.quantity}</p>
                            <button onClick={() => handleMinus()} style={{ padding: '.5px 7px', borderRadius: '0 10px 10px 0' }}>
                                {props.quantity == 1 ?
                                    <Trash className="w-4 h-4 cursor-pointer" />
                                    :
                                    <Minus className="w-4 h-4 cursor-pointer" />
                                }
                            </button>
                        </div>

                        <button
                            className="rounded-full bg-white text-black border hover:bg-black hover:border-white hover:text-white"
                            style={{ padding: ".5px 10px" }}
                            onClick={() => removeProductFromCart(props.id)}
                        >
                            Delete
                        </button>

                        <button
                            className="saveLaterBtn rounded-full bg-white text-black border hover:bg-black hover:border-white hover:text-white w-[150px]"
                            style={{ padding: ".5px 10px" }}
                            onClick={() => addToSavedForLater(props.product)}
                        >
                            Save for Later
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