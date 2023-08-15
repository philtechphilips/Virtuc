import { useState } from 'react'
import './App.css'
import Home from './screens/Home'
import 'remixicon/fonts/remixicon.css'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  )
}

export default App
