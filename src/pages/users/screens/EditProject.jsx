import { addDoc, collection, doc, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../utils/firebase/firebaseConfig';
import EditViewChapter from './EditViewChapter';

const EditProject = ({projectID}) => {
    const [chapterTitle, setChapterTitle] = useState('');
    const [chapterContent, setChapterContent] = useState('');
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    const [popupChapter , setPopupChapter ] = useState(false);

    const [chapterID, setChapterID] = useState();

    const addChapterToProject = async (projectId, chapterData) => {
        try {
            const projectRef = doc(db, 'projects', projectId);
            const chaptersRef = collection(projectRef, 'chapters');
            await addDoc(chaptersRef, chapterData);
            console.log("Chapter added successfully!");
        } catch (error) {
            console.error("Error adding chapter: ", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const chapterData = {
            title: chapterTitle,
            content: chapterContent,
            createdAt: new Date(),
            // Add other fields as needed
        };
        await addChapterToProject(projectID, chapterData).then(
            setPopupChapter(false),
            getChapters()
        );
    };


    const fetchChapters = async (projectId) => {
        const projectRef = doc(db, 'projects', projectId);
        const chaptersRef = collection(projectRef, 'chapters');

        // Create a query to order by a specific field, e.g., "createdAt"
        const q = query(chaptersRef, orderBy('createdAt', 'asc'));

        const querySnapshot = await getDocs(q);

        const chapters = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return chapters;
    };

    const getChapters = async () => {
        try {
            const chaptersData = await fetchChapters(projectID);
            setChapters(chaptersData);
            console.log(chaptersData)
            console.log("oks ba");
            setLoading(false);
        } catch (err) {
            console.error("Error fetching chapters: ", err);
            setError("Failed to load chapters.");
            setLoading(false);
        }
    };
    useEffect(() => {
    
    getChapters();
  }, []);

  if (loading) return <p>Loading chapters...</p>;
//   if (error) return <p>{error}</p>;

  return (
    <div className='w-full h-screen '>
        <div className='w-full h-screen grid grid-rows-5 grid-cols-1 md:grid-cols-5'>
            <div className='row-span-1  md:mb-0 md:col-span-1 bg-blue-300'>
                <div className=' w-full flex justify-end'>   
                    <button onClick={() => setPopupChapter(true)} className='btn-pri'>NEW CHAPTER</button>
                </div>

                {
                    projectID ? <p>{projectID}</p> : <></>
                }
                <center><h1>Chapters</h1></center>
                <ul className='flex h-full pb-32 flex-col gap-y-3 p-3 overflow-y-auto'>
                    {chapters.map((chapter, index) => (
                    <button onClick={()=> setChapterID(chapter.id)} key={index} className='btn-pri bg-jt-dark' >{chapter.title}</button>
                    ))}
                </ul>
            </div>
            {/* MAIN VIEW  */}
            <div className='row-auto md:col-span-4 bg-jt-white'>
                {
                    chapterID ? <EditViewChapter chapterId={chapterID} projectId={projectID}></EditViewChapter> :
                    <p>Select a chapter to view.</p>
                }
            </div>
        </div>
        {
            popupChapter === true ? 
            <div className='flex justify-center items-center top-0 left-0 fixed bg-black bg-opacity-50 w-full h-screen'>
                <div className='p-5 bg-white'>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-y-3'>
                        <input
                            className='inp-def'
                            type="text"
                            value={chapterTitle}
                            onChange={(e) => setChapterTitle(e.target.value)}
                            placeholder="Chapter Title"
                        />
                        <textarea
                            className='inp-def'
                            value={chapterContent}
                            onChange={(e) => setChapterContent(e.target.value)}
                            placeholder="Chapter Content"
                        />
                        <button className='btn-pri' type="submit">Add Chapter</button>
                        <button onClick={(prev) => setPopupChapter(prev = !prev)} className='btn-pri bg-red-800' type="button">CANCEL</button>
                    </form>
                </div>
            </div> :<></>
        }
    </div>
  )
}

export default EditProject