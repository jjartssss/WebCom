import { addDoc, collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import { db } from '../../utils/firebase/firebaseConfig';

const ReplyCard = ({username, userID, userImage, comment}) => {

  return (
    <div className='flex flex-col gap-y-2 w-full h-auto p-5 bg-red'>
        <div className='flex gap-x-5 items-center'>
            <img src={userImage} className='w-[50px] h-[50px] rounded-full bg-black'/>
            <p>{username}</p>
        </div>
        <p>{comment}</p>
        {/* FOR REPLIES AND LIKES */}
        <div className='flex gap-x-5 w-full h-fit p-5 bg-white'>
            <p className='flex text-2xl items-center gap-x-2'>0 <AiOutlineLike></AiOutlineLike></p>
            <p className='flex text-2xl items-center gap-x-2'>0 <AiOutlineDislike className='mt-2'></AiOutlineDislike></p>
        </div>
    </div>
  )
}

export default ReplyCard