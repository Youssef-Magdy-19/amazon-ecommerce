

import React, { use, useContext, useEffect, useRef, useState } from "react"
import React, { use, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserButton, useClerk, useUser } from "@clerk/clerk-react"
import { Menu, User, X } from "lucide-react"
import AmazonSidebar from "./SideBar"
import { GlobalContext } from "../context/GlobalContext"

const Navbar = () => {
    const navigate = useNavigate()
    const { openSignIn } = useClerk()
    const { user } = useUser()
    const [isOpen, setIsOpen] = useState(false)
    const [scroll, setScroll] = useState(false)
    const {cart} = useContext(GlobalContext)

    // حساب عدد السلع 
    let numberOfGoods = 0
    cart.map((product) => {
        numberOfGoods += product.quantity
        return numberOfGoods
    })
    const cartList = localStorage.getItem('cartList')

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 180) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [])


    // @ts-ignore
    const sidebarRef = useRef()
    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutSide)
        } else {
            document.removeEventListener("mousedown", handleClickOutSide)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutSide)
        }
    }, [isOpen])

    return (
        <>
            {/* هيدر Scroll للموبايل فقط */}
            {scroll && (
                <header className="block md:hidden w-full min-h-[50px] bg-gray-800 fixed top-0 z-500 flex items-center justify-between gap-[1rem] px-[15px]" style={{ transition: '.5s' }}>
                <header className="block md:hidden w-full min-h-[50px] bg-gray-800 fixed top-0 z-500 flex items-center justify-between gap-[1rem]" style={{ padding: "0 15px", transition: '.5s' }}>
                    {/* icon list */}
                    <button className="cursor-pointer block md:hidden" onClick={() => setIsOpen(true)}>
                        <Menu color="white" size={30} />
                    </button>
                    {/* Search */}
                    <div className="search flex bg-white text-gray-500 rounded min-w-[230px]">
                        <input
                            type="text"
                            placeholder="Search Amazon.eg"
                            className="border-0 outline-0 w-[70%]"
                            style={{ padding: '8px 12px' }}
                        />
                        <button
                            className="bg-yellow-500 cursor-pointer"
                            style={{ padding: '0 10px', borderRadius: '0 4px 4px 0', marginLeft: 'auto' }}
                            onClick={() => navigate('/products')}
                        >
                            <img src="/images/search.png" />
                        </button>
                    </div>
                    {/* Link to cart */}
                    <button
                        className="cart relative flex items-center gap-[0.5rem]"
                        onClick={() => navigate('/cart')}
                    >
                        <span className="absolute top-[-28%] left-[45%] text-orange-400 font-bold text-[18px] cursor-pointer">{numberOfGoods}</span>
                        <span className="absolute top-[-28%] left-[45%] text-orange-400 font-bold text-[18px]">{cartList.length}</span>
                        <img src="/images/cart.png" alt="" />
                    </button>
                </header>
            )}

            {/* الهيدر الأساسي (دائم على الشاشات الكبيرة + موبايل لما مفيش Scroll) */}
            < header className={`bg-gray-800 w-full min-h-[60px] fixed top-0 z-500 ${scroll ? 'hidden md:block' : 'block'}`} style={{ padding: "0 15px", transition: '.5s' }}>
                <div className="flex items-center justify-between gap-[1rem] h-[60px]">
                    <div className="flex gap-[.5rem] items-center">
                        {/* icon list */}
                        <button className="cursor-pointer block md:hidden" onClick={() => setIsOpen(true)}>
                            <Menu color="white" size={30} />
                        </button>
                        {/* logo */}
                        <Link to='/'><img src="/images/AmazonNavbar.png" width={100} height={60} /></Link>
                    </div>
                    {/* Delive location */}
                    <div className="flex gap-1 items-center hidden md:flex">
                        <img src="/images/location.png" alt="" />
                        <p className="text-gray-400 text-[14px]">Deliver To <span className="text-white font-bold"> Egypt </span></p>
                    </div>
                    {/* Search */}
                    <div className="search flex bg-white text-gray-500 hidden md:flex rounded min-w-[330px]">
                        <select className="bg-gray-100 cursor-pointer w-[60px]" style={{ padding: '0 10px', borderRadius: "4px 0 0 4px" }}>
                            <option hidden>All</option>
                            <option>All Categories</option>
                            <option>Mens Fashion</option>
                            <option>Women Fashion</option>
                            <option>Electronics</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Search Amazon.eg"
                            className="border-0 outline-0"
                            style={{ padding: '8px 12px' }}
                        />
                        <button
                            className="bg-yellow-500 cursor-pointer"
                            style={{ padding: '0 10px', borderRadius: '0 4px 4px 0' }}
                            onClick={() => navigate('/products')}
                        >
                            <img src="/images/search.png" />
                        </button>
                    </div>
                    {/* language */}
                    <div className="gap-[0.5rem] items-center hidden md:flex">
                        <img src="https://flagcdn.com/eg.svg" width={28} height={24} />
                        <p className="font-bold text-white">EN</p>
                        <p className="font-bold">EN</p>
                        <img src="/images/Arrow.png" alt="" />
                    </div>
                    {/* sign in */}
                    {user ?
                        <div className="flex gap-[.5rem] items-center">
                            <span className="text-center text-white">{user.fullName}</span>
                            <span className="text-center">Hello! {user.fullName}</span>
                            <UserButton />
                        </div> :
                        <button
                            className="sign-in-btn flex items-center text-center cursor-pointer"
                            style={{ marginLeft: '16px' }}
                            onClick={() => openSignIn()}
                        >
                            <p className="text-gray-300 text-[14px]">
                                <span className="hidden xl:block">Hello,</span>
                                <span> Sign in </span>
                                <p className="text-white font-semibold w-[100px] hidden lg:block" style={{ marginLeft: '5px' }}>
                                    Account & Lists
                                </p>
                            </p>
                            <User className="block md:hidden text-gray-200" width={22} />
                            <User className="block md:hidden" width={22} />
                        </button>
                        }

                    {/* orders */}
                    <a href="#" className="text-center text-white hidden lg:block">Returens & Orders</a>
                    <a href="#" className="text-center hidden lg:block">Returens & Orders</a>
                    {/* Link to cart */}
                    <div
                        className="cart relative flex items-center gap-[0.5rem]"
                        onClick={() => navigate('/cart')}
                    >
                        <span className="absolute top-[-28%] left-[40%] text-orange-400 font-bold text-[18px]">{numberOfGoods}</span>
                        <img src="/images/cart.png" className="cursor-pointer " onClick={() => navigate('/cart')}/>
                        <span className="absolute top-[-28%] left-[45%] text-orange-400 font-bold text-[18px]">{cartList.length}</span>
                        <img src="/images/cart.png" className="cursor-pointer" onClick={() => navigate('/cart')}/>
                        <p className="font-semibold hidden xl:block">cart</p>
                    </div>
                </div>
                {/* search in mobile */}
                <div className="search flex bg-white text-gray-500 block md:hidden rounded min-w-[300px]">
                <div className="search flex bg-white text-gray-500 block md:hidden rounded min-w-[330px]">
                    <input
                        type="text"
                        placeholder="Search Amazon.eg"
                        className="border-0 outline-0"
                        style={{ padding: '8px 12px' }}
                    />
                    <button
                        className="bg-yellow-500 cursor-pointer"
                        style={{ padding: '0 10px', borderRadius: '0 4px 4px 0', marginLeft: 'auto' }}
                        onClick={() => navigate('/products')}
                    >
                        <img src="/images/search.png" />
                    </button>
                </div>
                {/* Delive location */}
                <div className="Deliver flex gap-1 items-center block md:hidden">
                    <img src="/images/location.png" alt="" />
                    <p className="text-gray-300 text-[14px]">Deliver To <span className="text-white font-bold"> Egypt </span></p>
                </div>

            </header >

            {/*  side bar  */}
            <AmazonSidebar isOpen={isOpen} setIsOpen={setIsOpen} user={user} signIn={openSignIn} />
        </>
    )
}
export default Navbar