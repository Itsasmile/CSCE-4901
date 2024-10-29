import React, { useEffect, useState } from "react";
import './Dashboard.css';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from './firebaseConfig'; // Import Firebase services
import Dropdown from 'react-bootstrap/Dropdown';

const Dashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [games, setGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("https://via.placeholder.com/40");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Add selectedCategory here
  const gamesPerPage = 6;
  const navigate = useNavigate();

  function BasicExample({ selectedCategory, handleSelect }) {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedCategory}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleSelect("name")}>Name</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSelect("category")}>Category</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSelect("platform")}>Platform</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSelect("accessibility")}>Accessibility</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchUserName(currentUser.uid);
        await fetchUserAvatar(currentUser.uid);
      }
    });
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const gamesCollection = collection(db, 'games'); // Reference to 'games' collection 
      const gamesSnapshot = await getDocs(gamesCollection); // Get all documents from 'games' 
      const gamesList = gamesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGames(gamesList);
      setAllGames(gamesList);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const fetchUserName = async (uid) => {
    try {
      const userDoc = doc(db, 'users', uid);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        setUserName(userSnapshot.data().name);
      }
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
  };

  const fetchUserAvatar = async (uid) => {
    try {
      const userImagesRef = ref(storage, `avatars/${uid}`);
      const listResponse = await listAll(userImagesRef);
      if (listResponse.items.length > 0) {
        const recentImageRef = listResponse.items[listResponse.items.length - 1];
        const avatarUrl = await getDownloadURL(recentImageRef);
        setUserAvatar(avatarUrl);
      }
    } catch (error) {
      console.error("Error fetching user avatar:", error);
    }
  };

  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm?.toLowerCase() || "";

    const filteredGames = allGames.filter(game => {
      if (selectedCategory === "name") {
        return game.name.toLowerCase().includes(lowerCaseSearchTerm);
      } else if (selectedCategory === "category") {
        return game.category.toLowerCase().includes(lowerCaseSearchTerm);
      } else if (selectedCategory === "platform") {
        return game.platform.toLowerCase().includes(lowerCaseSearchTerm);
      } else if (selectedCategory === "accessibility" && game.accessibility) {
        return game.accessibility.toLowerCase().includes(lowerCaseSearchTerm);
      }
      return false;
    });

    setGames(filteredGames);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleSearch();
  }, [selectedCategory]); // Change from searchCategory to selectedCategory

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Pagination Logic
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);
  const totalPages = Math.ceil(games.length / gamesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="header bg-blue-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="logo">
            <img src="https://firebasestorage.googleapis.com/v0/b/school-9b924.appspot.com/o/logowithoutbg.png?alt=media&token=7dbbe48b-289c-49b4-9102-aaab09d8b028" alt="Website Logo" className="w-12 h-12 rounded-full border border-white" />
          </div>
          <h1 className="text-3xl font-bold">CoolTeamUNT</h1>
          <nav className="flex space-x-4">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Software</a>
            <a href="#" className="hover:underline">Games</a>
            <a href="#" className="hover:underline">Movies</a>
            <a href="#" className="hover:underline">Forum</a>
            <a href="#" className="hover:underline">FAQs</a>
          </nav>
          <div className="flex space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <img src={userAvatar} alt="User Avatar" className="rounded-full" style={{ width: '40px', height: '40px' }} />
                <div>
                  <div className="relative">
                    <p className="font-bold cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>{userName || user.email}</p>
                    {showDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                        <button className="block w-full text-left px-4 py-2 hover:bg-blue-100 text-blue-900" onClick={() => navigate('/change-profile')}>Change Profile Picture</button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-blue-100 text-blue-900" onClick={() => navigate('/change-name')}>Change Name</button>
                      </div>
                    )}
                  </div>
                  <button className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-200" onClick={() => navigate('/post')}>Create Post</button>
                  <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Log out</button>
                </div>
              </div>
            ) : (
              <>
                <button className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-200" onClick={() => navigate('/login')}>Đăng nhập</button>
                <button className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-200" onClick={() => navigate('/register')}>Đăng ký</button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="search-section bg-blue-300 py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">We share what we love</h2>
          <p className="italic mb-6">"NOTHING IS ABSOLUTE, NOTHING IS FOREVER, NOTHING FROM NOTHING"</p>
          <div className="flex justify-center items-center space-x-2">
            <BasicExample selectedCategory={selectedCategory} handleSelect={handleSelectCategory} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/2 p-2 rounded-l-lg border-none"
              placeholder="What are you looking for? (Name, category, platform)"
            />
            <button className="bg-blue-600 text-white p-2 rounded-r-lg" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="main-content container mx-auto py-10">
  <div className="flex flex-wrap justify-between">
    {currentGames.map((game) => (
      <div key={game.id} className="w-1/3 p-4">
        <div className="game-card bg-gray-100 p-6 rounded-lg shadow-md">
          <img 
            src={game.image_url} 
            alt={game.name} 
            className="mb-4 cursor-pointer" 
            onClick={() => navigate(`/game/${game.id}`)} 
            style={{ width: '100%', height: '200px', objectFit: 'cover' }} // Updated style for uniform image size
          />
          <h3 className="text-xl font-bold">{game.name}</h3>
          <p className="text-gray-700 mb-2">Category: {game.category}</p>
          <p className="text-gray-700 mb-2">Platform: {game.platform}</p>
          <p className="text-gray-700 mb-2">Rating: {game.rating}</p>
          <p className="text-gray-600">{game.description}</p>
        </div>
      </div>
    ))}
  </div>
  {/* Pagination Controls */}
  <div className="pagination flex justify-center mt-8">
    {[...Array(totalPages).keys()].map(number => (
      <button
        key={number + 1}
        onClick={() => paginate(number + 1)}
        className={`px-4 py-2 mx-1 ${currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} rounded-lg border`}
      >
        {number + 1}
      </button>
    ))}
  </div>
</div>
    </div>
  );
};

export default Dashboard;
