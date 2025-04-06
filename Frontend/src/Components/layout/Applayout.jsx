import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../UI/Header/Header'
import Footer from '../UI/Footer/Footer'

const Applayout = () => {
  return (
    <>
  <Header/>
  <Outlet/>
  <Footer/>
   </>
  )
}

export default Applayout
