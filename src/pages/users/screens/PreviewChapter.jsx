import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebase/firebaseConfig';

const PreviewChapter = ({ projectId, chapterId }) => {
    const [chapter, setChapter] = useState(null);
    const [error, setError] = useState('');

    const fetchChapter = async (projectId, chapterId) => {
    try {
        const chapterRef = doc(db, 'projects', projectId, 'chapters', chapterId);
        const chapterSnap = await getDoc(chapterRef);

        if (chapterSnap.exists()) {
            return chapterSnap.data();
        } else {
            throw new Error("No such document!");
        }
    } catch (error) {
        console.error("Error fetching chapter: ", error);
        throw error;
    }
};

    useEffect(() => {
        const loadChapterData = async () => {
            try {
                const chapterData = await fetchChapter(projectId, chapterId);
                setChapter(chapterData);
            } catch (err) {
                console.error("Error fetching chapter details: ", err);
                setError("Failed to load chapter details.");
            }
        };

        loadChapterData();
    }, [projectId, chapterId]);

    return (
        <div className='w-full px-96 h-1/2'>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {chapter ? (
                <div className='w-full h-fit p-5'>
                    {/* <p>{chapter.imageUrls}</p> */}
                        {chapter.imageUrls && chapter.imageUrls.length > 0 ? (
                            chapter.imageUrls.map((url, index) => (
                                <img key={index} src={url} alt={`Image ${index}`} className='w-full object-cover h-full' />
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