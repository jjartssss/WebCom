import React from 'react'

const ProjectCoverCard = ({image, projectID}) => {

    const OpenPreviewSite = () => {
        window.open(`https://webcom-endp.onrender.com/user/project/${projectID}`, "_blank");
    }

  return (
    <div className='group flex flex-col bg-jt-white
     justify-center items-center min-w-[250px] rounded-2xl w-full mr-5'>
        {/* THIS SHOULD BE PROJECT'S BANNER   */}
        <img  src={image} alt='Cover Image' className='
         rounded-2xl w-full h-full object-cover'/>
         <button onClick={()=> OpenPreviewSite()} className='relative -mt-12 w-[200px] font1 rounded-lg btn-pri'>VIEW</button>
    </div>
  )
}

export default ProjectCoverCard