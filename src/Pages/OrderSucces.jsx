import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function OrderSuccess() {
    const navigate = useNavigate()
    return (
        <div className="container flex items-center justify-center min-h-[80vh]">
            <Helmet>
                <title>Order Success</title>
            </Helmet>

            <div className="text-center p-5 rounded shadow-lg" style={{ backgroundColor: '#f8f9fa', maxWidth: '600px' }}>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                    alt="Success"
                    className='w-[100px] mb-[20px] mx-auto'
                />
                <h2 className="text-green-600 text-2xl md:text-3xl font-semibold mb-3">Order Confirmed!</h2>
                <p className="fs-5 text-muted mb-4">
                    Thank you for your purchase 🛒 <br />
                    Your order has been placed successfully and is being processed.
                </p>

                <button
                    className="bg-green-700 hover:bg-green-800 text-white rounded px-4 py-1"
                    onClick={() => navigate('/')}
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    );
}