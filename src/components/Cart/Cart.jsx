import React, { useEffect, useState, useContext } from 'react'
import { cartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import style from './Cart.module.scss'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'

export default function Cart() {
  localStorage.removeItem('code')
  localStorage.removeItem('verifycode')

  const [data, setData] = useState([])
  const [cartPrice, setPrice] = useState(0)
  const [isLoading, setLoading] = useState(true)
  let { getCart, updateCart, deleteCart, setCartNumber, clearCart } = useContext(cartContext)

  useEffect(() => {
    (async () => {
      let data = await getCart()
      if (data?.status === 200) {
        setData(data.data.data.products)
        let cartNum = data.data.numOfCartItems
        if (cartNum === 0) cartNum = ''
        setCartNumber(cartNum)
        setPrice(data.data.data.totalCartPrice)
      }
      setLoading(false)
    })()
  }, [])

  async function removeProduct(id) {
    let data = await deleteCart(id)
    setData(data.data.data.products)
    let cartNum = data.data.numOfCartItems
    if (cartNum === 0) cartNum = ''
    setCartNumber(cartNum)
    setPrice(data.data.data.totalCartPrice)
    toast.error('Product removed from Shopping Cart')
  }

  async function clearProduct() {
    await clearCart()
    toast.error('Shopping Cart Empty')
    setData([])
    setCartNumber('')
    setPrice(0)
  }

  async function updateProduct(id, count) {
    if (count === 0) {
      removeProduct(id)
    } else {
      let data = await updateCart(id, count)
      setData(data.data.data.products)
      let cartNum = data.data.numOfCartItems
      if (cartNum === 0) cartNum = ''
      setCartNumber(cartNum)
      setPrice(data.data.data.totalCartPrice)
    }
  }

  return (
    <div className='container'>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name='description' content='Explore your shopping cart items, view discounts, and proceed to checkout. Shop now!' />
        <title>Shopping Cart</title>
      </Helmet>

      <h2 className='fw-bold my-4'>Shopping Cart</h2>

      {data.length > 0 &&
        <div className="text-end mb-3">
          <button onClick={clearProduct} className="btn btn-outline-danger me-3 fw-semibold">
            <i className='fa-regular fa-trash-can mx-2'></i>Clear Cart
          </button>
          <Link to="/checkout">
            <button className="btn btn-warning fw-semibold text-white">Proceed to Checkout</button>
          </Link>
        </div>
      }

      <div className="row">
        <div className="col-md-11 bg-light shadow-sm rounded-3 p-4 my-4 m-auto">
          {!isLoading ?
            <>
              <h4 className='mb-4'>
                <span className='fw-bold text-warning'>Total Price: </span>
                {cartPrice} <span className='text-muted'>EGP</span>
              </h4>

              {data.length === 0 ? (
                <h3 className='text-center mt-3'>Shopping Cart is Empty</h3>
              ) : (
                data.map((product) => (
                  <div className="row border-bottom py-4 align-items-center" key={product._id}>
                    <div className="col-md-2">
                      <img src={product.product.imageCover} className='w-100 rounded-2' alt="product" />
                    </div>
                    <div className="col-md-10 d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className='fw-bold'>{product.product.title}</h5>
                        <p className='text-warning fw-semibold'>{product.price} <span className='text-muted'>EGP</span></p>
                        <button onClick={() => removeProduct(product.product._id)} className="btn btn-outline-danger btn-sm">
                          <i className='fa-regular fa-trash-can me-1'></i>Remove
                        </button>
                      </div>
                      <div className='d-flex align-items-center'>
                        <button onClick={() => updateProduct(product.product._id, product.count + 1)} className="btn btn-warning text-white fw-bold px-2 py-1">+</button>
                        <span className='mx-3 fw-semibold'>{product.count}</span>
                        <button onClick={() => updateProduct(product.product._id, product.count - 1)} className="btn btn-warning text-white fw-bold px-2 py-1">-</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
            :
            <div className="vh-100 d-flex justify-content-center align-items-center">
              <Oval
                visible={true}
                height={80}
                width={80}
                color="#ff9900"
                ariaLabel="oval-loading"
              />
            </div>
          }
        </div>
      </div>
    </div>
  )
}
