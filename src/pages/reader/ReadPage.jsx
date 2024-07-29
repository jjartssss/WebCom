import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchChapters } from '../users/global/FetchChapters';

const ReadPage = () => {
    const { projectID } = useParams();
    const navigate = useNavigate();
    const [chapterTitle, setChapterTitle] = useState('');
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
    }, [])

    const GoToChapter = (chapterID) => {
        navigate(`/user/project/${projectID}/chapter/${chapterID}`);
    }

  return (
    <div className='flex justify-center p-32 items-center w-full h-screen bg-jt-dark'>
      {/* <h1>Project ID: {projectID}</h1> */}
      <div className='flex flex-col p-5 gap-y-2 w-1/2 h-full bg-jt-white rounded-2xl'>
            {
                chapters.length > 0 ? 
                    chapters.map((chapter, index) => (
                        <button onClick={()=> GoToChapter(chapter.id)} key={index} className='hover:bg-jt-primary-bright 
                        duration-150 ease-in-out hover:font-bold font2-reg border-2 hover:text-jt-white
                        hover:scale-[102%] bg-transparent text-jt-dark btn-pri'>{chapter.title}</button>
                    ))
                : <p>No chapters at the moment...</p>
            }
        </div>    
    </div>
  )
}

export default ReadPage
