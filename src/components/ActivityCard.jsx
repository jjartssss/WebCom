import React from 'react'
import { format, parse } from 'date-fns';
const ActivityCard = ({type, id, comment, dateTime}) => {

    
  
  return (
    <div className='hover:bg-jt-primary-bright hover:text-white duration-100 ease-in-out
        flex justify-between items-center
        w-full h-fit p-5 border-2 rounded-2xl'>
        {
            type === "like" ?
            <p>You liked this comment {id}</p> :
            type === "dislike" ?
            <p>You disliked this comment {id}</p> :
            type === "comment" ?
            <p>{comment}</p> : 
            <></>
        }
        <button className='btn-pri w-1/6 rounded-xl bg-jt-dark'>Delete</button>
    </div>
  )
}

export default ActivityCard