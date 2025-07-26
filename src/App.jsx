// import { useState } from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import PageNotFound from './Pages/PageNotFound'
import Products from './Pages/Products'
import ProductDetails from "./Pages/ProductDetails";
import Cart from './Pages/Cart'
import WishList from './Pages/WishList'
import Footer from './Components/Footer'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
