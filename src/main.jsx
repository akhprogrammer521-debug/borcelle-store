import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import ThemeProvider from './theme/ThemeProvider.jsx';
import AuthProvider from "./Providers/AuthProvider.jsx";
import CartProvider from './Providers/CartProvider.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
