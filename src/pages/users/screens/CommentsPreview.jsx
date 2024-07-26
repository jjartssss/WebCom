import React, { useEffect, useState } from 'react'
import CommentCard from '../../../components/comments/CommentCard'
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../../utils/firebase/firebaseConfig';

const CommentsPreview = ({projectID, chapterID}) => {
  
  const [commentsList, setCommentsList] = useState([]);

  const [comment, setComment ] = useState("");

  const GetComments = async () =>{
      try {
        const chapterRef = doc(db, "projects", projectID, "chapters", chapterID);
        const commentsRef = collection(chapterRef, 'comments');
        // const commentSnapshot = await getDocs(commentsRef);
        // const comments = commentSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        const q = query(commentsRef, orderBy('createdAt', 'asc'));
        const commentSnapshot = await getDocs(q);
        const comments = commentSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setCommentsList(comments)
        console.log(comments);
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
        userID: 'test',
        username: 'test-username',
        userImage: 'test-username',
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
          (<CommentCard likes={comment.likes} dislikes={comment.dislikes} updateParent={() => GetComments()} projectID={projectID} chapterID={chapterID} commentID={comment.id}
            key={comment.id} userID={comment.userID} userImage={comment.userImage} username={comment.username} comment={comment.comment}></CommentCard>)  
        ) : <p>No comments at the moment...</p>
      }
    </div>
  )
}

export default CommentsPreview