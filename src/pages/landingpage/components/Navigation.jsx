import React from 'react'
import Logo from '../../../assets/logo/png/logo-no-background.png'
import { useNavigate } from 'react-router-dom'
const Navigation = () => {

  const navigate = useNavigate();
  const user = localStorage.getItem('user')

  return (
    <div className='z-50 top-0 left-0 fixed flex justify-center items-center w-full h-[80px] bg-jt-primary-bright'>
        <div className='flex justify-between px-10 md:px-0 md:justify-center items-center w-full h-full max-w-[1200px]'>
            <img src={Logo} alt='WebCom Logo' className='w-[150px]' />
            <div className='hidden md:block w-full'>
                <ul className='flex justify-center gap-x-5 font1 text-white text-2xl'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Comics</li>
                    <li>Contact</li>
                </ul>
            </div>
            {
              user ? <button onClick={() => navigate('/user')} className='btn-pri w-fit font1'>DASHBOARD</button>
              : <button onClick={() => navigate('/login')} className='btn-pri w-fit font1'>LOGIN</button>
            }
        </div>
    </div>
  )
}

export default Navigation