import React from "react";
import { X, User } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const AmazonSidebar = ({ isOpen, setIsOpen, user, signIn }) => {
    const navigate = useNavigate()
    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-4000 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 w-72 h-full bg-white z-50000 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-gray-600 hover:text-black"
                >
                    <X size={28} />
                </button>

                {/* Header */}
                <div className="bg-[#232f3e] text-white" style={{ padding: '15px' }} onClick={() => signIn()}>
                    {user ?
                        <div className="flex gap-[.5rem] items-center">
                            <span>Hello! {user.fullName}</span>
                            <UserButton />
                        </div>
                        :
                        <div className="flex gap-2 items-center" onClick={() => setIsOpen(false)}>
                            <User width={22} />
                            <span> Sign in </span>
                        </div>
                    }
                    <h2 className="text-xl font-bold" style={{ marginTop: "7.5px" }}>Browse Amazon</h2>
                </div>

                {/* Main Content */}
                <div style={{ padding: '15px' }}>
                    {/* Best Departments */}
                    <div style={{ marginBottom: "15px" }}>
                        <h3 className="font-bold text-gray-700 text-lg" style={{ marginBottom: '7.5px' }}>
                            Best Departments
                        </h3>
                        <ul className="space-y-3 text-gray-800 text-base">
                            <li
                                className="hover:bg-gray-100 rounded cursor-pointer"
                                style={{ marginBottom: "7.5px" }}
                                onClick={() => {
                                    setIsOpen(false)
                                    navigate('/products')
                                }}
                            >
                                Electronics
                            </li>
                            <li
                                className="hover:bg-gray-100 rounded cursor-pointer"
                                style={{ marginBottom: "7.5px" }}
                                onClick={() => {
                                    setIsOpen(false)
                                    navigate('/products')
                                }}
                            >
                                Mens Fashion
                            </li>
                            <li
                                className="hover:bg-gray-100 rounded cursor-pointer"
                                style={{ marginBottom: "7.5px" }}
                                onClick={() => {
                                    setIsOpen(false)
                                    navigate('/products')
                                }}
                            >
                                Women Fashion
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AmazonSidebar;
