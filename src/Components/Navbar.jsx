
import React, { use, useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserButton, useClerk, useUser } from "@clerk/clerk-react"
import { Menu, User, X, Heart } from "lucide-react"
import AmazonSidebar from "./SideBar"
import { GlobalContext } from "../context/GlobalContext"
import Search from "./Search"

const Navbar = () => {
    const navigate = useNavigate()
    const { openSignIn } = useClerk()
    const { user } = useUser()
    const [isOpen, setIsOpen] = useState(false)
    const [scroll, setScroll] = useState(false)
    const { cart , wishlist} = useContext(GlobalContext)

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
                    {/* icon list */}
                    <button className="cursor-pointer block md:hidden" onClick={() => setIsOpen(true)}>
                        <Menu color="white" size={30} />
                    </button>
                    <Search width={230} response={''} />
                    {/* Link to cart */}
                    <button
                        className="cart relative flex items-center gap-[0.5rem]"
                        onClick={() => navigate('/cart')}
                    >
                        <span className="absolute top-[-28%] left-[45%] text-orange-400 font-bold text-[18px] cursor-pointer">{numberOfGoods}</span>
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
                    <Search width={330} response={'hidden md:flex'} />

                    {/* language */}
                    <div className="gap-[0.5rem] items-center hidden md:flex">
                        <img src="https://flagcdn.com/eg.svg" width={28} height={24} />
                        <p className="font-bold text-white">EN</p>
                        <img src="/images/Arrow.png" alt="" />
                    </div>
                    {/* sign in */}
                    {user ?
                        <div className="flex gap-[.5rem] items-center">
                            <span className="text-center text-white">{user.fullName}</span>
                            <UserButton />
                        </div> :
                        <button
                            className="sign-in-btn flex items-center text-center cursor-pointer"
                            style={{ marginLeft: '16px' }}
                            onClick={() => openSignIn()}
                        >
                            <p className="text-gray-300 text-[14px] ml-[-30px] md:ml-0">
                                <span> Sign in </span>
                                <p className="text-white font-semibold w-[100px] hidden lg:block" style={{ marginLeft: '5px' }}>
                                    Account & Lists
                                </p>
                            </p>
                            <User className="block md:hidden text-gray-200" width={22} />
                        </button>
                    }

                    {/* orders */}
                    <Link to="/products" className="text-center text-white hidden lg:block">Returens & Orders</Link>
                    
                    {/* wishlist */}
                    <button onClick={()=> navigate('/wishlist')} className="relative cursor-pointer">
                        <span className="absolute bottom-[-48%] right-[-20%] text-orange-400 font-bold text-[18px]">{wishlist.length}</span>
                        <Heart className="w-7 h-7" />
                    </button>
                    
                    {/* Link to cart */}
                    <div
                        className="cart relative flex items-center gap-[0.5rem]"
                        onClick={() => navigate('/cart')}
                    >
                        <span className="absolute top-[-28%] left-[40%] text-orange-400 font-bold text-[18px]">{numberOfGoods}</span>
                        <img src="/images/cart.png" className="cursor-pointer " onClick={() => navigate('/cart')} />
                        <p className="font-semibold hidden xl:block">cart</p>
                    </div>
                </div>

                {/* search in mobile */}
                <Search width={300} response={'flex md:hidden'} />

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