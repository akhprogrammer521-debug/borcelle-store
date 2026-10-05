import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import './i18n/i18n.js'
import './index.css'
import App from './App.jsx'
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
