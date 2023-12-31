import './App.css'
import Home from './screens/Home'
import 'remixicon/fonts/remixicon.css'
import { Route, Routes } from 'react-router-dom'
import Shop from './screens/Shop'
import OrderComplete from './screens/OrderComplete'
import Checkout from './screens/Checkout'
import Cart from './screens/Cart'
import Login from './screens/Auth/Login'
import ForgotPassword from './screens/Auth/ForgotPassword'
import VerifyIdentity from './screens/Auth/VerifyIdentity'
import SecurityCode from './screens/Auth/SecurityCode'
import CreateAccount from './screens/Auth/CreateAccount'
import Payment from './screens/Payment'
import ProductDetails from './screens/ProductDetails'
import EmailVerification from './screens/Auth/EmailVerification'
import ResetPassword from './screens/Auth/ResetPassword'
import GuestRoutes from './protectedRoutes/GuestRoutes'
import AuthenticatedRoutes from './protectedRoutes/AuthenticatedRoutes'
import Account from './screens/Account'
import PageNotFound from './screens/404'
import Wishlist from './screens/Wishlist'
import AdminIndex from './screens/admin/AdminIndex'
import AdminLayout from './protectedRoutes/AdminRoutes'
import Logout from './screens/admin/pages/Logout'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shop/:categoryType" element={<Shop />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="/product-details/:slug" element={<ProductDetails />}></Route>
        <Route path="/logout" element={<Logout />} />
        {/* <Route path="*" element={<PageNotFound />}></Route> */}
        
        <Route element={<GuestRoutes />}>
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/auth/create-account" element={<CreateAccount />}></Route>
          <Route path="/auth/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/auth/reset-password" element={<ResetPassword />}></Route>
          <Route path="/auth/verify-identity" element={<VerifyIdentity />}></Route>
          <Route path="/auth/security-code" element={<SecurityCode />}></Route>
          <Route path="/auth/email-verification" element={<EmailVerification />}></Route>
        </Route>

        <Route element={<AuthenticatedRoutes />}>
          <Route path="/order-complete/:txRef" element={<OrderComplete />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/my-account" element={<Account />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
        </Route>


        <Route element={<AdminLayout />}>
        <Route path='/*' element={<AdminIndex />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
