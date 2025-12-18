import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <NavBar/>
       {/* any child routes of Home will be rendered here */}
      <Outlet/> 
      <Footer/>
    </>
  )
}

export default Home
