import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../utils/firebase/firebaseConfig';
import ProjectCard from '../../../components/ProjectCard';
import ProjectCoverCard from '../components/ProjectCoverCard';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import BG from '../../../assets/imgs/bg2.jpg'

const About = () => {
    const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Real-time listener
    const q = collection(db, 'projects'); // , where("authorID", '==', userID)
    const unsubscribe = onSnapshot(q,
      (querySnapshot) => {
        const projectsData = querySnapshot.docs.map(doc =>( {id:doc.id, ...doc.data()}));
        setProjects(projectsData);
      },
      (err) => {
        console.error("Error fetching projects: ", err);
        setError("Failed to load projects.");
      }
    );

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className='flex justify-center  w-full h-screen bg-white'>
          <img src={BG} className='absolute bg-black opacity-50  w-full h-full object-cover object-center'/>
          <div className='z-10 rounded-2xl -mt-32 w-[90%] max-w-[1500px] h-fit p-5 overflow-x-hidden bg-jt-primary-bright'>
            <Carousel  stopOnHover={true} centerMode={true} autoPlay={true} infiniteLoop={true} interval={3000} swipeable={true}>
                {
                    projects.map((project, index) => (
                        <ProjectCoverCard key={index} image={project.imageURL} projectID={project.id} ></ProjectCoverCard>
                    ))
                }
            </Carousel>
            {/* <div className=' flex gap-x-5'>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {
                    projects.map((project, index) => (
                        <ProjectCoverCard key={index} image={project.imageURL} projectID={project.projectID} ></ProjectCoverCard>
                    ))
                }
            </div> */}
        </div>
    </div>
  )
}

export default About