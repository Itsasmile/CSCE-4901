import { ReactNode, useContext, useState } from "react";
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "@/context/AuthContext";
import { getStorage } from "firebase/storage"; // Import Firebase services
import './ChangeProfile.css';


export default function ChangeProfile(): ReactNode {
  const [image, setImage] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const storage = getStorage();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
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
      if (user) {
        // Reference to the user's avatar folder
        const userImagesRef = ref(storage, `avatars/${user.uid}`);
        const listResponse = await listAll(userImagesRef);

        // Delete previous avatar if exists
        if (listResponse.items.length > 0) {
          const previousImageRef = listResponse.items[0];
          await deleteObject(previousImageRef);
        }

        // Upload new avatar
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
    
    <div className="change-profile-container max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold mb-6">Change Profile Picture</h1>
      <input type="file" onChange={handleImageChange} className="mt-4 p-2 border rounded-lg w-full" />
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
}
