import React from 'react'
import Header from '../components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'

const HeaderAndFooter = () => {
  return (
    <>
        <Header/>
        <div className='content' style={{minHeight:'700px'}}>
            <Outlet></Outlet>
        </div>
        <Footer/>
    </>
  )
}

export default HeaderAndFooter