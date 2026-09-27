import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import ThemeProvider from './theme/ThemeProvider.jsx';
import AuthProvider from "./Providers/AuthProvider.jsx";
import CartProvider from './Providers/CartProvider.jsx';
import FavProvider from './Providers/FavouriteProvider.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <FavProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </FavProvider>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
