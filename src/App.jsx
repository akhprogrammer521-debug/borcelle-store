import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from 'react-router';

import HomePage from './Pages/Home/HomePage';
import Verification from './Pages/Auth/Verification'
import Signup from './Pages/Auth/Signup';
import Login from './Pages/Auth/Login';
import Payment from './Pages/Payment/Payment';

import './App.css';
import Profile from './Pages/Proflie/Profile';
import TermCondition from './Pages/Proflie/components/TermCondition';
import ContactUs from './Pages/Proflie/components/ContactUs';
import Products from './Pages/Products/Products';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Cart from './Pages/Cart/Cart';
const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='login' element={<Login />} />
                <Route path='/verification' element={<Verification />} />
                <Route path='/payment' element={<Payment />} />
                <Route path='/register' element={<Signup />} />

                <Route path='profile' element={<Profile />} />
                <Route path='/profile/term&condition' element={<TermCondition />} />
                <Route path='/profile/contact-us' element={<ContactUs />} />

                <Route path='/products' element={<Products />} />
                <Route path="/products/:pID" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </>
    )
}

export default App
