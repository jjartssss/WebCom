import React from 'react'

const ProjectCoverCard = ({image, projectID}) => {

    const OpenPreviewSite = () => {
        window.open(`https://webcom-endp.onrender.com/user/project/${projectID}`, "_blank");
    }

  return (
    <div className='group min-w-[400px] rounded-2xl w-full mr-5'>
        {/* THIS SHOULD BE PROJECT'S BANNER   */}
        <img  src={image} alt='Cover Image' className='
         rounded-2xl w-full h-[450px] object-cover'/>
         <button onClick={()=> OpenPreviewSite()} className='relative -top-20 w-[200px] font1 rounded-lg btn-pri'>VIEW</button>
    </div>
  )
}

export default ProjectCoverCard