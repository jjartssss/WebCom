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
            <button onClick={() => newProj()} className='btn-pri bg-transparent font1 border-2 border-white'>NEW PROJECT</button>
            <button className='btn-pri bg-transparent font1 border-2 border-white'>DASHBOARD</button>
            <button onClick={() => projects()} className='btn-pri bg-transparent font1 border-2 border-white'>PROJECTS</button>
            <button className='btn-pri  bg-transparent font1 border-2 border-white'>SETTINGS</button>
        </div>
    </div>
  )
}

export default Sidebar