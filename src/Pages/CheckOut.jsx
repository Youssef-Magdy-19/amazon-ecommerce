// src/components/CheckOut/CheckOut.js

import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { cartContext } from '../../context/CartContext';

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [cashLoading, setCashLoading] = useState(false);
  const [error, setError] = useState('');
  const { cartId, setCartNumber } = useContext(cartContext);
  const navigate = useNavigate();

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
    localStorage.removeItem('localCart');
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
    localStorage.removeItem('localCart');
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
        <title>Checkout</title>
      </Helmet>
      <h2 className="text-main text-center mb-4">Checkout</h2>
      <form onSubmit={formik.handleSubmit} className="w-75 mx-auto">
        <div className="mb-3">
          <label htmlFor="city">City</label>
          <input
            id="city"
            className="form-control"
            {...formik.getFieldProps('city')}
          />
          {formik.touched.city && formik.errors.city && (
            <small className="text-danger">{formik.errors.city}</small>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            className="form-control"
            {...formik.getFieldProps('phone')}
          />
          {formik.touched.phone && formik.errors.phone && (
            <small className="text-danger">{formik.errors.phone}</small>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="details">Details</label>
          <textarea
            id="details"
            className="form-control"
            {...formik.getFieldProps('details')}
          ></textarea>
          {formik.touched.details && formik.errors.details && (
            <small className="text-danger">{formik.errors.details}</small>
          )}
        </div>

        {error && <p className="text-danger text-center">{error}</p>}

        <div className="text-center mt-4">
          <button
            type="submit"
            className="btn bg-main text-white mx-2"
            disabled={loading || !(formik.isValid && formik.dirty)}
          >
            {loading ? 'Processing...' : 'Pay Online'}
          </button>

          <button
            type="button"
            className="btn btn-secondary mx-2"
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
