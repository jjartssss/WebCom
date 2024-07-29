import React from 'react'
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const ProjectCard = ({title, desc, author, image, editProject, projID}) => {
  const navigate = useNavigate();

  const PreviewProject = () => {
    navigate(`/user/project/${projID}`);
  }

  return (
    <div className='flex justify-center items-center flex-col bg-white rounded-xl p-5 hover:scale-105 duration-75 ease-in-out drop-shadow-2xl'>
        <div className='w-full flex items-end justify-between'>
            {/* <h3 className='text-2xl' >{author}</h3> */}
            <span></span>
            <FaEdit onClick={()=> editProject(projID)} className='cursor-pointer text-red-600 text-3xl' />
        </div>
        <img src={image} className='w-[250px]' alt={title} />
        <h3 className='text-2xl' >{title}</h3>
        <h3 className='text-base' >{desc}</h3>
        
        <button onClick={() => PreviewProject()} className='btn-pri'>PREVIEW</button>
    </div>
  )
}

export default ProjectCard