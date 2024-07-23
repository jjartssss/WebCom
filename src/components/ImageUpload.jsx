// ImageUpload.js
import React, { useState } from 'react';
import { storage } from '../utils/firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const ImageUpload = ({setPath}) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);

      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(selectedImage);
      setImagePreview(previewUrl);
    }
  };

  const handleUpload = () => {
    if (image) {
      const imageRef = ref(storage, `images/${image.name}`); // Create a reference to the file
      
      // Use uploadBytesResumable for progress tracking
      const uploadTask = uploadBytesResumable(imageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          // Error function
          console.error("Upload Error:", error);
          setError("Failed to upload image. Please try again.");
        },
        () => {
          // Complete function
          getDownloadURL(imageRef).then((downloadURL) => {
            setUrl(downloadURL);
            setImage(null);
            setImagePreview(''); // Clear preview after upload
            setProgress(0);
            setPath(downloadURL);
          }).catch((error) => {
            console.error("Error getting download URL:", error);
            setError("Failed to retrieve the image URL.");
          });
        }
      );
    } else {
      setError("No image selected. Please choose an image to upload.");
    }
  };

  return (
    <div className='flex items-center justify-center flex-col gap-y-3'>
      <input type="file" onChange={handleChange} />
      <button type="button" className='btn-pri' onClick={handleUpload}>Confirm Image</button>
      {progress > 0 && (
        <div>
          <progress value={progress} max="100" style={{ width: '100%', marginTop: '10px' }} />
          <p>{progress}%</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imagePreview && <img src={imagePreview} alt="Preview" className='w-full object-center object-cover' />}
      {url && <img src={url} alt="Uploaded" style={{ width: '300px', height: 'auto' }} />}
    </div>
  );
};

export default ImageUpload;
