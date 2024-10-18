import React, { useState } from 'react';
import { auth, db } from './firebaseConfig'; // Import Firebase services
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './ChangeName.css';

const ChangeName = () => {
  const [newName, setNewName] = useState("");
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleUpdate = async () => {
    if (!newName) {
      setUpdateError('Please enter a new name.');
      return;
    }

    try {
      setUpdateError(null);
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        await updateDoc(userDoc, { name: newName });
        setUpdateSuccess(true);
      } else {
        setUpdateError('User is not logged in.');
      }
    } catch (error) {
      console.error('Error updating name:', error);
      setUpdateError('Failed to update name. Please try again later.');
    }
  };

  return (
    <div className="change-name-container">
      <h1 className="text-3xl font-bold mb-6">Change Name</h1>
      <input
        type="text"
        value={newName}
        onChange={handleChange}
        className="p-2 border rounded-lg w-full mb-4"
        placeholder="Enter your new name"
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-600"
      >
        Update Name
      </button>
      {updateError && <p className="text-red-500 mt-4">{updateError}</p>}
      {updateSuccess && <p className="text-green-500 mt-4">Name updated successfully!</p>}
      <button
        onClick={() => navigate('/dashboard')}
        className="bg-gray-500 text-white px-4 py-2 mt-6 rounded-lg hover:bg-gray-600"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ChangeName;
