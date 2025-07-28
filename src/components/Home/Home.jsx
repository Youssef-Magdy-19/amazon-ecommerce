import Products from '../Products/Products';
import Categories from '../Categories/Categories';
import HomeSlider from '../HomeSlider/HomeSlider';
import style from './Home.module.scss'
import { jwtDecode } from 'jwt-decode';
import InformationHome from './../InformationHome/InformationHome';
import GroceryShop from '../GroceryShop/GroceryShop';
import { Helmet } from 'react-helmet';

export default function Home() {
  localStorage.removeItem('code');
  localStorage.removeItem('verifycode');

  let getUserToken = localStorage.getItem("userToken");

  if (getUserToken && typeof getUserToken === "string") {
    try {
      let { id } = jwtDecode(getUserToken);
      localStorage.setItem('userId', id);
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem('userToken'); 
    }
  }

  return (
    <div>
      <HomeSlider/>
      <h2 className='mt-5'>Shop Popular Categories</h2>
      <Categories/>
      <h2 className={`${style.mt6}`}>Popular Products </h2>
      <Products/>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name='description' content='Explore FreshCart for farm-fresh produce, groceries, and more. Shop now for quality ingredients!' />
        <title>Fresh Cart - eCommerce</title>
      </Helmet>
      <GroceryShop/>
      <InformationHome/>
    </div>
  )
}
