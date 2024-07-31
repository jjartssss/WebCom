import React from 'react'
import Logo from '../../../assets/logo/png/logo-no-background.png'
const Navigation = () => {
  return (
    <div className='z-50 top-0 left-0 fixed flex justify-center items-center w-full h-[80px] bg-jt-primary-bright'>
        <div className='flex justify-center items-center w-full h-full max-w-[1200px]'>
            <img src={Logo} alt='WebCom Logo' className='w-[150px]' />
            <div className='w-full'>
                <ul className='flex justify-center gap-x-5 font1 text-white text-2xl'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Comics</li>
                    <li>Contact</li>
                </ul>
            </div>
            <button className='btn-pri w-fit font1'>LOGIN</button>
        </div>
    </div>
  )
}

export default Navigation