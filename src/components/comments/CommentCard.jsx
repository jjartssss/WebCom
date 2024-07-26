import { addDoc, collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import { db } from '../../utils/firebase/firebaseConfig';
import ReplyCard from './ReplyCard';

const CommentCard = ({username, userID, userImage, comment, projectID, chapterID, commentID, updateParent}) => {

    const [reply, setReply ] = useState("");

    const [replies, setReplies] = useState([]);


    const AddReply = async (replyData) => {
        try {
            const commentRef = doc(db, "projects", projectID, "chapters", chapterID, "comments", commentID);
            const replyRef = collection(commentRef, 'replies');
            await addDoc(replyRef, replyData).then(
                alert("Added Reply"),
                setReply(""),
                updateParent(),
                console.log("Success adding reply")
            )
        } catch (error) {
            console.error("Error adding reply", error);
        }
    }

    const SubmitReply = (e) => {
    e.preventDefault();
    const replyData = {
        userID: 'test',
        username: 'test-username',
        userImage: 'test-username',
        comment: reply,
        likes: 0,
        dislikes: 0,
        createdAt: new Date(),
        // Add other fields as needed
    };
    AddReply(replyData);
  }

  const GetReplies = async () => {
    const commentsRef = doc(db, "projects", projectID, "chapters", chapterID, "comments", commentID);
    const repliesRef = collection(commentsRef, "replies");

    const q = query(repliesRef, orderBy("createdAt", "asc"));
    const repliesSnapshot = await getDocs(q);

    const repliesData = repliesSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    setReplies(repliesData);
    console.log(repliesData);

  }

  useEffect(() => {
    GetReplies();
  }, [])


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
        {/* Replies  */}
        <div className='flex flex-col gap-y-5 w-full h-fit pl-16 bg-red'>
            {
                replies.map((reply, index) => (
                    <ReplyCard key={index} userID={reply.userID} username={reply.username}
                        userImage={reply.userImage} comment={reply.comment}
                    ></ReplyCard>
                ))
            }
        </div>

        <div className='flex gap-x-2'>
            <textarea value={reply} onChange={(event) => setReply(event.target.value)} className='inp-def text-left' placeholder='Reply...'></textarea>
            <button onClick={SubmitReply} className='btn-pri w-[100px]'>REPLY</button>
        </div>
    </div>
  )
}

export default CommentCard