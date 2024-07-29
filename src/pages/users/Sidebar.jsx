import React from 'react'

const Sidebar = ({userID, userImage, username, photoURL, newProj, dashboard, projects, settings}) => {
  return (
    <div className='p-5'>
        <div className='w-full bg-white mb-5 rounded-2xl p-5'>
            <div className='flex items-center'>
              <img src={userImage} className='mr-2 w-[50px] h-[50px] rounded-full' alt='User Profile Picture'/>
              <h3>{username}</h3> 
            </div>
        </div>
        {/* BUTTONS HERE  */}
        <div className='flex flex-col w-full h-full gap-y-3'>
            <button onClick={() => newProj()} className='hover:translate-x-[20px] duration-100 ease-in-out hover:bg-jt-primary-bright hover:border-transparent
             btn-pri bg-transparent font1 border-2 border-white'>NEW PROJECT</button>
            <button className='hover:translate-x-[20px] duration-100 ease-in-out hover:bg-jt-primary-bright hover:border-transparent
             btn-pri bg-transparent font1 border-2 border-white'>DASHBOARD</button>
            <button onClick={() => projects()} className='hover:translate-x-[20px] duration-100 ease-in-out hover:bg-jt-primary-bright hover:border-transparent btn-pri bg-transparent font1 border-2 border-white'>PROJECTS</button>
            <button onClick={() => settings()} className='hover:translate-x-[20px] duration-100 ease-in-out hover:bg-jt-primary-bright hover:border-transparent btn-pri  bg-transparent font1 border-2 border-white'>SETTINGS</button>
        </div>
    </div>
  )
}

export default Sidebar