import React from 'react'
import CharacterListCard from './CharacterListCard'
import { IoIosClose } from "react-icons/io";
import CharacterPopupAdd from './CharacterPopupAdd';

const CharactersPopup = ({closePopup}) => {
  return (
    <div className='flex justify-center p-12 items-center fixed left-0 top-0 bg-black bg-opacity-40 w-full h-screen'>
            <div className='flex w-full gap-x-2 h-full p-5 bg-jt-white'>
            <IoIosClose onClick={() => closePopup(false)} className='z-40 cursor-pointer hover:rotate-180 duration-500 ease-in-out absolute font-thin text-4xl right-16 top-16'></IoIosClose>
            {/* SIDEBAR  */}
            <div className='w-[20%] border-2'>
                <div className='h-[10%] flex gap-x-5 p-5'>
                    <input className='inp-def' placeholder='Search Character'/>
                    <button className='btn-pri w-fit' >ADD</button>
                </div>
                {/* Characters Container  */}
                <div className='flex flex-col w-full gap-y-2 h-[90%]  p-5 overflow-y-auto'>
                    <CharacterListCard></CharacterListCard>
                    <CharacterListCard></CharacterListCard>
                    <CharacterListCard></CharacterListCard>
                    <CharacterListCard></CharacterListCard>
                    <CharacterListCard></CharacterListCard>
                    <CharacterListCard></CharacterListCard>
                    <CharacterListCard></CharacterListCard>
                    <CharacterListCard></CharacterListCard>
                    <CharacterListCard></CharacterListCard>
                </div>
            </div>

            {/* MAIN CONTAINER  */}
            <div className='w-[80%] border-2'>

            </div>
            
        </div>
        <CharacterPopupAdd></CharacterPopupAdd>
    </div>
  )
}

export default CharactersPopup