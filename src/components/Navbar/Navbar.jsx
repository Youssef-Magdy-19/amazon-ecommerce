import React, { useContext } from 'react';
import logo from '../../assets/img/Amazon_CS_01_Intro_00_Thumbnail.jpg';
import { Link, NavLink } from 'react-router-dom';
import { userContext } from '../../context/TokenContext';
import { cartContext } from '../../context/CartContext';
import './Navbar.css'; // تأكد أنه موجود

export default function Navbar() {
  const { userToken, setToken } = useContext(userContext);
  const { cartNumber } = useContext(cartContext);

  function logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    setToken(null);
  }

  return (
    <nav className="navbar navbar-expand-lg position-fixed z-3 w-100 start-0 top-0 Nav-Bar-Cus">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="logo" className='Logo-Custom' />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'} to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'} to="products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'} to="brands">Brands</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'} to="categories">Categories</NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item position-relative me-3">
              <NavLink className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'} to="cart">
                <i className="bi bi-cart4 fs-5"></i>
                {userToken && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main">
                    {cartNumber}
                  </span>
                )}
              </NavLink>
            </li>

            {userToken === null ? (
              <>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'} to="signup">Register</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'} to="signin">Login</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'} to="wishlist">
                    <i className="fa-regular fa-heart fs-5"></i>
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'} to="profile">
                    <i className="fa-regular fa-user fs-5"></i>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <Link className="nav-link loghover" onClick={logOut}>
                    Logout <i className="fa-solid fa-arrow-right-from-bracket ms-2"></i>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
