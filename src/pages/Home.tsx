import React, { useEffect, useState, useRef, ReactNode, useContext } from "react";
import './Home.css';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from './firebaseConfig'; // Import Firebase services
import Dropdown from 'react-bootstrap/Dropdown';
import { AuthContext } from "context/AuthContext";

interface State {
  allGames: string[];
  currentPage: number;
  selectedCategory: string;
  searchTerm: string;
}

function Home(): ReactNode {
  const user = useContext(AuthContext);
  const [state, setState] = useState<State>({
    allGames: [],
    currentPage: 1,
    selectedCategory: "All",
    searchTerm: ""
  });
  const gamesPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const gamesCollection = collection(db, 'games');
      const gamesSnapshot = await getDocs(gamesCollection);
      const gamesList = gamesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setState({
        ...state,
        allGames: gamesList
      });
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const handleSearch = () => {
    const lowerCaseSearchTerm = state.searchTerm?.toLowerCase() || "";
    const selectedCategory = state.selectedCategory;

    const filteredGames = state.allGames.filter(game => {
      if (selectedCategory === "All") {
        if (!lowerCaseSearchTerm) return true;
        return (
          game.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          game.category.toLowerCase().includes(lowerCaseSearchTerm) ||
          game.platform.toLowerCase().includes(lowerCaseSearchTerm) ||
          (game.accessibility && game.accessibility.toLowerCase().includes(lowerCaseSearchTerm))
        );
      }

      if (selectedCategory === "Name") {
        return game.name.toLowerCase().includes(lowerCaseSearchTerm);
      } else if (selectedCategory === "Category") {
        return game.category.toLowerCase().includes(lowerCaseSearchTerm);
      } else if (selectedCategory === "Platform") {
        return game.platform.toLowerCase().includes(lowerCaseSearchTerm);
      } else if (selectedCategory === "Accessibility" && game.accessibility) {
        return game.accessibility.toLowerCase().includes(lowerCaseSearchTerm);
      }

      return false;
    });

    setGames(filteredGames);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleSearch();
  }, [selectedCategory]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  function BasicExample({ selectedCategory, handleSelect }) {
    const [localShowDropdown, setLocalShowDropdown] = useState(false);


    const handleMouseEnter = () => {
      setLocalShowDropdown(true);
    };

    const handleMouseLeave = () => {
      setLocalShowDropdown(false);
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!event.target.closest('.dropdown')) {
          setLocalShowDropdown(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <Dropdown
        onMouseEnter={handleMouseEnter}
        show={localShowDropdown}
        className="dropdown"
      >
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedCategory}
        </Dropdown.Toggle>
        <Dropdown.Menu
          className={`dropdown-menu ${localShowDropdown ? 'show' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Dropdown.Item onClick={() => handleSelect("All")}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSelect("Name")}>Name</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSelect("Category")}>Category</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSelect("Platform")}>Platform</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSelect("Accessibility")}>Accessibility</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <div className="home">
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
          <div className="flex space-x-4 items-center">
            <button onClick={toggleDarkMode} className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-200">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            {user ? (
              <div className="relative profile-container">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                  <img src={userAvatar} alt="User Avatar" className="rounded-full" style={{ width: '40px', height: '40px' }} />
                  <p className="font-bold">{userName || user.email}</p>
                </div>
                {showDropdown && (
                  <div className="profile-dropdown show">
                    <button className="dropdown-item" onClick={() => navigate('/change-profile')}>Change Profile Picture</button>
                    <button className="dropdown-item" onClick={() => navigate('/change-name')}>Change Name</button>
                    <button className="dropdown-item" onClick={() => navigate('/post')}>Create Post</button>
                    <button className="dropdown-item" onClick={handleLogout}>Log out</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-200" onClick={() => navigate('/login')}>Login</button>
                <button className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-200" onClick={() => navigate('/register')}>Register</button>
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
            <BasicExample selectedCategory={selectedCategory} handleSelect={setSelectedCategory} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-1/2 p-2 rounded-l-lg border-none"
              placeholder="What are you looking for? (Name, Category, Platform, etc)"
            />
            <button className="bg-blue-600 text-white p-2 rounded-r-lg" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="main-content container mx-auto py-10">
        <div className="flex flex-wrap justify-between">
          {games.slice((currentPage - 1) * gamesPerPage, currentPage * gamesPerPage).map((game) => (
            <div key={game.id} className="w-1/3 p-4">
              <div className="game-card bg-gray-100 p-6 rounded-lg shadow-md">
                <img
                  src={game.image_url}
                  alt={game.name}
                  className="mb-4 cursor-pointer"
                  onClick={() => navigate(`/game/${game.id}`)}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
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
          {[...Array(Math.ceil(games.length / gamesPerPage)).keys()].map(number => (
            <button
              key={number + 1}
              onClick={() => setCurrentPage(number + 1)}
              className={`px-4 py-2 mx-1 ${currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} rounded-lg border`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
