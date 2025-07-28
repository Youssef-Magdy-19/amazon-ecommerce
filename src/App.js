import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MasterLayout from "./components/MasterLayout/MasterLayout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import Notfound from "./components/Notfound/Notfound";
import UserContextProvider from "./context/TokenContext";
import Details from "./components/Details/Details";
import CartContextProvider from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import Allorders from "./components/Allorders/Allorders";
import Profile from "./components/Profile/Profile";
import CategoriesBody from "./components/CategoriesBody/CategoriesBody";
import SpecifCategory from "./components/SpecifCategory/SpecifCategory";
import SpecifBrand from "./components/SpecifBrand/SpecifBrand";
import { Offline, Online } from "react-detect-offline";
import OfflinePage from "./components/OfflinePage/OfflinePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MasterLayout />,
    children: [
      {
        path: "",
        element: (
          
            <Home />
          
        ),
      },
      {
        path: "home",
        element: (
          
            <Home />
          
        ),
      },
      {
        path: "cart",
        element: (
          
            <Cart />
          
        ),
      },
      {
        path: "products",
        element: (
          
            <Products />
          
        ),
      },
      {
        path: "profile",
        element: (
            <Profile />
        ),
      },
      {
        path: "details/:id",
        element: (
            <Details />
        ),
      },

      {
        path: "categories",
        element: (
          
            <CategoriesBody />
          
        ),
      },
      {
        path: "categories/:id",
        element: (
          
            <SpecifCategory />
          
        ),
      },
      {
        path: "brands",
        element: (
          
            <Brands />
          
        ),
      },
      {
        path: "brands/:id",
        element: (
          
            <SpecifBrand />
          
        ),
      },
      {
        path: "allorders",
        element: (
          
            <Allorders />
          
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <Online>
          <CartContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <ToastContainer theme="colored" autoClose={3000} />
          </CartContextProvider>
        </Online>
      </UserContextProvider>

      <Offline>
        <div className="network rounded-3">
          <i className="fas fa-wifi mx-3"></i>
          you are offline
        </div>
        <OfflinePage />
      </Offline>
    </>
  );
}

export default App;
