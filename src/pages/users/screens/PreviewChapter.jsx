import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebase/firebaseConfig';
import { fetchChapterContents } from '../global/FetchChapterContent';

const PreviewChapter = ({ projectId, chapterId }) => {
    const [chapter, setChapter] = useState(null);
    const [error, setError] = useState('');

    

    useEffect(() => {
        const loadChapterData = async () => {
            try {
                const chapterData = await fetchChapterContents(projectId, chapterId);
                setChapter(chapterData);
            } catch (err) {
                console.error("Error fetching chapter details: ", err);
                setError("Failed to load chapter details.");
            }
        };

        loadChapterData();
    }, [projectId, chapterId]);

    return (
        <div className='w-full '>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
        </div>
    );
};

export default PreviewChapter;