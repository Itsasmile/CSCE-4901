import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import './ChangeProfile.css';
import { auth, db, storage } from './firebaseConfig'; // Import Firebase services

const ChangeProfile = () => {
  const [image, setImage] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setUploadError('Please select an image to upload.');
      return;
    }

    try {
      setUploadError(null);
      const user = auth.currentUser;
      if (user) {
        const storageRef = ref(storage, `avatars/${user.uid}/${image.name}`);
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        setUploadSuccess(true);
        console.log('File available at', downloadURL);
      } else {
        setUploadError('User is not logged in.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError('Failed to upload image. Please try again later.');
    }
  };

  return (
    <div className="change-profile-container">
      <h1 className="text-3xl font-bold mb-6">Change Profile Picture</h1>
      <input type="file" onChange={handleImageChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-600"
      >
        Upload
      </button>
      {uploadError && <p className="text-red-500 mt-4">{uploadError}</p>}
      {uploadSuccess && <p className="text-green-500 mt-4">Profile picture updated successfully!</p>}
      <button
        onClick={() => navigate('/dashboard')}
        className="bg-gray-500 text-white px-4 py-2 mt-6 rounded-lg hover:bg-gray-600"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ChangeProfile;
