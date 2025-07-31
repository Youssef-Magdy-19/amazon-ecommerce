// src/components/CheckOut/CheckOut.js

import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { useCart } from '../context/CartContext';
import { GlobalContext } from '../context/GlobalContext';

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [cashLoading, setCashLoading] = useState(false);
  const [error, setError] = useState('');
  const { cartId, setCartNumber } = useCart();
  const navigate = useNavigate();
  const {removeAllProductFromCart} = useContext(GlobalContext)

  const validationSchema = Yup.object({
    city: Yup.string().min(3).max(20).required('City is required'),
    phone: Yup.string()
      .required('Phone is required')
      .matches(/^01[0125][0-9]{8}$/, 'Invalid phone'),
    details: Yup.string().min(5).required('Details are required'),
  });

  const formik = useFormik({
    initialValues: { city: '', phone: '', details: '' },
    validationSchema,
    onSubmit: handleOnlinePayment,
  });

  // ✅ دفع أونلاين وهمي
  function handleOnlinePayment(values) {
    if (!cartId) {
      setError('Cart ID not found. Please refresh your cart.');
      return;
    }

    setLoading(true);

    // تخزين الطلب في localStorage
    const previousOrders = JSON.parse(localStorage.getItem('fakeOrders') || '[]');
    const newOrder = {
      cartId,
      shippingAddress: values,
      type: 'online',
      date: new Date().toLocaleString(),
    };
    localStorage.setItem('fakeOrders', JSON.stringify([...previousOrders, newOrder]));

    // تنظيف الكارت
    localStorage.removeItem('cartList');
    setCartNumber(0);

    toast.success('Online payment (mock) successful');

    setTimeout(() => {
      navigate('/order-success');
    }, 1500);

    setLoading(false);
  }

  // ✅ دفع كاش وهمي
  function handleCashPayment() {
    if (!cartId) {
      setError('Cart ID not found. Please refresh your cart.');
      return;
    }

    setCashLoading(true);

    const previousOrders = JSON.parse(localStorage.getItem('fakeOrders') || '[]');
    const newOrder = {
      cartId,
      shippingAddress: formik.values,
      type: 'cash',
      date: new Date().toLocaleString(),
    };
    localStorage.setItem('fakeOrders', JSON.stringify([...previousOrders, newOrder]));

    // تنظيف الكارت
    removeAllProductFromCart()
    setCartNumber(0);

    toast.success('Cash order (mock) placed');

    setTimeout(() => {
      navigate('/order-success');
    }, 1500);

    setCashLoading(false);
  }

  return (
    <div className="container my-5">
      <Helmet>
        <title className='font-semibold text-2xl md:text-3xl'>Checkout</title>
      </Helmet>
      <h2 className="font-semibold text-2xl md:text-3xl text-center mb-4">Checkout</h2>
      <form onSubmit={formik.handleSubmit} className="w-75 mx-auto">
        <div className="mb-3 flex flex-col gap-[0.25rem]">
          <label className='text-gray-800' htmlFor="city">City</label>
          <input
            id="city"
            className="form-control rounded border border-gray-200 py-[3px] outline-none px-[10px]"
            {...formik.getFieldProps('city')}
          />
          {formik.touched.city && formik.errors.city && (
            <small className="text-red-500">{formik.errors.city}</small>
          )}
        </div>

        <div className="mb-3 flex flex-col gap-[0.25rem]">
          <label className='text-gray-800' htmlFor="phone">Phone</label>
          <input
            id="phone"
            className="form-control rounded border border-gray-200 py-[3px] outline-none px-[10px]"
            {...formik.getFieldProps('phone')}
          />
          {formik.touched.phone && formik.errors.phone && (
            <small className="text-red-500">{formik.errors.phone}</small>
          )}
        </div>

        <div className="mb-3 flex flex-col gap-[0.25rem]">
          <label className='text-gray-800' htmlFor="details">Details</label>
          <textarea
            id="details"
            rows={5}
            className="form-control rounded border border-gray-200 outline-none py-[3px] px-[10px]"
            {...formik.getFieldProps('details')}
          ></textarea>
          {formik.touched.details && formik.errors.details && (
            <small className="text-red-500">{formik.errors.details}</small>
          )}
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white mx-2 rounded-full py-[5px] px-[20px]"
            disabled={loading || !(formik.isValid && formik.dirty)}
          >
            {loading ? 'Processing...' : 'Pay Online'}
          </button>

          <button
            type="button"
            className="bg-white hover:bg-gray-100 border border-gray-800 mx-2 rounded-full py-[5px] px-[20px]"
            onClick={handleCashPayment}
            disabled={cashLoading || !(formik.isValid && formik.dirty)}
          >
            {cashLoading ? 'Processing...' : 'Pay Cash'}
          </button>
        </div>
      </form>
    </div>
  );
}
