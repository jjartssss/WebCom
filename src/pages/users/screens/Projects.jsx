import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../utils/firebase/firebaseConfig'; // Adjust path as needed
import ProjectCard from '../../../components/ProjectCard';

const Projects = ({userID, setWhatTabOpen}) => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Real-time listener
    const q = query (collection(db, 'projects'), where("authorID", '==', userID));
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
    <div className='w-full h-screen overflow-y-scroll '>
      <div className='sticky flex top-0 w-full h-fit p-3 items-center justify-center '>
          <h1 className='font1 text-jt-primary-light'>Project's</h1><br/>
        </div>
      
      <div className='p-5 mb-32'>
        
        <div className=' grid grid-cols-1 md:grid-cols-6 md:gap-x-2 gap-y-5 md:gap-y-2 '>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {projects.map((project, index) => (
            <ProjectCard
                editProject={setWhatTabOpen} 
              key={index}
              author={project.authorID}
              title={project.title}
              desc={project.desc}
              image={project.imageURL}
              projID={project.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
