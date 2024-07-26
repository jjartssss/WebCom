import { addDoc, collection, doc, getDoc, getDocs, increment, orderBy, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import { db } from '../../utils/firebase/firebaseConfig';
import ReplyCard from './ReplyCard';

const CommentCard = ({username,likes, dislikes,  userID, userImage, comment, projectID, chapterID, commentID}) => {

    const [reply, setReply ] = useState("");

    const [replies, setReplies] = useState([]);
    const [likeCount, setLikeCount ] = useState(likes);
    const [dislikeCount, setDislikeCount ] = useState(dislikes);
    const [alreadyLike, setAlreadyLike] = useState(false);
    const [alreadyDislike, setAlreadyDislike] = useState(false);

    const AddReply = async (replyData) => {
        try {
            const commentRef = doc(db, "projects", projectID, "chapters", chapterID, "comments", commentID);
            const replyRef = collection(commentRef, 'replies');
            await addDoc(replyRef, replyData).then(
                alert("Added Reply"),
                setReply(""),
                GetReplies(),
                console.log("Success adding reply")
            )
        } catch (error) {
            console.error("Error adding reply", error);
        }
    }

    const SubmitReply = (e) => {
    e.preventDefault();
    if (reply !== "") {
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

  const incrementLike = async () => {
        setLikeCount((prev) => prev = prev + 1);
        setAlreadyLike(true);
        try {
            const commentRef = doc(db, 'projects', projectID, 'chapters', chapterID, 'comments', commentID);
            await updateDoc(commentRef, {
            likes: increment(1)
            });
            console.log('Like incremented successfully!');
        } catch (error) {
            console.error('Error incrementing like: ', error);
        }
    };

    const incrementDisLike = async () => {
        setDislikeCount((prev) => prev = prev + 1);
        setAlreadyDislike(true);
        try {
            const commentRef = doc(db, 'projects', projectID, 'chapters', chapterID, 'comments', commentID);
            await updateDoc(commentRef, {
            dislikes: increment(1)
            });
            console.log('Like incremented successfully!');
        } catch (error) {
            console.error('Error incrementing like: ', error);
        }
    };

  return (
    <div className='flex flex-col gap-y-2 w-full h-auto p-5 bg-red'>
        <div className='flex gap-x-5 items-center'>
            <img src={userImage} className='w-[50px] h-[50px] rounded-full bg-black'/>
            <p>{username}</p>
        </div>
        <p>{comment}</p>
        {/* FOR REPLIES AND LIKES */}
        <div className='flex gap-x-5 w-full h-fit p-5 bg-white'>
            {
                alreadyLike || alreadyDislike ? 
                <>
                    {
                        alreadyLike ? 
                        <>
                            <p  className='flex text-2xl items-center gap-x-2'>{likeCount} <AiOutlineLike className='text-blue-500 '></AiOutlineLike></p>
                            <p  className='flex text-2xl items-center gap-x-2'>{dislikeCount} <AiOutlineDislike className='mt-2'></AiOutlineDislike></p>
                        </>
                        : alreadyDislike ? 
                        <>
                            <p  className='flex text-2xl items-center gap-x-2'>{likeCount} <AiOutlineLike className=' '></AiOutlineLike></p>
                            <p  className='flex text-2xl items-center gap-x-2'>{dislikeCount} <AiOutlineDislike className='text-red-500 mt-2'></AiOutlineDislike></p>
                        </>
                        : <></>
                    }
                </>
                :
                <>
                    <p  className='flex text-2xl items-center gap-x-2'>{likeCount} <AiOutlineLike onClick={()=> incrementLike()} className='hover:text-blue-500 duration-100 cursor-pointer'></AiOutlineLike></p>
                    <p  className='flex text-2xl items-center gap-x-2'>{dislikeCount} <AiOutlineDislike onClick={()=> incrementDisLike()} className='hover:text-red-500 duration-100 cursor-pointer mt-2'></AiOutlineDislike></p>
                </>
            }
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