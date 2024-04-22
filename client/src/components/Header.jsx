import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/">
          <h1 className="text-xl md:text-3xl font-extrabold text-white flex items-center">
            <span className="text-yellow-300 mr-2">Real Estate</span>
            <span className="text-white">Aggregator</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white bg-opacity-80 p-2 rounded-lg shadow-md"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none text-sm md:text-base w-24 sm:w-48 lg:w-64 text-gray-700"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="ml-2">
            <FaSearch className="text-blue-500" />
          </button>
        </form>
        <nav className="flex space-x-4 text-white">
          <Link
            to="/"
            className="text-sm md:text-base px-3 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-sm md:text-base px-3 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            About
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-8 w-8 md:h-10 md:w-10 object-cover border-2 border-yellow-300"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <span className="text-sm md:text-base px-3 py-2 rounded hover:bg-blue-600 transition duration-200">
                Sign In
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
