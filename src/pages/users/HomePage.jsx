import React, { useEffect, useState } from 'react'
import UserNavigation from './UserNavigation'
import Sidebar from './Sidebar'
import CreateProject from './screens/CreateProject'
import Projects from './screens/Projects'
import EditProject from './screens/EditProject'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    const userData = JSON.parse(user);
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

    
    
    useEffect(() =>{
        // localStorage.removeItem('user')
        if (!user) {
        navigate('/login');
    }
    },)

  return (
    <div className='fixed w-full h-screen bg-jt-white'>
        <UserNavigation></UserNavigation>
        <div className='grid grid-cols-10 w-full h-full'>
            <div className='hidden md:block col-span-1  bg-white'>
                <Sidebar userID={userData.userID} username={userData.username} photoURL={userData.photoURL} newProj={() => showCreateProject()}
                    dashboard={() => setWhatTabOpen("Dashboard")} 
                    projects={() => setWhatTabOpen("Projects")}></Sidebar>
            </div>
            <div className='col-span-10 md:col-span-9 bg-green-50'>
                {/* <Projects></Projects> */}
                {
                    whatTabOpen === "Projects" ? <Projects userID={userData.userID} setWhatTabOpen={EditProjects}></Projects> :
                    whatTabOpen === "EditProject" ? <EditProject projectID={editProject}></EditProject> : <></>
                }
            </div>
        </div>
        {
            showCreateProj ? <CreateProject userID={userData.userID} closePopup={showCreateProject}></CreateProject> : <></>
        }
    </div>
  )
}

export default HomePage