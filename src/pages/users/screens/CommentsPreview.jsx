import React, { useEffect, useState } from 'react'
import CommentCard from '../../../components/comments/CommentCard'
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../../utils/firebase/firebaseConfig';

const CommentsPreview = ({projectID, chapterID}) => {
  const user = localStorage.getItem('user');
  const userData = JSON.parse(user);
  const [commentsList, setCommentsList] = useState([]);
  const [likedComments, setLikedComments] = useState([])
  const [comment, setComment ] = useState("");
  const [dblikedComments, setDBLikedComments] = useState([]);
  const [dbdislikedComments, setDBDislikedComments] = useState([]);
  const GetComments = async () => {
    try {
      const chapterRef = doc(db, "projects", projectID, "chapters", chapterID);
      const commentsRef = collection(chapterRef, 'comments');
      
      // Fetch comments ordered by createdAt
      const q = query(commentsRef, orderBy('createdAt', 'asc'));
      const commentSnapshot = await getDocs(q);
      const comments = commentSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      
      // Fetch activity log
      const activityLogRef = collection(db, "users", userData.userID, "activity");
      const activityLogSnapshot = await getDocs(activityLogRef);
      const activityLog = activityLogSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      
      // Check if comments are in the activity log
      const commentsInActivityLog = comments.filter(comment => 
        activityLog.some(log => log.commentID === comment.id)
      );
      const liked = activityLog.filter(log => log.type === 'like-comment');
      const disliked = activityLog.filter(log => log.type === 'dislike-comment');
      // Log the comments that are in the activity log
      setLikedComments(commentsInActivityLog);
      // Save liked and disliked comments to state
      setDBLikedComments(liked);
      setDBDislikedComments(disliked);
      // Set the comments list
      setCommentsList(comments);
      console.log(liked);
      console.log(disliked);
      
    } catch (error) {
      console.error("Error fetching comments: ", error);
      return [];
    }
  }

  useEffect(()=> {
    GetComments();
  },[projectID])

  
  const AddCommentToChapter = async (chapterData) => {
      try {
          const chaptersRef = doc(db, 'projects', projectID, 'chapters', chapterID);
          const commentRef = collection(chaptersRef, 'comments');
          await addDoc(commentRef, chapterData).then(
            setComment(""),
            console.log("Chapter added successfully!"),
            GetComments()
          );
      } catch (error) {
          console.error("Error adding chapter: ", error);
      }
  };

  const SubmitComment = (e) => {
    e.preventDefault();
    const chapterData = {
        userID: userData.userID,
        username: userData.username,
        userImage: userData.photoURL,
        comment: comment,
        likes: 0,
        dislikes: 0,
        createdAt: new Date(),
        // Add other fields as needed
    };
    AddCommentToChapter(chapterData);
  }


  return (
    <div className='w-full h-full  overflow-y-auto'>
      {/* HERE USER CAN COMMENT  */}
      <div className='w-full h-fit p-5'>
        <div className='flex gap-x-2'>
            <textarea value={comment} onChange={(event) => setComment(event.target.value)} className='resize-none inp-def text-left' placeholder='Add a comment'></textarea>
            <button onClick={SubmitComment} className='btn-pri w-[100px]'>DONE</button>
        </div>
      </div>
      {
        commentsList ? commentsList.map((comment, index) => 
        { 
          const isLiked = dblikedComments.some(likedComment => likedComment.commentID === comment.id);
          const isDisliked = dbdislikedComments.some(dislikedComment => dislikedComment.commentID === comment.id);
          console.log(`Liked? ${isLiked} Disliked? ${isDisliked}`)
          return (<CommentCard isDisliked={isDisliked} isLiked={isLiked} likes={comment.likes} dislikes={comment.dislikes} updateParent={() => GetComments()} projectID={projectID} chapterID={chapterID} commentID={comment.id}
            key={comment.id} userID={comment.userID} userImage={comment.userImage} username={comment.username} comment={comment.comment}></CommentCard>)  
        }
        ) : <p>No comments at the moment...</p>
      }
    </div>
  )
}

export default CommentsPreview