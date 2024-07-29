import React from 'react'

const ButtonWithIcon = ({icon, btnName, callback}) => {
  return (
    <button onClick={()=> callback()} className=' hover:translate-x-[-20px] duration-100 ease-in-out
    flex flex-row gap-x-3 text-2xl justify-start items-center btn-pri font1'>{icon} {btnName}</button>
  )
}

export default ButtonWithIcon