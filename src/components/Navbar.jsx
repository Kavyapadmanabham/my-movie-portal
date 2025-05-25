import React, { useState } from 'react';
import Logo from '../movie-logo.jpg';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') return;
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    setSearchTerm('');
  };

  return (
    <div className='flex items-center justify-between border px-4 py-4'>
      
      <div className='flex space-x-8 items-center'>
        <img className='w-[50px]' src={Logo} alt='Logo' />
        <Link to='/' className='text-blue-400 text-3xl font-bold'>Home</Link>
        <Link to='/watchlist' className='text-blue-400 text-3xl font-bold'>WatchList</Link>
      </div>

    
      <form onSubmit={handleSearchSubmit} className='relative w-[250px]'>
        <input
          type='text'
          placeholder='Search movies...'
          className='w-full pr-10 pl-4 text-blue-400 py-1 rounded border border-gray-400 focus:outline-none'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type='submit'
          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black'
        >
          <i className='fa-solid fa-magnifying-glass'></i>
        </button>
      </form>
    </div>
  );
};

export default Navbar;
