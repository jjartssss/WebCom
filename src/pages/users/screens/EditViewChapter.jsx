import React, { useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../utils/firebase/firebaseConfig';
import UploadMultipleImage from '../../../components/UploadMultipleImage';
import PreviewChapter from './PreviewChapter';
import CommentsPreview from './CommentsPreview';

const EditViewChapter = ({projectId, chapterId}) => {
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [chapters, setChapters] = useState([]);
    const [popupAddImage, setPopupAddImage] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const chapterRef = doc(db, 'projects', projectId, 'chapters', chapterId);

    const unsubscribe = onSnapshot(chapterRef, (chapterSnap) => {
      if (chapterSnap.exists()) {
        setChapter(chapterSnap.data());
        setError(null);
      } else {
        setError('Chapter not found');
      }
      setLoading(false);
    }, (err) => {
      console.error('Error fetching chapter:', err);
      setError('Failed to load chapter.');
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [projectId, chapterId]);


  if (loading) return <p>Loading chapter...</p>;
  if (error) return <p>{error}</p>;


  return (
    <div className='flex h-screen flex-col justify-center items-center'>
      <div className='w-full flex justify-end'>
          <button onClick={() => setPopupAddImage(true)} className='btn-pri w-[200px]'>ADD CONTENT</button>
      </div>
      <h1>{chapter.title}</h1>
      <p>{chapter.content}</p>
      {/* Add more chapter details as needed */}
      {/* IMAGE HERE  */}
      <div className='grid grid-cols-2 w-full h-screen '>
        <div className='col-span-1 overflow-y-auto  mb-32'>
          <PreviewChapter key={chapterId} chapterId={chapterId} projectId={projectId}></PreviewChapter>
          
        </div>
        <div className='col-span-1 shadow-2xl overflow-y-auto mb-32 shadow-black'>
          <CommentsPreview key={chapterId} projectID={projectId} chapterID={chapterId}></CommentsPreview>
        </div>
      </div>
        {
            popupAddImage ? 
            <div className='fixed top-0 left-0 bg-black bg-opacity-50 justify-center items-center flex w-full h-screen'>
                <div className='p-5 bg-white'>
                    <UploadMultipleImage projectId={projectId} closePopup={() => setPopupAddImage(false)} chapterId={chapterId}></UploadMultipleImage>
                </div>
            </div> : <></>
        }
    </div>
  );
};

export default EditViewChapter;
