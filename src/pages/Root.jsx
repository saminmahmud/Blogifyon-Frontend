import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { ToastContainer } from "react-toastify";

const Root = () => {
  return (
    <div>
        <div className='min-h-[100vh] grid grid-rows-[auto_1fr_auto]'>
          <Navbar />
            <ToastContainer />
              <Outlet />
          <Footer />
        </div>
    </div>
  )
}

export default Root
