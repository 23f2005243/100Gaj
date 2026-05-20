import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', searchTerm);
    navigate(`/search?${urlParams.toString()}`);
  };

  return (
    <header className="bg-light-orange-200 shadow-md hover:shadow-lg transition-shadow duration-300 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/" className="hover:scale-105 transition-transform duration-300 flex items-center gap-2">
          <img
            src="/Logo.jpg"
            alt="100 Gaj Estate Logo"
            className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-full"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-light-blue-500">100 Gaj</span>
            <span className="text-light-orange-500">Estate</span>
          </h1>
        </Link>
        <form onSubmit={handleSearch} className="bg-white p-3 rounded-full flex items-center shadow-md hover:shadow-xl transition-shadow duration-300">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent focus:outline-none w-24 sm:w-64 text-slate-700"
          />
          <button type="submit" className="cursor-pointer">
            <FaSearch className="text-light-orange-400 hover:text-light-orange-500 transition-colors duration-200" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/" className="group">
            <li className="hidden sm:inline text-slate-700 group-hover:text-light-blue-500 transition-colors duration-200 font-semibold">
              Home
            </li>
          </Link>
<Link to="/about" className="group">
            <li className="hidden sm:inline text-slate-700 group-hover:text-light-blue-500 transition-colors duration-200 font-semibold">
              About
            </li>
          </Link>
          <Link to="/floor-plan" className="group">
            <li className="hidden sm:inline text-slate-700 group-hover:text-light-blue-500 transition-colors duration-200 font-semibold">
              Floor Plan
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="avatar"
                className="rounded-full h-9 w-9 object-cover hover:scale-110 hover:shadow-lg transition-all duration-300 border-2 border-light-orange-300"
              />
            ) : (
              <li className="text-light-blue-500 hover:text-light-blue-600 font-bold hover:scale-105 transition-transform duration-200">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
