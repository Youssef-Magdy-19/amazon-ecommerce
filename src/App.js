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
import CheckOut from "./components/CheckOut/CheckOut";
import SpecifCategory from "./components/SpecifCategory/SpecifCategory";
import SpecifBrand from "./components/SpecifBrand/SpecifBrand";
import OfflinePage from "./components/OfflinePage/OfflinePage";
import Login from "./components/Login/Login";
import { useEffect, useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MasterLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "products", element: <Products /> },
      { path: "profile", element: <Profile /> },
      { path: "details/:id", element: <Details /> },
      { path: "categories", element: <CategoriesBody /> },
      { path: "categories/:id", element: <SpecifCategory /> },
      { path: "checkout", element: <CheckOut /> },
      { path: "brands", element: <Brands /> },
      { path: "brands/:id", element: <SpecifBrand /> },
      { path: "allorders", element: <Allorders /> },
      { path: "login", element: <Login /> }, // ✅ أضفنا المسار هنا
      { path: "*", element: <Notfound /> },
      {path:"/login", element:<Login />}

    ],
  },
]);

function InternetDetector({ children }) {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <>
        <div className="network rounded-3 p-3 bg-danger text-white text-center">
          <i className="fas fa-wifi mx-2"></i>
          You are offline
        </div>
        <OfflinePage />
      </>
    );
  }

  return children;
}

function App() {
  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <InternetDetector>
            <RouterProvider router={router} />
            <ToastContainer theme="colored" autoClose={3000} />
          </InternetDetector>
        </CartContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
