import React, { useState } from 'react'
import UserNavigation from './UserNavigation'
import Sidebar from './Sidebar'
import CreateProject from './screens/CreateProject'
import Projects from './screens/Projects'
import EditProject from './screens/EditProject'

const HomePage = () => {

    const [showCreateProj, setShowCreateProj] = useState(false);
    const [editProject, setEditProject] = useState();
    const [whatTabOpen, setWhatTabOpen] = useState("Projects");

    const showCreateProject = () => {
        setShowCreateProj((prev) => prev = !prev);
    }

    const EditProjects = (projectID) => {
        if (whatTabOpen !== "EditProject") {
            setWhatTabOpen("EditProject");
            setEditProject(projectID);
            alert(projectID);
        }
    }


  return (
    <div className='fixed w-full h-screen bg-jt-white'>
        <UserNavigation></UserNavigation>
        <div className='grid grid-cols-10 w-full h-full'>
            <div className='col-span-1  bg-white'>
                <Sidebar newProj={() => showCreateProject()}
                    dashboard={() => setWhatTabOpen("Dashboard")} 
                    projects={() => setWhatTabOpen("Projects")}></Sidebar>
            </div>
            <div className='col-span-9 bg-green-50'>
                {/* <Projects></Projects> */}
                {
                    whatTabOpen === "Projects" ? <Projects setWhatTabOpen={EditProjects}></Projects> :
                    whatTabOpen === "EditProject" ? <EditProject projectID={editProject}></EditProject> : <></>
                }
            </div>
        </div>
        {
            showCreateProj ? <CreateProject closePopup={showCreateProject}></CreateProject> : <></>
        }
    </div>
  )
}

export default HomePage