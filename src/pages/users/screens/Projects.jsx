import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../utils/firebase/firebaseConfig'; // Adjust path as needed
import ProjectCard from '../../../components/ProjectCard';

const Projects = ({setWhatTabOpen}) => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Real-time listener
    const unsubscribe = onSnapshot(
      collection(db, 'projects'),
      (querySnapshot) => {
        const projectsData = querySnapshot.docs.map(doc => doc.data());
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
    <div className='w-full h-full bg-red-400 p-5'>
      <div>
        <h1>Project List</h1><br/>
        <div className='grid grid-cols-6 gap-x-2 gap-y-2'>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {projects.map((project, index) => (
            <ProjectCard
                editProject={setWhatTabOpen} 
              key={index}
              author={project.authorID}
              title={project.title}
              desc={project.desc}
              image={project.imageURL}
              projID={project.projectID}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
