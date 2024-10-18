import React, { useState } from "react";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './PostGame.css';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD6QqmGEEy-uTUdIUFHC38mbtuv3kGMLoU',
  authDomain: 'school-9b924.firebaseapp.com',
  databaseURL: 'https://school-9b924-default-rtdb.firebaseio.com/',
  projectId: 'school-9b924',
  storageBucket: 'school-9b924.appspot.com',
  messagingSenderId: '612048409247'
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const PostGame = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [platform, setPlatform] = useState("");
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [description2, setDescription2] = useState("");
  const navigate = useNavigate();

  const handlePostGame = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "games"), {
        name,
        category,
        platform,
        rating,
        image_url: imageUrl,
        description,
        description2,
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  return (
    <div className="post-game container mx-auto py-10">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Post a New Game</h2>
        <form onSubmit={handlePostGame}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">Game Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="platform">Platform</label>
            <input
              type="text"
              id="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="rating">Rating</label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description2">Additional Description</label>
            <textarea
              id="description2"
              value={description2}
              onChange={(e) => setDescription2(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600">Post Game</button>
        </form>
      </div>
    </div>
  );
};

export default PostGame;
