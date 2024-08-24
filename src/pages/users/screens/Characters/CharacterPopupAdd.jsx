import React from 'react'

const CharacterPopupAdd = (closePoup) => {
  return (
    <div className="fixed top-0 left-0 flex justify-center 
    items-center bg-black bg-opacity-30 w-full h-screen">
        <div className='flex flex-row justify-center items-center w-[80%] h-[80%] p-5 bg-white rounded-xl'>
            <div className='flex flex-col w-[30%] h-full p-5 gap-y-5'>
                <img className='w-full h-[50%] min-h-[400px] bg-emerald-400' />
                <input className='inp-def text-left' placeholder='Character Name'/>
                <textarea className='inp-def text-left h-full' placeholder='Description'></textarea>
            </div>
            <div className='w-[70%] h-full bg-blue-400'></div>
        </div>
    </div>
  )
}

export default CharacterPopupAdd