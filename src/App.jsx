import { useState } from 'react'
import './App.css'
import Home from './screens/Home'
import 'remixicon/fonts/remixicon.css'
import { Route, Routes } from 'react-router-dom'
import Shop from './screens/Shop'
import OrderComplete from './screens/OrderComplete'
import Checkout from './screens/Checkout'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/order-complete" element={<OrderComplete />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
      </Routes>
    </>
  )
}

export default App
