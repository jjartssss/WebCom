import React from 'react'
const CharacterListCard = () => {
  return (
    <div className='hover:bg-jt-primary-bright hover:text-white cursor-pointer duration-200 ease-in-out
     flex justify-start gap-x-2 items-center w-full h-fit p-5 border-2'>
        <img className='w-[50px] h-[50px] bg-jt-primary-bright rounded-full'/>
        <h2 className='font2-reg text-xl'>Character Name</h2>
    </div>
  )
}

export default CharacterListCard