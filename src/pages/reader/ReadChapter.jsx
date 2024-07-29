import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchChapterContents } from '../users/global/FetchChapterContent';
import CommentsPreview from '../users/screens/CommentsPreview';

const ReadChapter = () => {
    const { projectID, chapterID } = useParams();
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    const userData = JSON.parse(user);
    const [chapter, setChapter] = useState(null);
    const [error, setError] = useState('');

    

    useEffect(() => {
        const loadChapterData = async () => {
            try {
                const chapterData = await fetchChapterContents(projectID, chapterID);
                setChapter(chapterData);
            } catch (err) {
                console.error("Error fetching chapter details: ", err);
                setError("Failed to load chapter details.");
            }
        };

        loadChapterData();
    }, [projectID, chapterID]);

  return (
    <div className='flex justify-center p-5 md:p-32 items-center w-full h-screen bg-jt-dark'>
      {/* <h1>Project ID: {projectID}</h1> */}
      <div className='flex flex-col p-5 gap-y-2 w-[100%] md:w-1/2 h-full bg-jt-white rounded-2xl'>
            
            <div className='w-full h-full overflow-y-auto'>
                {chapter ? (
                    <div className='w-full h-fit p-5'>
                        {/* <p>{chapter.imageUrls}</p> */}
                            {chapter.imageUrls && chapter.imageUrls.length > 0 ? (
                                chapter.imageUrls.map((url, index) => (
                                    <img key={index} src={url} alt={`${index}`} className='w-full object-cover h-full' />
                                ))
                            ) : (
                                <p>No images available for this chapter.</p>
                            )}
                    </div>
                ) : (
                    <p>Loading chapter details...</p>
                )}
                {
                    user ? <div>
                        <CommentsPreview chapterID={chapterID} projectID={projectID}></CommentsPreview>
                    </div> : 
                    
                    <div className='w-full h-fit'>
                        <p>You need an account to read and write comments.</p>
                    </div> 
                }
            </div>
    </div>    
    </div>
  )
}

export default ReadChapter