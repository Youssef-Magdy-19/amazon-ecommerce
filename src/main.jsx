import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext'
import { ClerkProvider } from '@clerk/clerk-react'
import { CartProvider } from "./context/CartContext";  



// Import your Publishable Key
// @ts-ignore
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <StrictMode>
      <CartProvider>
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </CartProvider>
      </StrictMode>
    </ClerkProvider>
  </BrowserRouter>
)