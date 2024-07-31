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
      const uploadPromises = images.map((image, index) => {
        const imageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(imageRef, image);

        return new Promise((resolve, reject) => {
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
              reject(error);
            },
            async () => {
              // Complete function
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve({ index, url: downloadURL });
              } catch (error) {
                console.error("Error getting download URL:", error);
                setErrors(prev => {
                  const newErrors = [...prev];
                  newErrors[index] = "Failed to retrieve the image URL.";
                  return newErrors;
                });
                reject(error);
              }
            }
          );
        });
      });

      Promise.all(uploadPromises)
        .then(results => {
          // Sort results by index to ensure the correct order
          const sortedResults = results.sort((a, b) => a.index - b.index);
          const sortedUrls = sortedResults.map(result => result.url);
          setUrls(sortedUrls);
          return saveUrlsToChapter(sortedUrls, projectId, chapterId);
        })
        .then(() => closePopup(false))
        .catch((error) => {
          console.error("Error uploading images:", error);
          setErrors(["Failed to upload images. Please try again."]);
        });
    } else {
      setErrors(["No images selected. Please choose images to upload."]);
    }
  };

  const saveUrlsToChapter = async (urls, projectId, chapterId) => {
    const chapterRef = doc(db, 'projects', projectId, 'chapters', chapterId);
    const chapterSnap = await getDoc(chapterRef);

    if (chapterSnap.exists()) {
      try {
        await updateDoc(chapterRef, {
          imageUrls: arrayUnion(...urls)
        });
      } catch (error) {
        console.error("Error updating chapter with image URLs:", error);
        setErrors(prev => [...prev, "Failed to save image URLs to chapter."]);
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
      <div className='grid grid-cols-2 overflow-y-auto'>
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
    </div>
  );
};

export default UploadMultipleImage;
