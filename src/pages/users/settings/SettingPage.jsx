import React, { useState } from 'react'
import SettingSidebar from './SettingSidebar'
import ActivityLogPage from './screens/ActivityLogPage';

const SettingPage = () => {

    const [settingOpenTab, setSettingOpenTab] = useState("Activities");

  return (
    <div className='flex flex-row w-full h-screen bg-indigo-700'>
        {/* MAIN CONTAINER */}
        <div className='col w-[80%] bg-white'>
            {
                settingOpenTab === "Activities" ?
                <ActivityLogPage></ActivityLogPage> :
                <></>
            }
        </div>

        {/* SIDEBAR  */}
        <div className='w-[20%] bg-jt-dark'>
            <SettingSidebar></SettingSidebar>
        </div>
    </div>
  )
}

export default SettingPage