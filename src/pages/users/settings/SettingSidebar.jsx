import React from 'react'
import ButtonWithIcon from '../../../components/ButtonWithIcon'
import { TbActivity } from "react-icons/tb";
import { IoNotifications } from "react-icons/io5";
import { MdSecurity } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
const SettingSidebar = () => {

    const btns = [
        {btnName: 'Activities', callback: null, icon: <TbActivity></TbActivity>},
        {btnName: 'Security', callback: null, icon: <MdSecurity></MdSecurity>},
        {btnName: 'Notifications', callback: null, icon: <IoNotifications></IoNotifications>},
        {btnName: 'Profile', callback: null, icon: <CgProfile></CgProfile>},
    ]
    
    
  return (
    <div className='flex flex-col gap-y-5 p-5'>
        {
            btns.map((btn, index)=> (
                <ButtonWithIcon icon={btn.icon} callback={btn.callback} btnName={btn.btnName}></ButtonWithIcon>
            ))
        }
    </div>
  )
}

export default SettingSidebar