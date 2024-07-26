// ImageUpload.js
import React, { useState } from 'react';
import { db, storage } from '../utils/firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';

const UploadMultipleImage = ({ setPath, chapterId, closePopup, projectId, updateParent }) => {    
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [progresses, setProgresses] = useState([]);
  const [urls, setUrls] = useState([]);
  const [errors, setErrors] = useState([]);



  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);

    // Create preview URLs for the selected images
    const previewUrls = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(previewUrls);
    setProgresses(new Array(selectedFiles.length).fill(0));
    setErrors(new Array(selectedFiles.length).fill(''));
  };

  const handleUpload = () => {
  if (images.length > 0) {
    images.forEach((image, index) => {
      const imageRef = ref(storage, `images/${image.name}`);
      
      // Use uploadBytesResumable for progress tracking
      const uploadTask = uploadBytesResumable(imageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgresses(prev => {
            const newProgresses = [...prev];
            newProgresses[index] = progress;
            return newProgresses;
          });
        },
        (error) => {
          // Error function
          console.error("Upload Error:", error);
          setErrors(prev => {
            const newErrors = [...prev];
            newErrors[index] = "Failed to upload image. Please try again.";
            return newErrors;
          });
        },
        async () => {
          // Complete function
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUrls(prev => [...prev, downloadURL]);
            await saveUrlToChapter(downloadURL, projectId, chapterId).then(() => closePopup(false));
          } catch (error) {
            console.error("Error getting download URL:", error);
            setErrors(prev => {
              const newErrors = [...prev];
              newErrors[index] = "Failed to retrieve the image URL.";
              return newErrors;
            });
          }
        }
      );
    });
  } else {
    setErrors(["No images selected. Please choose images to upload."]);
  }
};

  const saveUrlToChapter = async (url, projectId, chapterId) => {
  const chapterRef = doc(db, 'projects', projectId, 'chapters', chapterId);
  const chapterSnap = await getDoc(chapterRef);

  if (chapterSnap.exists()) {
    try {
      await updateDoc(chapterRef, {
        imageUrls: arrayUnion(url)
      });
    } catch (error) {
      console.error("Error updating chapter with image URL:", error);
      setErrors(prev => [...prev, "Failed to save image URL to chapter."]);
    }
  } else {
    console.error("No such document!");
    setErrors(prev => [...prev, "Chapter document does not exist."]);
  }
};


  

  return (
    <div className='flex h-[400px] items-center justify-center flex-col gap-y-3'>
      <input type="file" className='pb-5' multiple onChange={handleChange} /> 
      <button type="button" className='btn-pri' onClick={handleUpload}>Confirm Images</button>
      <button type="button" className='btn-pri' onClick={() => closePopup(false)}>CANCEL</button>
      <div className=' grid grid-cols-2 overflow-y-auto'>
        {/* {errors.map((error, index) => error && <p key={index} style={{ color: 'red' }}>{error}</p>)} */}
        <div className='grid'>
            {previews.map((preview, index) => (
                <img key={index} src={preview} alt="Preview" className='w-[100px] object-center object-cover' />
            ))}
        </div>
        {progresses.some(progress => progress > 0) && (
        <div>
          {progresses.map((progress, index) => (
            <div key={index}>
              <progress value={progress} max="100" style={{ width: '100%', marginTop: '10px' }} />
              <p>{progress}%</p>
            </div>
          ))}
        </div>
      )}  
      </div>
      
      
      {/* {urls.map((url, index) => (
        <img key={index} src={url} alt="Uploaded" style={{ width: '300px', height: 'auto' }} />
      ))} */}

    </div>
  );
};

export default UploadMultipleImage;
