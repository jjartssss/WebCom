import React, { useEffect } from 'react'
import logoSVG  from '../assets/logo/png/logo-black.png';
import { Bars } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
const LoadingPage = () => {
    const navigate = useNavigate();
    useEffect(()=> {
        const timer = setTimeout(() => {
            navigate('/webcom');
        }, 2000);
    },[])

  return (
    <div className='w-full h-screen bg-white flex flex-col justify-center items-center'>
        <img src={logoSVG} className='w-[10%] min-w-[350px]'/>
        <Bars
            height="80"
            width="80"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            color='#000000'
            wrapperClass="mt-5"
            visible={true}
        />
    </div>
  )
}

export default LoadingPage