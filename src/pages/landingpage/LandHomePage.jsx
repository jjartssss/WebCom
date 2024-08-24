import React from 'react'
import Navigation from './components/Navigation'
import BG from '../../assets/imgs/bg.jpg'
import About from './sections/About'
import Recomendation from './sections/Recomendation'
const LandHomePage = () => {
  return (
    <div className='w-full h-screen bg-jt-dark'>
        <Navigation></Navigation>
        <img src={BG} className=' bg-black opacity-50 top-0 left-0 w-full h-1/2 object-cover object-center' />
        <About></About>
        <Recomendation></Recomendation>
    </div>
  )
}

export default LandHomePage