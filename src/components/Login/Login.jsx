import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    const fakeToken = 'fake-token';

    // حفظ التوكن
    localStorage.setItem('userToken', fakeToken);

    // إشعار نجاح
    toast.success('✅ Logged in successfully!');

    // إعادة التوجيه للصفحة الرئيسية
    navigate('/');
  }

  return (
    <div className="container text-center my-5">
      <h2 className="mb-4">Login (Mock)</h2>
      <button
        onClick={handleLogin}
        className="btn btn-success px-5 py-2 fs-5"
      >
        Login
      </button>
    </div>
  );
}
