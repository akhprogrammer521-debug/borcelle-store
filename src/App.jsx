import { Routes, Route } from 'react-router';
import { useTranslation } from "react-i18next";

import HomePage from './Pages/Home/HomePage';
import Verification from './Pages/Auth/Verification'
import Signup from './Pages/Auth/Signup';
import Login from './Pages/Auth/Login';
import Payment from './Pages/Payment/Payment';

import Profile from './Pages/Proflie/Profile';
import TermCondition from './Pages/Proflie/components/TermCondition';
import ContactUs from './Pages/Proflie/components/ContactUs';
import PrivacyPolicy from './Pages/Proflie/components/PrivacyPolicy';
import Address from './Pages/Proflie/components/Address';
import Favorite from './Pages/Proflie/components/Favorite';
import Orders from './Pages/Proflie/components/Orders';
import MyProducts from './Pages/Proflie/components/MyProducts';

import Products from './Pages/Products/Products';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Cart from './Pages/Cart/Cart';
import AdminRoutes from './admin/routes/AdminRoutes';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const { i18n } = useTranslation();

  const direction = i18n.language?.startsWith("ar") ? "rtl" : "ltr";

  return (
    <div dir={direction} className={direction}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='login' element={<Login />} />
        <Route path='/verification' element={<Verification />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/register' element={<Signup />} />

        <Route path='profile' element={<Profile />} />
        <Route path='/profile/term&condition' element={<TermCondition />} />
        <Route path='/profile/contact-us' element={<ContactUs />} />
        <Route path='/profile/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/profile/address' element={<Address />} />
        <Route path='/profile/favorite' element={<Favorite />} />
        <Route path='/profile/orders' element={<Orders />} />
        <Route path='/profile/myProducts' element={<MyProducts />} />

        <Route path='/products' element={<Products />} />
        <Route path="/products/:pID" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </div>
  );
};

export default App
