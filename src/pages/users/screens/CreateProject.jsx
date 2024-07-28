import React, { useState } from 'react'
import ImageUpload from '../../../components/ImageUpload'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../utils/firebase/firebaseConfig';
import UploadMultipleImage from '../../../components/UploadMultipleImage';

const CreateProject = ({userID, closePopup}) => {

    const [coverPath, setCoverPath] = useState();
    const [inputs, setInputs] = useState({title: '', desc: ''});
    const SetImagePath = (path) => {
        setCoverPath(path);
        alert("Done saving cover image!");
    }

    const HandleInputs = (event) =>{ 
        const {name, value} = event.target;
        setInputs((prevInputs )=> ({
            ...prevInputs,
            [name]: value
        }));
    }

    const CreateProject = async (e) => {
        e.preventDefault();
        // Add a new document with a generated id.
        if (coverPath == null || coverPath === "") {
            alert("Select a cover image fist.")
        } else {
            const docRef = await addDoc(collection(db, "projects"), {
                authorID: userID,    
                title: inputs.title,
                desc: inputs.desc,
                imageURL: coverPath
            });
            // alert("Project Created!" + docRef.id);
            setInputs({title: '', desc: ''});
            closePopup();
        }
    }

  return (
    <div className='flex justify-center items-center fixed top-0 left-0 bg-black bg-opacity-20 w-full h-screen'>
        <div className='fixed w-[500px] h-fit p-5 bg-white rounded-lg'>
            <form onSubmit={CreateProject} className='flex flex-col gap-y-3'>
                <div className='w-full'><ImageUpload setPath={SetImagePath}></ImageUpload></div>
                {/* <div className='w-full'><UploadMultipleImage  setPath={S    etImagePath}></UploadMultipleImage></div> */}
                <input required name='title' value={inputs.title} onChange={HandleInputs} type='text' className='inp-def' placeholder='Comic Title'></input>
                <input required name='desc' value={inputs.desc} onChange={HandleInputs} type='text' className='inp-def' placeholder='Short Description'></input>
                <button type='submit' className='btn-pri'>CREATE PROJECT</button>
                <button type='button' onClick={closePopup} className='btn-pri bg-jt-dark'>CANCEL</button>
            </form>
        </div>
    </div>
  )
}

export default CreateProject