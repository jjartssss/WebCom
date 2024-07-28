import React from 'react'

const Sidebar = ({userID, username, photoURL, newProj, dashboard, projects, settings}) => {
  return (
    <div className='p-5'>
        <div className='w-full bg-white mb-5'>
            <h3>{username}</h3>
            <h3>{userID}</h3>
        </div>
        {/* BUTTONS HERE  */}
        <div className='flex flex-col w-full h-full gap-y-3'>
            <button onClick={() => newProj()} className='btn-pri bg-jt-primary-dark'>NEW PROJECT</button>
            <button className='btn-pri bg-jt-primary-dark'>DASHBOARD</button>
            <button onClick={() => projects()} className='btn-pri bg-jt-primary-dark'>PROJECTS</button>
            <button className='btn-pri bg-jt-primary-dark'>SETTINGS</button>
        </div>
    </div>
  )
}

export default Sidebar